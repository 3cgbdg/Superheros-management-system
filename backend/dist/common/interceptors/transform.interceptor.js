"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => ({
            success: true,
            data: this.transform(data),
        })));
    }
    transform(data) {
        if (Array.isArray(data)) {
            return data.map((item) => this.transformHero(item));
        }
        if (data && typeof data === 'object' && Array.isArray(data.data) && typeof data.total === 'number') {
            return {
                ...data,
                data: data.data.map((item) => this.transformHero(item)),
            };
        }
        return this.transformHero(data);
    }
    transformHero(hero) {
        if (!hero || typeof hero !== 'object')
            return hero;
        if (hero.superpowers || hero.images) {
            const transformed = { ...hero };
            if (Array.isArray(hero.superpowers)) {
                transformed.superpowers = hero.superpowers.map((s) => typeof s === 'string' ? s : s.superpower);
            }
            if (Array.isArray(hero.images)) {
                transformed.images = hero.images.map((i) => typeof i === 'string' ? i : i.imageUrl);
            }
            return transformed;
        }
        return hero;
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map