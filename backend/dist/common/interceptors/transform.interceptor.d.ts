import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ISuccessResponse } from '../../types/types';
export declare class TransformInterceptor<T> implements NestInterceptor<T, ISuccessResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ISuccessResponse<T>>;
    private transform;
    private transformHero;
}
