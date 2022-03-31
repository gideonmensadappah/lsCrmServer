import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthController } from './routes/auth/auth.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './routes/employee/employee.module';
import { AuthModule } from './routes/auth/auth.module';
import { AuthService } from './routes/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@realmcluster.jtvpg.mongodb.net/${process.env.LS_BASE_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    AuthModule,

    EmployeeModule,
  ],
  exports: [AppService],
  providers: [AuthService, AppService],
  controllers: [AppController, AuthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
