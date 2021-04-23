import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { reflectViewAsTemplate } from './view-as.decorator';

@Injectable()
export class ContentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const content = req.header('Accept');
    const contType = 'Content-Type';
    const json = 'application/json';
    const html = 'text/html';

    return next.handle().pipe(
      switchMap(data => {
        if (content.includes(html)) {
          const template = reflectViewAsTemplate(context.getHandler() as any);
          res.header(contType, html);
          // Render the html template and return it from the interceptor.
          // Note this is the three argument version of res.render otherwise
          // render will try to set its own headers on the response.
          return bindNodeCallback(res.render).call(res, template, data);
        } else {
          // Return the data as-is.
          res.header(contType, json);
          return of(data);
        }
      }),
    );
  }
}
