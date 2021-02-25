import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(config);
        }
        return config;
    },
    (error: AxiosError) => {
        if (process.env.NODE_ENV == 'development') {
            console.error(error);
        }
    }
);
axios.interceptors.response.use(
    (res: AxiosResponse) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(res);
        }
        return res;
    },
    (error: AxiosError) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(error);
        }
    }
);
type RequiredAxios<R extends AxiosRequestConfig> = AxiosRequestConfig & Required<R>;

export type FetchConfig = RequiredAxios<{ url: string; method: Method }>;
export const useFetch = <T>(config: AxiosRequestConfig) => {
    const [response, setResponse] = useState({} as AxiosResponse<T>);
    const [error, setError] = useState({} as AxiosError<T>);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.request<T>(config);
                setResponse(res);
                setIsLoading(false);
            } catch (error) {
                setError(error as AxiosError<T>);
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
};
