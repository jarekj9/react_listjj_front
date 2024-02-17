import { useEffect } from "react";

const UseAutosizeTextArea = (
  textAreaRef,
  value
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default UseAutosizeTextArea;