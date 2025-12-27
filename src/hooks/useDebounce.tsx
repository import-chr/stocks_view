'use client'

import { useCallback, useRef, useEffect } from 'react';

export function useDebounce<T extends (...args: unknown[]) => void>(callback: T, delay: number): T {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<T>) => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
  }, [delay]) as T;
}
