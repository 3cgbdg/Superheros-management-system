import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FindAllDto } from './dto/find-all.dto';
import { IPaginatedResponse } from '../types/types';
export declare class HeroController {
    private readonly heroService;
    constructor(heroService: HeroService);
    create(createHeroDto: CreateHeroDto): Promise<any>;
    findAll(query: FindAllDto): Promise<IPaginatedResponse<any>>;
    findAllSuperpowers(search: string): Promise<string[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateHeroDto: UpdateHeroDto): Promise<any>;
    remove(id: string): Promise<any>;
}
