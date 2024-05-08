import { UserEntity } from "entities/UserEntity"
export type UserResponseType = Omit<UserEntity, 'password'> & {token:string}