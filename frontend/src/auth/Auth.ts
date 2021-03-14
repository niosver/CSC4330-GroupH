import axios from 'axios';
import { UserCreation, UserLogin, UserPublic } from 'types/User';
import type { FetchConfig } from 'UseFetch';

/** Interface for authentication object
 * @typedef user
 */
export interface IAuth {
    user: UserPublic | null;
    loading: boolean;
    init(callback: () => void): Promise<boolean>;
    signIn(userLogin: UserLogin, callback: () => void): Promise<boolean>;
    signUp(userCreation: UserCreation, callback: () => void): Promise<boolean>;
    signOut(callback: () => void): Promise<boolean>;
}

/**
 * State object for authentication that stores current user's public data for
 * granting access to guarded routes and supplying data for consumer operations
 *
 * @todo
 * - Implement handling of different views e.g. customer, manager, owner
 * - Implement backend sign-up method
 * - Implement error handling
 * - Refactor to Auth to return component and use hook: UseFetch
 */
export class Auth implements IAuth {
    public user: UserPublic | null;
    public loading: boolean;
    /* Temporary placeholder for api */

    /** Initialize authentication object with no user signed-in */
    constructor() {
        this.user = null;
        this.loading = false;
    }
    public async init(callback: () => void) {
        this.loading = true;
        let success = false;
        try {
            const config: FetchConfig = {
                url: '/api/accounts/me',
                method: 'GET',
                withCredentials: true,
            };
            const res = await axios.request<UserPublic>(config);
            if (res.status == 200) {
                success = true;
                this.user = res.data;
                callback();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            console.log('Auth: ', this.loading);
            return success;
        }
    }
    /**
     * Method to sign-in a user into the application by:
     *      1) verifying email and password are correct through post request to api
     *      2) invoking callback function to router user to appropriate user view
     *
     * @param userLogin {UserLogin} Object containing email and password
     * @param callback {() => void} function to be invoked after verifying correct email, password
     *
     * @returns {Promise<boolean>} promise resolving to true on sign-in success
     *                           | to false on sign-in failure
     */
    public async signIn(userLogin: UserLogin, callback: () => void): Promise<boolean> {
        this.loading = true;
        let success = false;
        try {
            const config: FetchConfig = {
                url: '/api/accounts/login',
                method: 'POST',
                data: { ...userLogin },
                withCredentials: true,
                xsrfCookieName: 'connect.sid',
            };
            const res = await axios.request<UserPublic>(config);
            /* check if api returns valid public user object */
            if (res.status === 200) {
                success = true;
                this.user = res.data;
                callback();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            return success;
        }
    }
    public async signUp(userCreation: UserCreation): Promise<boolean> {
        this.loading = true;
        let success = false;
        try {
            const config: FetchConfig = {
                url: '/api/signup',
                method: 'POST',
                data: { ...userCreation },
            };
            const res = await axios.request<UserPublic | { error: any }>(config);
            /* check if api returns valid public user object */
            if (res.status === 200) {
                success = true;
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            return success;
        }
    }
    /**
     * Method to sign-out a user from the application by:
     *  1) Remove user object from storage
     *  2) Invoke callback to route user to sign-in page
     *
     * @param callback {() => void} function to be invoked after removing user
     * @returns {Promise<boolean>} promise resolving to true on sign-out success
     *                           | promise resolving to false on sign-out failure
     */
    public async signOut(callback: () => void): Promise<boolean> {
        this.loading = true;
        this.user = null;
        let success = false;
        try {
            const config: FetchConfig = {
                url: '/api/accounts/logout',
                method: 'POST',
                withCredentials: true,
            };
            const res = await axios.request(config);
            if (res.status == 200) {
                success = true;
                callback();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
            return success;
        }
    }
}
