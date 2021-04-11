import { useEffect, useState } from 'react';

export const useIntersection = (element: any, rootMargin: string = '0px') => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState(entry.isIntersecting);
                    observer.unobserve(element.current);
                }
            },
            {
                rootMargin,
            }
        );

        element.current && observer.observe(element.current);

        return () => {
            observer.unobserve(element.current);
        };
    }, []);

    return isVisible;
};
