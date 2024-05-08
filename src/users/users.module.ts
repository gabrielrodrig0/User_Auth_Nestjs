import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from 'entities/UserEntity';


@Module({
  imports:[MongooseModule.forFeature([{name:UserEntity.name, schema: UserEntitySchema}])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
