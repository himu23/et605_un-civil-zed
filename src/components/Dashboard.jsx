import React from 'react';
import { useLearner } from '../engine/LearnerContext';
import { topics } from '../data/questions';
import { CheckCircle, Clock } from 'lucide-react';
import { getDifficultyLevel } from '../engine/pedagogicalLogic';

const Dashboard = () => {
  const { studentProfile } = useLearner();
  const { name, masteryLevels, attempts, currentTopicIndex } = studentProfile;

  const getProgressColor = (mastery) => {
    if (mastery >= 0.86) return 'progress-mastered';
    if (mastery >= 0.71) return 'progress-proficient';
    if (mastery >= 0.41) return 'progress-developing';
    return 'progress-initiated';
  };

  const getLabel = (mastery) => {
    if (mastery >= 0.86) return 'MASTERED';
    if (mastery >= 0.71) return 'PROFICIENT';
    if (mastery >= 0.41) return 'DEVELOPING';
    if (mastery > 0.0) return 'INITIATED';
    return 'NOT STARTED';
  };

  return (
    <div className="glass-panel" style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Welcome back, <span className="title-gradient">{name}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Grade 7: Rational Numbers ITS</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Your Journey</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {topics.map((topic, index) => {
            const mastery = masteryLevels[topic.id] || 0;
            const isUnlocked = index <= currentTopicIndex;
            const isCurrent = index === currentTopicIndex;
            
            return (
              <div 
                key={topic.id} 
                className="glass-card"
                style={{
                  opacity: isUnlocked ? 1 : 0.5,
                  borderLeft: isCurrent ? '4px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {mastery >= 0.86 ? (
                      <CheckCircle size={20} color="var(--accent-success)" />
                    ) : (
                      <Clock size={20} color={isUnlocked ? 'var(--text-main)' : 'var(--text-muted)'} />
                    )}
                    <span style={{ fontWeight: 500 }}>{topic.name}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {isUnlocked ? `${Math.round(mastery * 100)}% - ${getLabel(mastery)}` : 'LOCKED'}
                  </span>
                </div>
                {isUnlocked && (
                  <div className="progress-container">
                    <div 
                      className={`progress-bar ${getProgressColor(mastery)}`} 
                      style={{ width: `${Math.max(mastery * 100, 2)}%` }} 
                    />
                  </div>
                )}
                {isUnlocked && (
                  <div style={{ fontSize: '0.8rem', color: '#8b949e', marginTop: '0.5rem' }}>
                     Difficulty: {getDifficultyLevel(mastery).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Attempt History</h3>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
          {attempts.length}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total problems attempted</p>
        
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#8b949e' }}>
          Success Rate: {attempts.length > 0 ? Math.round((attempts.filter(a => a.isCorrect).length / attempts.length) * 100) : 0}%
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
