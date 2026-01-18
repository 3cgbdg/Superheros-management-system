"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HeroService = class HeroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createHeroDto) {
        const { superpowers, images, ...heroData } = createHeroDto;
        return this.prisma.hero.create({
            data: {
                ...heroData,
                superpowers: {
                    connectOrCreate: superpowers.map((s) => ({
                        where: { superpower: s },
                        create: { superpower: s },
                    })),
                },
                images: {
                    create: images.map((url) => ({ imageUrl: url })),
                },
            },
            include: {
                superpowers: true,
                images: true,
            },
        });
    }
    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.hero.findMany({
                include: {
                    superpowers: true,
                    images: true,
                },
                skip,
                take: limit,
            }),
            this.prisma.hero.count()
        ]);
        return { data, total };
    }
    async findAllSuperpowers(search) {
        const superpowers = await this.prisma.superpower.findMany({
            where: search ? {
                superpower: {
                    contains: search,
                    mode: 'insensitive',
                },
            } : {},
            select: {
                superpower: true,
            },
            take: 10,
        });
        return superpowers.map(s => s.superpower);
    }
    async findOne(id) {
        const hero = await this.prisma.hero.findUnique({
            where: { id },
            include: {
                superpowers: true,
                images: true,
            },
        });
        if (!hero) {
            throw new common_1.NotFoundException(`Hero with ID ${id} not found`);
        }
        return hero;
    }
    async update(id, updateHeroDto) {
        const { superpowers, images, ...heroData } = updateHeroDto;
        await this.findOne(id);
        return this.prisma.hero.update({
            where: { id },
            data: {
                ...heroData,
                ...(superpowers && {
                    superpowers: {
                        set: [],
                        connectOrCreate: superpowers.map((s) => ({
                            where: { superpower: s },
                            create: { superpower: s },
                        })),
                    },
                }),
                ...(images && {
                    images: {
                        deleteMany: {},
                        create: images.map((url) => ({ imageUrl: url })),
                    },
                }),
            },
            include: {
                superpowers: true,
                images: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.image.deleteMany({ where: { heroId: id } });
        return this.prisma.hero.delete({ where: { id } });
    }
};
exports.HeroService = HeroService;
exports.HeroService = HeroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HeroService);
//# sourceMappingURL=hero.service.js.map