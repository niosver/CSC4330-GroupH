import { useState, useRef, useEffect } from 'react';

export const useInterval = (maxCount: number, start: any) => {
    const [count, setCount] = useState(0);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (start) {
            timer.current = setInterval(() => {
                setCount((prevCount: number) => prevCount + 1);
            }, 50);
        }
    }, [start]);
    useEffect(() => {
        if (count >= maxCount) {
            clearInterval(timer.current!);
        }
    }, [count]);
    return count;
};
