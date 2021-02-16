import { createContext, useContext } from 'react';
import { UserLogin, UserPublic, UserRole } from 'types/User';

interface IAuth {
    user: UserPublic | null;
    signIn(userLogin: UserLogin, callback: () => void): Promise<boolean>;
    signOut(callback: () => void): boolean;
}
class Auth implements IAuth {
    public user: UserPublic | null;

    private validUsers: UserPublic[] = [
        {
            id: 1,
            email: 'user1@email.com',
            address: 'address1',
            birthday: new Date(Date.now()),
            phoneNumber: 2251234567,
            role: UserRole.Customer,
        },
        {
            id: 2,
            email: 'user2@email.com',
            address: 'address2',
            birthday: new Date(Date.now()),
            phoneNumber: 2257651234,
            role: UserRole.Customer,
        },
    ];

    constructor() {
        this.user = null;
    }

    public async signIn(userLogin: UserLogin, callback: () => void): Promise<boolean> {
        // const maybeUserPublic = await fetch()

        const maybeUserPublic: UserPublic | null = await this.validUsers
            .map((u) => (userLogin.email === u.email ? u : null))
            .reduce((val) => val);
        this.user = maybeUserPublic;
        if (maybeUserPublic != null) {
            this.user = maybeUserPublic;
            callback();
            return true;
        }
        return false;
    }

    public signOut(callback: () => void) {
        this.user = null;
        callback();
        return true;
    }
}

const defaultAuthContext = new Auth();
export type AuthCTX = Auth;
export const AuthContext = createContext<AuthCTX>(defaultAuthContext);
export const useAuth = (): AuthCTX => useContext<AuthCTX>(AuthContext);
