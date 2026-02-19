import { useEffect, useRef } from "react";

export const useTextareaResize = (value: string) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  return ref;
};