import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'dto/createUser.dto';
import { UserEntity } from 'entities/UserEntity';
import { Model } from 'mongoose';
import { UserResponseType } from '../types/userResponse.type';
import { LoginDto } from 'dto/login.dto';
import {compare} from 'bcrypt'
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserEntity.name) private userModel:Model<UserEntity>){}

    async createUser(createUserDto:CreateUserDto):Promise<UserEntity>
    {
        const user = await this.userModel.findOne({email:createUserDto.email})

        if(!createUserDto.email || !createUserDto.password || !createUserDto.username)
        {
            throw new HttpException('Preencha todos os campos', 400);
        }

        if(user)
        {
            throw new HttpException('E-mail já foi cadastrado!', 400);
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save()
    }

    async login(loginDto:LoginDto): Promise<UserEntity>
    {
        const user = await this.userModel.findOne({email:loginDto.email }).select('+password')

        if(!user)
        {
            throw new HttpException('Usuário não encontrado', 404);
        }

        const isPasswordCorrect = await compare(loginDto.password, user.password);
        
        if(!isPasswordCorrect)
        {
            throw new HttpException('Senha incorreta', 401);
        }

        return user;
    }

    buildUserResponse(userEntity:UserEntity): UserResponseType
    {
        return {
            username:userEntity.username,
            email:userEntity.email,
            token:this.generateJwt(userEntity)
        }
    }

    generateJwt(userEntity:UserEntity):string 
    {
        return sign({email: userEntity.email}, 'Botafogo');
    }

    async findByEmail(email:string): Promise<UserEntity>
    {
        return this.userModel.findOne({email})
    }

}
