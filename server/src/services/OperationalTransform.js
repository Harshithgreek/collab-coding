/**
 * Operational Transformation utilities
 * Handles text operations and conflict resolution
 */

/**
 * Apply an operation to content
 */
export function applyOperation(content, operation) {
  const { rangeOffset, rangeLength, text } = operation;
  
  return (
    content.substring(0, rangeOffset) +
    text +
    content.substring(rangeOffset + rangeLength)
  );
}

/**
 * Transform operation A against operation B
 * Used when operations were created concurrently
 */
export function transformOperation(opA, opB) {
  // If A starts after B's range, adjust A's offset
  if (opA.rangeOffset >= opB.rangeOffset + opB.rangeLength) {
    return {
      ...opA,
      rangeOffset: opA.rangeOffset + (opB.text.length - opB.rangeLength)
    };
  }
  
  // If A ends before B starts, no transformation needed
  if (opA.rangeOffset + opA.rangeLength <= opB.rangeOffset) {
    return opA;
  }
  
  // Operations overlap - B takes precedence
  // Adjust A to come after B
  return {
    ...opA,
    rangeOffset: opB.rangeOffset + opB.text.length,
    rangeLength: Math.max(0, opA.rangeLength - opB.rangeLength)
  };
}

/**
 * Compose two operations into one
 */
export function composeOperations(op1, op2) {
  // Apply op1, then op2
  let content = '';
  content = applyOperation(content, op1);
  content = applyOperation(content, op2);
  
  return {
    rangeOffset: Math.min(op1.rangeOffset, op2.rangeOffset),
    rangeLength: Math.max(
      op1.rangeOffset + op1.rangeLength,
      op2.rangeOffset + op2.rangeLength
    ),
    text: content
  };
}

/**
 * Invert an operation (for undo)
 */
export function invertOperation(operation, originalContent) {
  const { rangeOffset, rangeLength, text } = operation;
  
  return {
    rangeOffset,
    rangeLength: text.length,
    text: originalContent.substring(rangeOffset, rangeOffset + rangeLength)
  };
}
