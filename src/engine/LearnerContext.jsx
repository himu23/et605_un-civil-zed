import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateMastery, getDifficultyLevel } from './pedagogicalLogic';
import { questions, getQuestionsByTopic, topics } from '../data/questions';

const LearnerContext = createContext();

export const useLearner = () => useContext(LearnerContext);

export const LearnerProvider = ({ children, studentId }) => {
  const [studentProfile, setStudentProfile] = useState({
    name: studentId || "Anonymous",
    masteryLevels: {
      T_ADD_DIFF: 0.0,
      T_SUBTRACTION: 0.0,
      T_MULTIPLICATION: 0.0,
      T_DIVISION: 0.0
    },
    attempts: [], 
    misconceptionsDetected: {},
    currentTopicIndex: 0
  });

  const [sessionId] = useState(() => crypto.randomUUID());
  const [sessionStartTime] = useState(() => new Date().toISOString());
  const [hintsTracker, setHintsTracker] = useState({});

  const [pathState, setPathState] = useState('map'); 
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [remedialQueue, setRemedialQueue] = useState(null);

  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  const navigateToMap = () => setPathState('map');
  
  const navigateToLesson = (topicId) => {
    setActiveTopicId(topicId);
    setPathState('lesson');
  };
  
  const navigateToQuiz = () => {
    setPathState('quiz');
    loadNextQuestion();
  };

  const loadNextQuestion = () => {
    if (!activeTopic) return;
    const topicMastery = studentProfile.masteryLevels[activeTopic.id];
    const difficulty = getDifficultyLevel(topicMastery);
    
    const topicQuestions = getQuestionsByTopic(activeTopic.id);
    const correctQuestionIds = studentProfile.attempts.filter(a => a.isCorrect).map(a => a.questionId);
    
    let available = topicQuestions.filter(q => q.difficulty === difficulty);
    
    available = available.filter(q => !correctQuestionIds.includes(q.id));

    if (available.length === 0) {
      available = topicQuestions.filter(q => !correctQuestionIds.includes(q.id));
    }
    
    if (available.length > 0) {
      setCurrentQuestion(available[Math.floor(Math.random() * available.length)]);
    } else {
      setCurrentQuestion(topicQuestions[0]);
    }
    setHintLevel(0);
  };

  const submitAnswer = (option, timeSpent) => {
    const isCorrect = option.correct;
    const misconception = option.misconception;
    
    const newAttempt = {
      questionId: currentQuestion.id,
      topicId: activeTopic.id,
      isCorrect,
      timeSpent,
      misconception,
      timestamp: Date.now()
    };

    setStudentProfile(prev => {
      const updatedAttempts = [...prev.attempts, newAttempt];
      const topicAttempts = updatedAttempts.filter(a => a.topicId === activeTopic.id);
      
      const newMastery = calculateMastery(topicAttempts, prev.masteryLevels[activeTopic.id]);
      
      const updatedMisconceptions = { ...prev.misconceptionsDetected };
      let newRemedial = remedialQueue;

      if (!isCorrect && misconception) {
        if (!updatedMisconceptions[misconception]) {
          updatedMisconceptions[misconception] = { instances: 1, resolved: false };
        } else {
          updatedMisconceptions[misconception].instances += 1;
        }

        if (updatedMisconceptions[misconception].instances >= 2 && !updatedMisconceptions[misconception].resolved) {
          newRemedial = `REM_${misconception}`;
          updatedMisconceptions[misconception].resolved = true;
        }
      }

      let checkAdvance = false;
      const uniqueCorrectQuestions = new Set(updatedAttempts.filter(a => a.isCorrect && a.topicId === activeTopic.id).map(a => a.questionId));
      const totalTopicQuestions = activeTopic.id === 'T_ADD_DIFF' ? 4 : 3;
      
      if ((newMastery >= 0.85 && uniqueCorrectQuestions.size >= 3) || uniqueCorrectQuestions.size >= totalTopicQuestions) {
        checkAdvance = true;
      }

      setRemedialQueue(newRemedial);
      
      let newTopicIndex = prev.currentTopicIndex;
      const playingTopicIndex = topics.findIndex(t => t.id === activeTopic.id);
      if (checkAdvance && playingTopicIndex >= prev.currentTopicIndex && prev.currentTopicIndex < topics.length) {
        newTopicIndex = prev.currentTopicIndex + 1;
      }

      return {
        ...prev,
        attempts: updatedAttempts,
        masteryLevels: {
          ...prev.masteryLevels,
          [activeTopic.id]: newMastery
        },
        misconceptionsDetected: updatedMisconceptions,
        currentTopicIndex: newTopicIndex
      };
    });

    return { isCorrect, misconception };
  };

  const escalateHint = () => {
    if (hintLevel < 3) {
      const newLevel = hintLevel + 1;
      setHintLevel(newLevel);
      setHintsTracker(prev => ({
        ...prev,
        [currentQuestion.id]: Math.max(prev[currentQuestion.id] || 0, newLevel)
      }));
    }
  };

  const endSession = async (status = 'exited_midway') => {
    const topicKeys = topics.map(t => t.id);
    const subtopicMetrics = topicKeys.map(tId => {
      const tAttempts = studentProfile.attempts.filter(a => a.topicId === tId);
      const uniqueAttemptedIds = [...new Set(tAttempts.map(a => a.questionId))];
      const questionsAttempted = uniqueAttemptedIds.length;
      const correctAnswers = [...new Set(tAttempts.filter(a => a.isCorrect).map(a => a.questionId))].length;
      
      // Strict rule: correct + wrong <= attempted
      const wrongAnswers = questionsAttempted - correctAnswers;
      const totalQuestions = getQuestionsByTopic(tId).length;
      const retryCount = tAttempts.length - questionsAttempted;
      const hintsUsed = uniqueAttemptedIds.reduce((sum, qId) => sum + (hintsTracker[qId] || 0), 0);
      const timeSpentActiveSeconds = tAttempts.reduce((sum, a) => sum + a.timeSpent, 0);
      
      return {
        subtopic_id: tId,
        correct_answers: correctAnswers || null,
        wrong_answers: wrongAnswers || null,
        questions_attempted: questionsAttempted || null,
        total_questions: totalQuestions || null,
        retry_count: retryCount || null,
        hints_used: hintsUsed || null,
        time_spent_active_seconds: timeSpentActiveSeconds || null,
        topic_completion_ratio: totalQuestions > 0 ? (correctAnswers / totalQuestions) : 0
      };
    });

    const globalAttempts = studentProfile.attempts;
    const uniqueAttemptedOverall = [...new Set(globalAttempts.map(a => a.questionId))];
    const globalCorrect = [...new Set(globalAttempts.filter(a => a.isCorrect).map(a => a.questionId))].length;
    const globalWrong = uniqueAttemptedOverall.length - globalCorrect;
    const globalRetry = globalAttempts.length - uniqueAttemptedOverall.length;
    const globalHintsUsed = Object.values(hintsTracker).reduce((a, b) => a + b, 0);
    const globalTimeSpent = globalAttempts.reduce((sum, a) => sum + a.timeSpent, 0);
    const totalQuestionsOverall = questions.length;
    const totalHintsEmbedded = questions.reduce((sum, q) => sum + (q.hints ? q.hints.length : 0), 0);

    const payload = {
      student_id: studentId,
      session_id: sessionId,
      chapter_id: "grade7_rational_numbers",
      session_start_time: sessionStartTime,
      session_end_time: new Date().toISOString(),
      session_status: status,
      metrics: {
        correct_answers: globalCorrect || null,
        wrong_answers: globalWrong || null,
        questions_attempted: uniqueAttemptedOverall.length || null,
        total_questions: totalQuestionsOverall || null,
        retry_count: globalRetry || null,
        hints_used: globalHintsUsed || null,
        total_hints_embedded: totalHintsEmbedded || null,
        time_spent_active_seconds: globalTimeSpent || null,
        topic_completion_ratio: (globalCorrect / totalQuestionsOverall) || 0
      },
      subtopic_metrics: subtopicMetrics
    };

    const { TelemetryService } = await import('./TelemetryService');
    TelemetryService.sendPayload(payload);
  };

  const clearRemedial = () => setRemedialQueue(null);

  return (
    <LearnerContext.Provider value={{
       studentProfile, 
       pathState,
       navigateToMap,
       navigateToLesson,
       navigateToQuiz,
       activeTopic,
       currentQuestion, 
       hintLevel, 
       remedialQueue, 
       submitAnswer, 
       escalateHint, 
       loadNextQuestion,
       clearRemedial,
       endSession
    }}>
      {children}
    </LearnerContext.Provider>
  );
};
