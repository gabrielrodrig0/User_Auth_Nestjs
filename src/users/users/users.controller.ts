import { Body, Controller, Post, Request, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'dto/createUser.dto';
import { UsersService } from './users.service';
import { LoginDto } from 'dto/login.dto';
import { UserResponseType } from '../types/userResponse.type';
import { ExpressRequest } from '../middlewares/auth.middleware';

@Controller('users')
export class UsersController {
    
    constructor(private userService:UsersService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseType> 
    {
        const user = await this.userService.createUser(createUserDto);
        console.log(this.userService.buildUserResponse(user))
        return this.userService.buildUserResponse(user);
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto): Promise<UserResponseType>
    {
        const user = await this.userService.login(loginDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')

    async currentUser(@Request() req: ExpressRequest):Promise<UserResponseType>
    {
        if(!req.user)
        {
            throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
        }
        return this.userService.buildUserResponse(req.user);
    }
}