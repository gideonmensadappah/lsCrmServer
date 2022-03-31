import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { initializeApp } from 'firebase-admin/app';
import { credential, ServiceAccount } from 'firebase-admin';
import serviceAccount from './lscrm-3f251-firebase-adminsdk-fvscw-8babace0e2.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));

  // initializeApp({
  //   credential: credential.cert(serviceAccount as ServiceAccount),
  // });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
}

bootstrap();
//
