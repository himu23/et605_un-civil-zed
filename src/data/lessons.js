export const lessons = {
  "T_ADD_DIFF": {
    title: "Addition of Rational Numbers",
    blocks: [
      { type: "h2", text: "Introduction to Addition" },
      { type: "p", text: "When adding two rational numbers, you must first check their denominators. The denominator represents the *size* of the pieces you are adding together. If the pieces are different sizes, you cannot simply add them up!" },
      { type: "h3", text: "Same Denominators" },
      { type: "p", text: "If the denominators are exactly the same, it means the 'pieces' are the same size. You simply add the numerators and keep the denominator unchanged. Think of it like adding 2 slices of an 8-slice pizza and 3 slices of another 8-slice pizza. You have 5 slices total! Example: 1/8 + 3/8 = 4/8." },
      { type: "h3", text: "Different Denominators (The LCM Rule)" },
      { type: "p", text: "When denominators are different (like 1/2 and 1/3), you cannot add them directly! You are trying to add a half-pizza to a third of a pizza.\n\nYou must find the Least Common Multiple (LCM) of the two denominators to force them to be the same size. Multiply both the top and bottom of each fraction to reach that LCM." },
      { type: "h3", text: "Step-By-Step LCM Conversion" },
      { type: "p", text: "Let's add 1/4 and 1/6.\n1. Look at denominators 4 and 6. The smallest number both multiply into is 12 (the LCM).\n2. Convert 1/4: Multiply top and bottom by 3 to get 3/12.\n3. Convert 1/6: Multiply top and bottom by 2 to get 2/12.\n4. Now add: 3/12 + 2/12 = 5/12!" },
      { type: "example", text: "Example: 1/2 + 1/3. The LCM of 2 and 3 is 6. Convert 1/2 to 3/6 and 1/3 to 2/6. Now add them: 3/6 + 2/6 = 5/6." }
    ]
  },
  "T_SUBTRACTION": {
    title: "Subtraction & The Additive Inverse",
    blocks: [
      { type: "h2", text: "Subtracting Rational Numbers" },
      { type: "p", text: "Subtraction might seem tricky at first, but it is actually the exact same process as addition! In mathematics, subtracting a rational number is the identical equivalent of adding its Additive Inverse." },
      { type: "h3", text: "The Additive Inverse Analogy" },
      { type: "p", text: "The additive inverse of a rational number p/q is simply its opposite sign: -p/q. Think of this like money. If you subtract a $10 bill from your wallet, it has the exact same mathematical effect as 'adding' a $10 debt to your record. So, p - q is the same as p + (-q)." },
      { type: "h3", text: "Double Negatives" },
      { type: "p", text: "What happens if you subtract a negative number? Taking away a debt makes you richer! Therefore, p - (-q) turns directly into p + q. Always resolve these double negatives before you start doing fraction math." },
      { type: "h3", text: "Applying LCM to Subtraction" },
      { type: "p", text: "Once you have your signs sorted out, follow the exact same rules as addition. If the denominators are different, you must find the LCM." },
      { type: "example", text: "Example: 2/3 - 1/4. The LCM of 3 and 4 is 12. Convert 2/3 to 8/12. Convert 1/4 to 3/12. Now subtract: 8/12 - 3/12 = 5/12." }
    ]
  },
  "T_MULTIPLICATION": {
    title: "Multiplication and Sign Rules",
    blocks: [
      { type: "h2", text: "Multiplying Rational Numbers" },
      { type: "p", text: "Multiplication is inherently different from addition because you DO NOT need to find an LCM. In fact, if you try to find an LCM for multiplication, you will end up doing way too much unnecessary work!" },
      { type: "h3", text: "The Core Rule: Straight Across" },
      { type: "p", text: "To multiply two rational numbers, multiply the numerators directly together to build the new numerator. Then, multiply the denominators together to build the new denominator. \nFormula: (a/b) × (c/d) = (a×c)/(b×d)." },
      { type: "h3", text: "Simplification Strategy" },
      { type: "p", text: "Often, you will end up with very large numbers. Always check if you can simplify (or 'cross-cancel') factors from the top and bottom before you multiply to save yourself time." },
      { type: "h3", text: "Watch the Integer Signs!" },
      { type: "p", text: "The hardest part of multiplication is remembering the integer sign mappings. Memorize this grid:\n• Positive × Positive = Positive (+)\n• Negative × Negative = Positive (+)\n• Positive × Negative = Negative (-)\n• Negative × Positive = Negative (-)" },
      { type: "example", text: "Example: (-2/3) × (1/4). Numerators: -2 × 1 = -2. Denominators: 3 × 4 = 12. Final answer: -2/12, which simplifies smoothly to -1/6." }
    ]
  },
  "T_DIVISION": {
    title: "Division via Reciprocals",
    blocks: [
      { type: "h2", text: "Dividing Rational Numbers" },
      { type: "p", text: "Here is the secret to dividing rational numbers: We do not actually divide them at all. Instead, we use a mechanical trick that transforms every division problem directly into a multiplication problem." },
      { type: "h3", text: "The Power of the Reciprocal" },
      { type: "p", text: "A reciprocal is when you take a non-zero rational number (c/d) and flip it completely upside down to become (d/c). The reciprocal of 2/3 is 3/2. The reciprocal of -4/5 is -5/4. Note that flipping it does NOT change the positive or negative sign!" },
      { type: "h3", text: "The Keep-Change-Flip Rule" },
      { type: "p", text: "To 'divide', follow the K-C-F strategy:\n1. KEEP the first fraction exactly as it is.\n2. CHANGE the division sign to a multiplication sign (÷ becomes ×).\n3. FLIP the second fraction into its reciprocal.\nNow simply multiply straight across as normal! Formula: (a/b) ÷ (c/d) = (a/b) × (d/c)." },
      { type: "example", text: "Example: (2/3) ÷ (1/4). Use K-C-F. Keep (2/3). Change ÷ to ×. Flip 1/4 to 4/1. You now have the multiplication problem: (2/3) × (4/1). Numerators: 2×4 = 8. Denoms: 3×1 = 3. Final answer: 8/3." }
    ]
  }
};
