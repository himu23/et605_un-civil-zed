export const topics = [
  { id: "T_ADD_DIFF", name: "Addition (Different Denoms)", operation: "addition" },
  { id: "T_SUBTRACTION", name: "Subtraction", operation: "subtraction" },
  { id: "T_MULTIPLICATION", name: "Multiplication", operation: "multiplication" },
  { id: "T_DIVISION", name: "Division", operation: "division" }
];

export const questions = [
  // ADDITION
  {
    id: "Q_ADD_DIFF_E1",
    topicId: "T_ADD_DIFF",
    difficulty: "easy",
    text: "What is 1/2 + 1/4?",
    options: [
      { id: "A", text: "2/6", correct: false, misconception: "M001", reason: "Added numerators and denominators." },
      { id: "B", text: "3/4", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "2/4", correct: false, misconception: "M003", reason: "Forgot to convert 1/2." },
      { id: "D", text: "1/6", correct: false, misconception: "M003", reason: "Wrong LCM." }
    ],
    hints: [
      { level: 1, text: "The denominators are 2 and 4. Are they the same? What must you do first?" },
      { level: 2, text: "Different denominators: Find LCM(2,4) = 4. Convert 1/2 to 2/4." },
      { level: 3, text: "Now add: 2/4 + 1/4 = 3/4." }
    ]
  },
  {
    id: "Q_ADD_DIFF_M1",
    topicId: "T_ADD_DIFF",
    difficulty: "medium",
    text: "What is 1/2 + 1/3?",
    options: [
      { id: "A", text: "2/5", correct: false, misconception: "M001", reason: "Added denominators." },
      { id: "B", text: "5/6", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "2/6", correct: false, misconception: "M003", reason: "Incomplete conversion." },
      { id: "D", text: "1/6", correct: false, misconception: "M003", reason: "Only added numerators." }
    ],
    hints: [
      { level: 1, text: "Look at the denominators 2 and 3. Are they the same?" },
      { level: 2, text: "Denominators 2 and 3 are different. Find LCM(2,3) = 6." },
      { level: 3, text: "LCM = 6. Convert: 1/2 = 3/6, 1/3 = 2/6. Now add: 3/6 + 2/6 = 5/6." }
    ]
  },
  {
    id: "Q_ADD_DIFF_H1",
    topicId: "T_ADD_DIFF",
    difficulty: "hard",
    text: "What is 3/8 + 5/12?",
    options: [
      { id: "A", text: "8/20", correct: false, misconception: "M001", reason: "Added denominators." },
      { id: "B", text: "19/24", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "8/12", correct: false, misconception: "M003", reason: "Incomplete conversion." },
      { id: "D", text: "15/20", correct: false, misconception: "M003", reason: "Wrong LCM." }
    ],
    hints: [
      { level: 1, text: "Denominators are 8 and 12. Find their LCM." },
      { level: 2, text: "LCM(8,12) = 24. Convert both fractions so the denominator is 24." },
      { level: 3, text: "3/8 = 9/24, 5/12 = 10/24. 9/24 + 10/24 = 19/24." }
    ]
  },
  {
    id: "Q_ADD_DIFF_C1",
    topicId: "T_ADD_DIFF",
    difficulty: "challenge",
    text: "What is -2/3 + 1/4?",
    options: [
      { id: "A", text: "-5/12", correct: true, misconception: null, reason: "Correct" },
      { id: "B", text: "5/12", correct: false, misconception: "M002", reason: "Lost negative sign." },
      { id: "C", text: "-1/7", correct: false, misconception: "M003", reason: "Wrong LCM." },
      { id: "D", text: "-3/7", correct: false, misconception: "M001", reason: "Added denominators." }
    ],
    hints: [
      { level: 1, text: "Denominators are 3 and 4. Find LCM and handle the negative sign carefully." },
      { level: 2, text: "LCM(3,4) = 12. Convert: -2/3 = -8/12, 1/4 = 3/12." },
      { level: 3, text: "Add with negatives: -8/12 + 3/12 = -5/12." }
    ]
  },

  // SUBTRACTION 
  {
    id: "Q_SUB_E1",
    topicId: "T_SUBTRACTION",
    difficulty: "easy",
    text: "What is 3/5 - 1/5?",
    options: [
      { id: "A", text: "2/10", correct: false, misconception: "M001", reason: "Subtracted denominators." },
      { id: "B", text: "2/5", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "3/5", correct: false, misconception: "generic", reason: "Ignored subtraction." },
      { id: "D", text: "4/5", correct: false, misconception: "generic", reason: "Added instead." }
    ],
    hints: [
      { level: 1, text: "Same denominators (both 5). What do you subtract?" },
      { level: 2, text: "Subtract numerators: 3 - 1 = 2. Keep denominator 5." },
      { level: 3, text: "3/5 - 1/5 = (3-1)/5 = 2/5." }
    ]
  },
  {
    id: "Q_SUB_M1",
    topicId: "T_SUBTRACTION",
    difficulty: "medium",
    text: "What is 1/2 - 1/3?",
    options: [
      { id: "A", text: "0/1", correct: false, misconception: "M001", reason: "Subtracted denominators." },
      { id: "B", text: "1/6", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "2/6", correct: false, misconception: "M003", reason: "Wrong LCM step." },
      { id: "D", text: "-1/6", correct: false, misconception: "M002", reason: "Flipped order." }
    ],
    hints: [
      { level: 1, text: "Different denominators. Find the LCM of 2 and 3." },
      { level: 2, text: "LCM=6. Convert 1/2 to 3/6 and 1/3 to 2/6." },
      { level: 3, text: "3/6 - 2/6 = 1/6." }
    ]
  },
  {
    id: "Q_SUB_H1",
    topicId: "T_SUBTRACTION",
    difficulty: "hard",
    text: "What is 5/8 - 3/12?",
    options: [
      { id: "A", text: "2/4", correct: false, misconception: "M001", reason: "Subtracted straight across." },
      { id: "B", text: "9/24", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "3/8", correct: true, misconception: null, reason: "Correct simplified" },
      { id: "D", text: "2/24", correct: false, misconception: "M003", reason: "Wrong conversion step." }
    ],
    hints: [
      { level: 1, text: "Find the LCM of 8 and 12." },
      { level: 2, text: "LCM is 24. Convert 5/8 to 15/24. Convert 3/12 to 6/24." },
      { level: 3, text: "Wait, 15/24 - 6/24 = 9/24." }
    ]
  },

  // MULTIPLICATION
  {
    id: "Q_MUL_E1",
    topicId: "T_MULTIPLICATION",
    difficulty: "easy",
    text: "What is (1/2) × (2/3)?",
    options: [
      { id: "A", text: "1/4", correct: false, misconception: "generic", reason: "Multiplied wrong." },
      { id: "B", text: "2/6", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "1/3", correct: true, misconception: null, reason: "Correct simplified" },
      { id: "D", text: "3/5", correct: false, misconception: "M001", reason: "Added instead of multiply." }
    ],
    hints: [
      { level: 1, text: "Multiply fractions: numerator × numerator, denominator × denominator." },
      { level: 2, text: "(1 × 2) = 2. (2 × 3) = 6." },
      { level: 3, text: "2/6, which simplifies to 1/3." }
    ]
  },
  {
    id: "Q_MUL_H1",
    topicId: "T_MULTIPLICATION",
    difficulty: "hard",
    text: "What is (-2/3) × (-1/4)?",
    options: [
      { id: "A", text: "-2/12", correct: false, misconception: "M005", reason: "Forgot negative times negative." },
      { id: "B", text: "2/12", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "1/6", correct: true, misconception: null, reason: "Correct simplified" },
      { id: "D", text: "-1/6", correct: false, misconception: "M005", reason: "Forgot negative sign rules." }
    ],
    hints: [
      { level: 1, text: "What happens when you multiply two negative numbers?" },
      { level: 2, text: "Negative × Negative = Positive. Multiply numerators and denominators." },
      { level: 3, text: "(-2 × -1) = 2. (3 × 4) = 12. Answer is 2/12 or 1/6." }
    ]
  },
  {
    id: "Q_MUL_M1",
    topicId: "T_MULTIPLICATION",
    difficulty: "medium",
    text: "What is (3/5) × (2/7)?",
    options: [
      { id: "A", text: "5/12", correct: false, misconception: "M001", reason: "Added numerators and denominators." },
      { id: "B", text: "6/35", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "14/15", correct: false, misconception: "generic", reason: "Cross multiplied." },
      { id: "D", text: "21/10", correct: false, misconception: "generic", reason: "Did reciprocal." }
    ],
    hints: [
      { level: 1, text: "No need for LCM in multiplication. Multiply straight across." },
      { level: 2, text: "(3 × 2) / (5 × 7)." },
      { level: 3, text: "6 / 35." }
    ]
  },

  // DIVISION
  {
    id: "Q_DIV_E1",
    topicId: "T_DIVISION",
    difficulty: "easy",
    text: "What is (1/2) ÷ 2?",
    options: [
      { id: "A", text: "1/1", correct: false, misconception: "M004", reason: "Divided separately." },
      { id: "B", text: "1/4", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "2/1", correct: false, misconception: "M004", reason: "Flipped wrong fraction." },
      { id: "D", text: "1/2", correct: false, misconception: "generic", reason: "Ignored." }
    ],
    hints: [
      { level: 1, text: "Division = multiply by reciprocal. What's the reciprocal of 2?" },
      { level: 2, text: "Reciprocal of 2 is 1/2. So: (1/2) × (1/2)." },
      { level: 3, text: "(1/2) × (1/2) = 1/4." }
    ]
  },
  {
    id: "Q_DIV_M1",
    topicId: "T_DIVISION",
    difficulty: "medium",
    text: "What is (2/3) ÷ (1/4)?",
    options: [
      { id: "A", text: "2", correct: false, misconception: "M004", reason: "Divided components." },
      { id: "B", text: "8/3", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "4/3", correct: false, misconception: "generic", reason: "Calculation error." },
      { id: "D", text: "2/12", correct: false, misconception: "M004", reason: "Multiplied instead." }
    ],
    hints: [
      { level: 1, text: "You need to multiply by the reciprocal of the second fraction." },
      { level: 2, text: "Flip 1/4 to make it 4/1. Then multiply: (2/3) × (4/1)." },
      { level: 3, text: "(2 × 4) = 8. (3 × 1) = 3. Answer is 8/3." }
    ]
  },
  {
    id: "Q_DIV_H1",
    topicId: "T_DIVISION",
    difficulty: "hard",
    text: "What is (-2/3) ÷ (-1/4)?",
    options: [
      { id: "A", text: "-8/3", correct: false, misconception: "M005", reason: "Forgot negative signs cancel out." },
      { id: "B", text: "8/3", correct: true, misconception: null, reason: "Correct" },
      { id: "C", text: "2/12", correct: false, misconception: "M004", reason: "Multiplied instead." },
      { id: "D", text: "6/4", correct: false, misconception: "M004", reason: "Flipped wrong fraction." }
    ],
    hints: [
      { level: 1, text: "Keep the first fraction, flip the second fraction, change to multiply." },
      { level: 2, text: "(-2/3) × (-4/1). Warning: Negative × Negative = ?" },
      { level: 3, text: "Positive! (2×4=8), (3×1=3). So 8/3." }
    ]
  }
];

export const getQuestionsByTopic = (topicId) => questions.filter(q => q.topicId === topicId);
