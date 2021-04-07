import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useEffect, useRef, useState } from 'react';
/* Interceptors are used as middleware for logging in development and explicitly defining data flow*/
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(config);
            return new Promise((resolve) => setTimeout(() => resolve(config), 1000)); // simulate 1 second response delay
        }
        return config;
    },
    (error: AxiosError) => {
        if (process.env.NODE_ENV == 'development') {
            console.error(error);
        }
        throw error;
    }
);
/* Interceptors are used as middleware for logging in development and explicitly defining data flow */
axios.interceptors.response.use(
    (res: AxiosResponse) => {
        if (process.env.NODE_ENV == 'development') {
            console.log(res);
        }
        return res;
    },
    (error: AxiosError) => {
        if (process.env.NODE_ENV == 'development') {
            console.error(error);
        }
        throw error;
    }
);

/* Typescript generic type to create new type of AxiosRequestConfig with required params */
type RequiredAxios<R extends AxiosRequestConfig> = AxiosRequestConfig & Required<R>;

/**
 * FetchConfig is the type for the useFetch param `config`. FetchConfig requires @type {url: string} and @type {method: Method}
 * but can include other AxiosRequestConfig properties.
 *
 * @see AxiosRequestConfig
 * @example
 * const config: FetchConfig = {
 *   url: '/api/hello', //required
 *   method: 'GET',     //required
 *   params: 'name=bob' //optional
 * }
 */
export type FetchConfig = RequiredAxios<{ url: string; method: Method }>;
/**
 * UseFetchLifecycle is the enum for the useFetch param `lifecycle`. UseFetchLifecycle specifies when in the React component
 * lifecycle useFetch should send a request.
 */
export enum UseFetchLifecycle {
    Mount = 'MOUNT',
    Update = 'UPDATE',
    MountAndUpdate = 'MOUNT_AND_UPDATE',
}
export type UseFetchResponse<T> = {
    response: AxiosResponse<T> | null;
    error: AxiosError<T> | null;
    isLoading: boolean;
};
/**
 * Custom React hook wrapper for Axios. Stores response, error, and loading data for a request that asynchronously updates
 * in 3 stages:
 *  1. Before Fetch:        {response: null, error: null, isLoading: false}
 *  2. On Fetch:            {response: null, error: null, isLoading: true}
 *  3. After Fetch
 *      - With Error:       {response: null, error: AxiosError<T>, isLoading: false}
 *      - With Response:    {response: AxiosResponse<T>, error: null, isLoading: false}
 * 
 * UseFetch is a React hook and must be used within the top-level of a React component like React.useState or React.useEffect.
 * 
 * @param config {FetchConfig} Object of type AxiosRequestConfig with required fields `url` and `method`
 * @param lifecycle {UseFetchLifeCycle} Enum that specifies when to send request:
 *                  - Mount:          send request ONLY when component first renders
 *                  - Update:         send request ONLY when config is updated but NOT on first mount
 *                  - MountAndUpdate: send request when component mounts and when config updates
 *
 * @returns {response: AxiosResponse<T> | null, error: AxiosError<T> | null, isLoading: boolean }
 * 
 * @example
 * //Mount Example: My component only needs initial request
 * const Component = () => {
 *   // display username when component mounts
 *   res = useFetch(getUserConfig, UseFetchLifecycle.Mount) 
 *   return(...)
 * }
 * 
 * @example
 * //Update Example: My component should only make request on event trigger
 * const Component = () => {
 *   const [rentConfig, setRentConfig] = useState({...})
 *   // trigger config update through onSubmit invocation from button onClick function
 *   const onSubmit = (dockNumber) => () => setState(prev => ({...prev, data: dockNumber}))
 *   // submit rent for bike when config updates i.e. submit button triggers config update
 *   res = useFetch(rentConfig, UseFetchLifeCycle.Update)   
 *   return(
 *   ...
 *   <button onClick={onSumbit(dockNumber)}>{dockNumber}</button>
 *   ...
 *   )
 * }
 * 
 * @example
 * //MountAndUpdate Example: My component needs initial request and on event trigger
 * const Component = () => {
 *   // display dock info when component mounts 
 *   // invoking setDockConfig triggers update
 *   const [dockConfig, setDockConfig] = useState({...})
 *   res = useFetch(dockConfig, UseFetchLifecycle.MountAndUpdate) 
 *   return(
 *   ...
 *   <button onClick={() => setDockConfig(dockConfig)}>update</button> 
 *   ...
 *   )
 * }
 * 
 * @example
 * //display return values
 * const Component = () => {
 *   res = useFetch(config, UseFetchLifecycle.MountAndUpdate)
 *   return (
 *     <>
 *       {res.isLoading && (<div>loading...</div>)}
 *       {res.error && (<div>Error: {res.error}</div>)}
 *       {res.response && (<div>{res.response.data}</div>)}
 *     </>
 *   )
 * }
 * @adapted from @link {https://www.digitalocean.com/community/tutorials/creating-a-custom-usefetch-react-hook} 

 */
export const useFetch = <T>(
    config: FetchConfig,
    lifecycle: UseFetchLifecycle
): UseFetchResponse<T> => {
    const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
    const [error, setError] = useState<AxiosError<T> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    let isInitialMount = useRef(true); // Allows isInitialMount to preserve value in component updates
    /* UseEffect dependency argument:
        - empty array indicates useEffect will only be invoked on component mount
        - non-empty array indicates useEffect will be invoked on component mount and when the array contents change
        - source: https://reactjs.org/docs/hooks-effect.html 
     */
    const dependency = lifecycle === UseFetchLifecycle.Mount ? [] : [config];
    useEffect(() => {
        let isSubscribed = true; // variable for canceling side-effects if component unmounts
        const fetchData = async () => {
            setIsLoading(true);
            setResponse(null);
            setError(null);
            try {
                const res = await axios.request<T>(config);
                isSubscribed && setResponse(res); //prevent invocation if component is unmounted
            } catch (error) {
                isSubscribed && setError(error as AxiosError<T>);
            } finally {
                isSubscribed && setIsLoading(false);
            }
        };
        /* If lifecycle is set to "UPDATE", fetchData will not be called until config is updated */
        if (lifecycle === UseFetchLifecycle.Update && isInitialMount.current) {
            isInitialMount.current = false; //allows fetchData to be called on next update
        } else {
            fetchData();
        }
        /* 
           Cleanup function to cancel all side-effects if component unmounts
           see: https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
           For example:
             1) User opens Rent page
             2) Rent page fetches bike docks
             3) User switches to home page before fetch is complete
             4) Rent page unmounts and home page mounts
             4) Cleanup function cancels setResponse/setLoading/setError to prevent memory leak from unmounted Rent page
        */
        return () => {
            isSubscribed = false;
        };
    }, dependency);
    return { response, error, isLoading };
};
