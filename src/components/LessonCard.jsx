import React from 'react';
import { useLearner } from '../engine/LearnerContext';
import { lessons } from '../data/lessons';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const LessonCard = () => {
  const { activeTopic, navigateToMap, navigateToQuiz } = useLearner();
  const lessonData = lessons[activeTopic.id];

  if (!lessonData) return <div className="panel">Lesson Data Missing</div>;

  return (
    <div className="panel" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
      <button className="btn btn-secondary" onClick={navigateToMap} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Route
      </button>

      <h1 className="title-solid" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        {lessonData.title}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        {lessonData.blocks.map((block, idx) => {
          if (block.type === 'h2') {
            return <h2 key={idx} style={{ marginTop: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem', color: '#fff' }}>{block.text}</h2>;
          }
          if (block.type === 'h3') {
            return <h3 key={idx} style={{ marginTop: '0.5rem', color: 'var(--text-main)' }}>{block.text}</h3>;
          }
          if (block.type === 'example') {
            return (
              <div key={idx} style={{ background: 'rgba(251, 192, 45, 0.1)', borderLeft: '4px solid var(--accent-warning)', padding: '1.5rem', borderRadius: '4px', color: '#fff' }}>
                <strong style={{ color: 'var(--accent-warning)' }}>Example:</strong> {block.text.replace('Example:', '')}
              </div>
            );
          }
          return <p key={idx} style={{ color: 'var(--text-muted)' }}>{block.text}</p>;
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: '1px solid var(--panel-border)' }}>
        <button className="btn btn-primary" onClick={navigateToQuiz}>
          Complete Lesson & Take Quiz <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
