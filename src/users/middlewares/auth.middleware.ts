import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserEntity } from "entities/UserEntity";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { verify } from "jsonwebtoken";

export interface ExpressRequest extends Request 
{
    user?:UserEntity
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor (private userService:UsersService){}

    async use(req:ExpressRequest, res:Response, next:NextFunction)
    {
        if(!req.headers['authorization'])
        {
            req.user = null
            next();
            return
        }

        const token = req.headers['authorization'].split(' ')[1]
        try 
        {
            const decode = verify(token, 'Botafogo') as {email:string}
            const user = await this.userService.findByEmail(decode.email);
            req.user = user;
            next();
        }
        catch(err)
        {
            req.user=null
            next();
        }
    }
}