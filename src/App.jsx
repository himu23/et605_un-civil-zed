import React, { useState } from 'react';
import { LearnerProvider, useLearner } from './engine/LearnerContext';
import PathMap from './components/PathMap';
import LessonCard from './components/LessonCard';
import QuestionCard from './components/QuestionCard';
import RemedialOverlay from './components/RemedialOverlay';

const ITSApp = ({ onExit }) => {
  const { pathState, endSession } = useLearner();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleConfirmExit = () => {
    endSession('exited_midway');
    onExit();
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#111' }}>
            LC
          </div>
          <h1 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600 }}>ET 605 Project <span style={{opacity: 0.6, fontWeight: 400, marginLeft: '8px'}}>| Class 7 - Rational Numbers</span></h1>
        </div>
        <button className="btn btn-secondary" onClick={() => setShowExitConfirm(true)}>
          Exit Session
        </button>
      </header>
      
      <main style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {pathState === 'map' && <PathMap />}
        {pathState === 'lesson' && <LessonCard />}
        {pathState === 'quiz' && <QuestionCard />}
      </main>
      
      <RemedialOverlay />

      {showExitConfirm && (
        <div className="overlay" style={{ zIndex: 9999 }}>
          <div className="panel" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2>Confirm Exit?</h2>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
              Are you sure you want to end this tutoring session? We will generate and download your final session payload.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowExitConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleConfirmExit} style={{ background: 'var(--accent-danger)' }}>Yes, End Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [studentId, setStudentId] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (studentId.trim().length > 2) setIsLogged(true);
  };

  if (!isLogged) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="panel" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>ITS Authenticator</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'left' }}>Enter your Student ID to begin the tracked session.</p>
            <input 
              style={{ padding: '0.75rem', borderRadius: '4px', background: '#222', border: '1px solid var(--panel-border)', color: '#fff', fontSize: '1rem' }}
              placeholder="e.g. STU_001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Start Session</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <LearnerProvider studentId={studentId}>
      <ITSApp onExit={() => { setIsLogged(false); setStudentId(""); }} />
    </LearnerProvider>
  );
};

export default App;
