import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLearner } from '../engine/LearnerContext';
import { remedialContent } from '../data/remedial';

const RemedialOverlay = () => {
  const { remedialQueue, clearRemedial } = useLearner();
  const [stepIndex, setStepIndex] = useState(0);

  if (!remedialQueue) return null;

  const content = remedialContent[remedialQueue];
  if (!content) return null;

  const handleNext = () => {
    if (stepIndex < content.content.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setStepIndex(0);
      clearRemedial();
    }
  };

  return (
    <div className="overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel" 
        style={{ width: '90%', maxWidth: '600px', padding: '3rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="title-gradient">{content.title}</h2>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Step {stepIndex + 1} of {content.content.length}</span>
        </div>

        <div style={{ minHeight: '150px', fontSize: '1.1rem', lineHeight: '1.8' }}>
          <AnimatePresence mode="wait">
            <motion.p 
              key={stepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ color: '#fff' }}
            >
              {content.content[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem', gap: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            {stepIndex === content.content.length - 1 ? 'Finish & Return' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RemedialOverlay;
