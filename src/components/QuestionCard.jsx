import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLearner } from '../engine/LearnerContext';
import { CheckCircle, AlertCircle, HelpCircle, ArrowLeft } from 'lucide-react';

const QuestionCard = () => {
  const { currentQuestion, hintLevel, submitAnswer, escalateHint, loadNextQuestion, navigateToMap, studentProfile } = useLearner();
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [wrongGuesses, setWrongGuesses] = useState(new Set());
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null);
    setFeedback(null);
    setWrongGuesses(new Set());
  }, [currentQuestion]);

  if (!currentQuestion) return <div className="panel">Loading...</div>;

  const handleOptionClick = (option) => {
    if (feedback?.isCorrect || wrongGuesses.has(option.id)) return; 
    
    const timeSpent = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    setSelectedOption(option);
    
    const result = submitAnswer(option, timeSpent);
    setFeedback(result);
    
    if (!result.isCorrect) {
      setWrongGuesses(prev => new Set([...prev, option.id]));
      escalateHint();
    }
  };

  const topicMastery = studentProfile.masteryLevels[currentQuestion.topicId] || 0;
  const uniqueCorrectCount = new Set(studentProfile.attempts.filter(a => a.isCorrect && a.topicId === currentQuestion.topicId).map(a => a.questionId)).size;
  const totalTopicQuestions = currentQuestion.topicId === 'T_ADD_DIFF' ? 4 : 3;
  const isTopicComplete = (topicMastery >= 0.85 && uniqueCorrectCount >= 3) || uniqueCorrectCount >= totalTopicQuestions;

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);
    setWrongGuesses(new Set());
    setStartTime(Date.now());

    if (feedback?.isCorrect && isTopicComplete) {
      navigateToMap();
    } else {
      loadNextQuestion();
    }
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setSelectedOption(null);
  };

  return (
    <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <button className="btn btn-secondary" onClick={navigateToMap} style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Quit to Route
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Difficulty: {currentQuestion.difficulty.toUpperCase()}
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Topic: {currentQuestion.topicId.replace('T_', '')}
        </span>
      </div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#fff', fontWeight: '500' }}>
        {currentQuestion.text}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        {currentQuestion.options.map((option) => {
          let optionClass = '';
          if (selectedOption === option) {
            optionClass = option.correct ? 'correct' : 'wrong';
          } else if (feedback?.isCorrect && option.correct) {
            optionClass = 'correct';
          } else if (wrongGuesses.has(option.id)) {
            optionClass = 'wrong';
          }
          
          return (
            <button
              key={option.id}
              className={`option-btn ${optionClass} ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={feedback !== null || wrongGuesses.has(option.id)}
            >
              <div className="option-alpha">{option.id}</div>
              <span style={{ flex: 1, textAlign: 'left' }}>{option.text}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {hintLevel > 0 && currentQuestion.hints && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card" 
            style={{ 
              marginTop: '1.5rem', 
              background: 'rgba(251, 192, 45, 0.1)', 
              borderColor: 'var(--accent-warning)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <HelpCircle color="var(--accent-warning)" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--accent-warning)', marginBottom: '0.5rem' }}>Hint Level {hintLevel}</h4>
              <p style={{ fontSize: '0.95rem', color: '#fff' }}>
                {currentQuestion.hints[Math.min(hintLevel - 1, currentQuestion.hints.length - 1)]?.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ marginTop: '2rem' }}
          >
            <div className="card" style={{ 
              borderColor: feedback.isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {feedback.isCorrect ? (
                  <CheckCircle color="var(--accent-success)" size={24} />
                ) : (
                  <AlertCircle color="var(--accent-danger)" size={24} />
                )}
                <div>
                  <h3 style={{ color: feedback.isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                    {feedback.isCorrect ? 'Correct!' : 'Not Quite Right'}
                  </h3>
                  {feedback.misconception && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      Diagnostic Note: Detected misconception ({feedback.misconception}).
                    </p>
                  )}
                </div>
              </div>
              
              {feedback.isCorrect ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {isTopicComplete ? (
                    <>
                      <button className="btn btn-secondary" onClick={handleNext}>
                        Keep Practicing
                      </button>
                      <button className="btn btn-primary" onClick={navigateToMap}>
                        Next Topic Unlocked!
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={handleNext}>
                      Next Problem
                    </button>
                  )}
                </div>
              ) : (
                <button className="btn btn-primary" onClick={handleTryAgain}>
                  Try Again
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;
