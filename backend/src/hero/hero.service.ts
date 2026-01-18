import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IPaginatedResponse } from '../types/types';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) { }

  async create(createHeroDto: CreateHeroDto): Promise<any> {
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

  async findAll(page: number, limit: number): Promise<IPaginatedResponse<any>> {
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

  async findAllSuperpowers(search?: string): Promise<string[]> {
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

  async findOne(id: string): Promise<any> {
    const hero = await this.prisma.hero.findUnique({
      where: { id },
      include: {
        superpowers: true,
        images: true,
      },
    });
    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }
    return hero;
  }

  async update(id: string, updateHeroDto: UpdateHeroDto): Promise<any> {
    const { superpowers, images, ...heroData } = updateHeroDto;

    // Check if hero exists
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
            deleteMany: {}, // Properly remove old images before adding updated list
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

  async remove(id: string): Promise<any> {
    await this.findOne(id);

    await this.prisma.image.deleteMany({ where: { heroId: id } });

    return this.prisma.hero.delete({ where: { id } });
  }
}
