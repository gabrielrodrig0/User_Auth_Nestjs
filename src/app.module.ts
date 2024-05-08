import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

//ESTUDAR!!!!
import { AuthMiddleware } from './users/middlewares/auth.middleware';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/socialmedia')],
  controllers: [],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
