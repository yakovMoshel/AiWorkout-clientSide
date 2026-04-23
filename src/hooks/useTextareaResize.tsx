import { useEffect, useRef } from "react";

const MAX_TEXTAREA_HEIGHT_PX = 160;

export const useTextareaResize = (value: string) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, MAX_TEXTAREA_HEIGHT_PX) + "px";
    }
  }, [value]);

  return ref;
};