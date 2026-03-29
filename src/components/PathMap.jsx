import React, { useEffect, useState } from 'react';
import { useLearner } from '../engine/LearnerContext';
import { topics } from '../data/questions';
import { BookOpen, Lock } from 'lucide-react';

const PathMap = () => {
  const { studentProfile, navigateToLesson, endSession } = useLearner();
  const { masteryLevels, currentTopicIndex } = studentProfile;

  const totalMastery = topics.reduce((acc, t) => acc + (masteryLevels[t.id] || 0), 0);
  const avgMastery = Math.round((totalMastery / topics.length) * 100);

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '1.8rem', margin: 0 }}>NCERT Chapter 8 / 9</h2>
        <span style={{ background: 'var(--accent-primary)', color: '#111', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem' }}>
          Overall Mastery: {avgMastery}%
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Arithmetic Operations on Rational Numbers</p>

      <div style={{ position: 'relative', width: '600px', margin: '0 auto', minHeight: `${topics.length * 150}px`, padding: '2rem 0' }}>
        
        {/* SVG Dashed Line connecting nodes */}
        <svg viewBox="0 0 600 600" style={{ position: 'absolute', top: 0, left: 0, width: '600px', height: '100%', zIndex: 0, overflow: 'visible' }}>
          {topics.map((t, i) => {
            if (i === topics.length - 1) return null;
            const isUnlocked = currentTopicIndex > i; // i+1 is unlocked
            return (
              <path 
                key={i}
                d={`M 300 ${80 + (i * 150)} C 300 ${150 + (i * 150)}, 300 ${150 + (i * 150)}, 300 ${80 + ((i + 1) * 150)}`} 
                fill="transparent" 
                stroke={isUnlocked ? 'var(--node-unlocked)' : 'var(--node-locked)'} 
                strokeWidth="2" 
                strokeDasharray="6,6"
              />
            );
          })}
        </svg>

        {topics.map((topic, index) => {
          const isUnlocked = index <= currentTopicIndex;
          const mastery = masteryLevels[topic.id] || 0;

          return (
            <div 
              key={topic.id}
              style={{
                position: 'absolute',
                top: `${80 + (index * 150)}px`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: isUnlocked ? 'pointer' : 'default',
                opacity: isUnlocked ? 1 : 0.8
              }}
              onClick={() => {
                if (isUnlocked) navigateToLesson(topic.id);
              }}
            >
              <div 
                className={`node-pill ${isUnlocked ? 'unlocked' : 'locked'}`}
                style={{
                  background: isUnlocked ? 'var(--node-unlocked)' : 'var(--node-locked)',
                  color: isUnlocked ? '#111' : 'rgba(255,255,255,0.7)',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'transform 0.2s',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => isUnlocked && (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => isUnlocked && (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {isUnlocked ? <BookOpen size={18} /> : <Lock size={18} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{topic.name}</span>
                  {isUnlocked && <span style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 500 }}>Mastery: {Math.round(mastery * 100)}%</span>}
                </div>
              </div>
            </div>
          );
        })}

        {currentTopicIndex >= topics.length && (
          <div style={{ 
            position: 'absolute', top: `${80 + (topics.length * 150)}px`, left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 
          }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '16px 32px', borderRadius: '9999px', fontSize: '1.2rem', boxShadow: '0 0 20px rgba(44, 187, 156, 0.4)' }}
              onClick={() => {
                endSession('completed');
                alert("Chapter Telemetry Downloaded! You have successfully mastered Rational Numbers.");
              }}
            >
              Finish Chapter & Generate Telemetry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathMap;
