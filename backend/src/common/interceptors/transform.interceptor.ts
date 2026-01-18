import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    success: boolean;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
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
        return this.transformHero(data);
    }

    private transformHero(hero: any): any {
        if (!hero || typeof hero !== 'object') return hero;

        // Check if it's a Hero object with nested Prisma relations
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
