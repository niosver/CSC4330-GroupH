import * as z from 'zod';

export enum UserRole {
    Admin = 'ADMIN',
    Owner = 'OWNER',
    Manager = 'MANAGER',
    Customer = 'CUSTOMER',
}
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

/* ZOD VALIDATION OBJECTS */

/** Validation object for user */
export const userSchema = z.object({
    id: z.number().positive(),
    role: z.enum([UserRole.Admin, UserRole.Owner, UserRole.Manager, UserRole.Customer]),
    email: z.string().email(),
    password: z.string().min(8).max(16),
    address: z.string(),
    birthday: z.date(),
    // takes input as string -> validates against regex -> transforms to number for server
    phoneNumber: z
        .string()
        .regex(phoneRegex)
        .transform(z.number(), (str) => parseInt(str, 10)),
    creditCard: z.number().optional(), // validation might be too complex
});
/** Validation object for new user */
export const userCreationSchema = userSchema.omit({
    id: true,
    creditCard: true,
    role: true,
});
/** Validation object for adding new credit card */
export const userAddNewCreditCard = userSchema.pick({ creditCard: true });
/** Validation object for existing user login */
export const userLoginSchema = userSchema.pick({ email: true, password: true });
/** Validation object for modifying existing user's credentials */
export const userMutationSchema = userSchema.partial();
/* private schema for type/interface initialization */
const _userPublicSchema = userSchema.omit({ creditCard: true, password: true });
/* TYPES AND INTERFACES */
/*
   types: used for functions/variables
   interfaces: used for classes
*/
/** Type for User */
export type User = z.infer<typeof userSchema>;
/** Interface for User */
export type IUser = User;
/** Type for storing user details in client */
export type UserPublic = z.infer<typeof _userPublicSchema>;
/** Interface for storing user details in client */
export type IUserPublic = UserPublic;
/** Type for creating new User */
export type UserCreation = z.infer<typeof userCreationSchema>;
/** Interface for creating new User */
export type IUserCreation = UserCreation;
/** Type for User login */
export type UserLogin = z.infer<typeof userLoginSchema>;
/** Interface for User login */
export type IUserLogin = UserLogin;
/** Type for modifying User properties */
export type UserMutation = z.infer<typeof userMutationSchema>;
/** Interface for modifying User properties */
export type IUserMutation = UserMutation;