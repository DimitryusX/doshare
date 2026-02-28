import { useEffect, useCallback } from "react";

// Updates the height of a <textarea> when the value changes
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  const resizeTextarea = useCallback(() => {
    if (textAreaRef) {
      // Reset height to auto to get the correct scrollHeight
      textAreaRef.style.height = "auto";
      
      // Calculate minimum height for 5 rows
      const minHeight = 120;
      const scrollHeight = textAreaRef.scrollHeight;
      
      // Set height to either minimum or scrollHeight, whichever is larger
      const newHeight = Math.max(minHeight, scrollHeight);
      textAreaRef.style.height = newHeight + "px";
    }
  }, [textAreaRef]);

  // Resize when value changes
  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  // Setup event listeners and initial height
  useEffect(() => {
    if (!textAreaRef) return;

    // Set initial height
    const minHeight = 120;
    textAreaRef.style.height = minHeight + "px";

    const handleInput = () => {
      resizeTextarea();
    };

    const handlePaste = () => {
      // Use setTimeout to ensure paste content is processed before resizing
      setTimeout(() => {
        resizeTextarea();
      }, 0);
    };

    // Add event listeners
    textAreaRef.addEventListener('input', handleInput);
    textAreaRef.addEventListener('paste', handlePaste);

    // Initial resize in case there's already content
    resizeTextarea();

    // Cleanup
    return () => {
      if (textAreaRef) {
        textAreaRef.removeEventListener('input', handleInput);
        textAreaRef.removeEventListener('paste', handlePaste);
      }
    };
  }, [textAreaRef, resizeTextarea]);
};

export default useAutosizeTextArea;
