import { useEffect, useRef } from "react";

export const useAutoScroll = (trigger: unknown) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [trigger]);

  return bottomRef;
};