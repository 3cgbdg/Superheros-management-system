import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FindAllDto } from './dto/find-all.dto';
import { IPaginatedResponse } from '../types/types';

@Controller('heros')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto): Promise<any> {
    return this.heroService.create(createHeroDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto): Promise<IPaginatedResponse<any>> {
    return this.heroService.findAll(query.page, query.limit);
  }

  @Get('superpowers')
  findAllSuperpowers(@Query('search') search: string): Promise<string[]> {
    return this.heroService.findAllSuperpowers(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.heroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto): Promise<any> {
    return this.heroService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.heroService.remove(id);
  }
}
