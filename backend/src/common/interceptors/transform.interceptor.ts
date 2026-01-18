import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISuccessResponse } from '../../types/types';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ISuccessResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ISuccessResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data: this.transform(data),
            })),
        );
    }

    private transform(data: any): any {
        if (Array.isArray(data)) {
            return data.map((item) => this.transformHero(item));
        }
        if (data && typeof data === 'object' && Array.isArray(data.data) && typeof data.total === 'number') {
            return {
                ...data,
                data: data.data.map((item: any) => this.transformHero(item)),
            };
        }
        return this.transformHero(data);
    }

    private transformHero(hero: any): any {
        if (!hero || typeof hero !== 'object') return hero;

        if (hero.superpowers || hero.images) {
            const transformed = { ...hero };

            if (Array.isArray(hero.superpowers)) {
                transformed.superpowers = hero.superpowers.map((s: any) =>
                    typeof s === 'string' ? s : s.superpower
                );
            }

            if (Array.isArray(hero.images)) {
                transformed.images = hero.images.map((i: any) =>
                    typeof i === 'string' ? i : i.imageUrl
                );
            }

            return transformed;
        }

        return hero;
    }
}
