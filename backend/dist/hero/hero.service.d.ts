import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IPaginatedResponse } from '../types/types';
export declare class HeroService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createHeroDto: CreateHeroDto): Promise<any>;
    findAll(page: number, limit: number): Promise<IPaginatedResponse<any>>;
    findAllSuperpowers(search?: string): Promise<string[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateHeroDto: UpdateHeroDto): Promise<any>;
    remove(id: string): Promise<any>;
}
