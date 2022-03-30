import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { HttpStatus } from '@nestjs/common';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (status, field, error) => {
      response.status(status).json({
        status,
        error,
        field,
      });
    };
    switch (exception.code) {
      case 11000:
        responseMessage(HttpStatus.CONFLICT, 'duplicate', exception.message);
    }
  }
}
