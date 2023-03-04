import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

export class ClassSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>):
  Observable<any> | Promise<Observable<any>>
  {
    // Run something before a request is handled
    // beforeHandled
    console.log('beforeHandled', context)


    return next.handle().pipe(
      map((data:any) => {
        // Run something before the response is sent out
        // beforeResponseOut
        console.log('beforeResponseOut', data)
      })
    )
  }
}