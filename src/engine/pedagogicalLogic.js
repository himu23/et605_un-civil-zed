// pedagogicalLogic.js

// Rule 1: Advance to Next Topic criteria check
export const checkAdvancement = (masteryLevel, recentAttempts) => {
  // Mastery ≥ 0.85
  if (masteryLevel < 0.85) return false;
  // Must have attempted at least 4 problems
  if (recentAttempts.length < 4) return false;
  // Last 3 consecutive attempts must all be correct
  const last3 = recentAttempts.slice(-3);
  const allCorrect = last3.every(att => att.isCorrect);
  if (!allCorrect) return false;
  
  return true;
};

// Calculate actual Mastery based on formula:
// Mastery = (0.5 * Accuracy) + (0.3 * Trend) + (0.2 * Speed)
export const calculateMastery = (attempts, currentMastery = 0) => {
  if (!attempts || attempts.length === 0) return 0;
  
  // Total Accuracy
  const correctCount = attempts.filter(a => a.isCorrect).length;
  const accuracy = correctCount / attempts.length;

  // Trend (last 5 attempts)
  const recent = attempts.slice(-5);
  const recentCorrectCount = recent.filter(a => a.isCorrect).length;
  const trend = recentCorrectCount / (recent.length || 1);

  // Speed (assuming 120s baseline vs average time of correct answers)
  const baselineTime = 120;
  const correctAttempts = attempts.filter(a => a.isCorrect);
  const totalCorrectTime = correctAttempts.reduce((sum, a) => sum + (a.timeSpent || baselineTime), 0);
  const avgTime = correctAttempts.length > 0 ? totalCorrectTime / correctAttempts.length : baselineTime;
  let speed = baselineTime / avgTime;
  if (speed > 1.0) speed = 1.0; // Cap at 1.0

  let newMastery = (0.5 * accuracy) + (0.3 * trend) + (0.2 * speed);
  
  // Clamp between 0 and 1
  return Math.min(Math.max(newMastery, 0), 1);
};

export const getDifficultyLevel = (mastery) => {
  if (mastery <= 0.40) return 'easy';
  if (mastery <= 0.70) return 'medium';
  if (mastery <= 0.85) return 'hard';
  return 'challenge';
};
