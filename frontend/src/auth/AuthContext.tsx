import { createContext, useContext } from 'react';
import { UserLogin, UserPublic, UserRole } from 'types/User';

/** Interface for authentication object
 * @typedef user
 */
interface IAuth {
    user: UserPublic | null;
    signIn(userLogin: UserLogin, callback: () => void): Promise<boolean>;
    signOut(callback: () => void): boolean;
}

/**
 * State object for authentication that stores current user's public data for
 * granting access to guarded routes and supplying data for consumer operations
 *
 * @todo
 * - Implement handling of different views e.g. customer, manager, owner
 * - Implement request/request-handling to backend api
 * - Implement global storage (cache, cookies, or token)?
 * - Implement sign-up method
 */
class Auth implements IAuth {
    public user: UserPublic | null;

    /* Temporary placeholder for api */
    private validUsers: UserPublic[] = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'user1@email.com',
            address: 'address1',
            birthDate: new Date(Date.now()),
            phoneNumber: 2251234567,
            role: UserRole.Customer,
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'user2@email.com',
            address: 'address2',
            birthDate: new Date(Date.now()),
            phoneNumber: 2257651234,
            role: UserRole.Customer,
        },
    ];
    /** Initialize authentication object with no user signed-in */
    constructor() {
        /* possibly check cache for cookie/token to initialize with stored user? */
        //this.user = await fetch(cookie_or_token) || null;

        this.user = null;
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
        /* api operation to be implemented here */
        // const maybeUserPublic = await fetch()

        /* temporary placeholder operation for api */
        const maybeUserPublic: UserPublic | null = await this.validUsers
            .map((u) => (userLogin.email === u.email ? u : null))
            .reduce((val) => val);
        this.user = maybeUserPublic;

        /* check if api returns valid public user object */
        if (maybeUserPublic != null) {
            /* set user object to retrieved user */
            this.user = maybeUserPublic;

            /* store cookie or token here */
            // something

            /* invoke callback to route user to user view */
            callback();

            /* signal successful sign-in */
            return true;
        }
        /* signal failed to sig-in */
        return false;
    }
    /**
     * Method to sign-out a user from the application by:
     *  1) Remove user object from storage
     *  2) Invoke callback to route user to sign-in page
     *
     * @param callback {() => void} function to be invoked after removing user
     * @returns {true}
     */
    public signOut(callback: () => void): true {
        this.user = null;
        callback();
        return true;
    }
}
const defaultAuthContext = new Auth();

/**
 * Type for authentication context
 * @see {IAuth}
 * @see {Auth}
 */
export type AuthCTX = Auth;
/**
 * Authentication context object to be supplied to Context.Provider.
 * Should only be used by Context.Provider
 *
 * @example
 * const auth = useAuth();
 * <AuthContext.Provider value={auth} children={...children}/>
 */
export const AuthContext = createContext<AuthCTX>(defaultAuthContext);
/**
 * Authentication Context hook for global usage
 *
 * @example
 * const auth = useAuth();
 * const user: UserPublic = auth.user;
 */
export const useAuth = (): AuthCTX => useContext<AuthCTX>(AuthContext);
