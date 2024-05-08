import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {hash} from 'bcrypt';

@Schema({collection: 'user'})
export class UserEntity {
    @Prop()
    email:string

    @Prop({select:false})
    password:string

    @Prop()
    username:string
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity)

UserEntitySchema.pre<UserEntity>('save', async function(next){
    this.password = await hash(this.password, 10);
    next();
})