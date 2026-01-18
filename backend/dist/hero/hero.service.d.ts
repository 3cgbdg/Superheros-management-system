import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class HeroService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createHeroDto: CreateHeroDto): Promise<{
        superpowers: {
            id: string;
            superpower: string;
        }[];
        images: {
            id: string;
            imageUrl: string;
            heroId: string;
        }[];
    } & {
        id: string;
        real_name: string;
        nickname: string;
        origin_description: string;
        catch_phrase: string;
    }>;
    findAll(): Promise<({
        superpowers: {
            id: string;
            superpower: string;
        }[];
        images: {
            id: string;
            imageUrl: string;
            heroId: string;
        }[];
    } & {
        id: string;
        real_name: string;
        nickname: string;
        origin_description: string;
        catch_phrase: string;
    })[]>;
    findAllSuperpowers(): Promise<string[]>;
    findOne(id: string): Promise<{
        superpowers: {
            id: string;
            superpower: string;
        }[];
        images: {
            id: string;
            imageUrl: string;
            heroId: string;
        }[];
    } & {
        id: string;
        real_name: string;
        nickname: string;
        origin_description: string;
        catch_phrase: string;
    }>;
    update(id: string, updateHeroDto: UpdateHeroDto): Promise<{
        superpowers: {
            id: string;
            superpower: string;
        }[];
        images: {
            id: string;
            imageUrl: string;
            heroId: string;
        }[];
    } & {
        id: string;
        real_name: string;
        nickname: string;
        origin_description: string;
        catch_phrase: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        real_name: string;
        nickname: string;
        origin_description: string;
        catch_phrase: string;
    }>;
}
