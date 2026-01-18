import { Test, TestingModule } from '@nestjs/testing';
import { HeroService } from './hero.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  hero: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  superpower: {
    findMany: jest.fn(),
  },
  image: {
    deleteMany: jest.fn(),
  },
};

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<HeroService>(HeroService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a hero with superpowers and images', async () => {
      const createDto = {
        nickname: 'Test Hero',
        real_name: 'Test Name',
        origin_description: 'Test Origin',
        catch_phrase: 'Test Phrase',
        superpowers: ['Power 1'],
        images: ['http://ex.com/1.jpg'],
      };

      mockPrismaService.hero.create.mockResolvedValue({ id: '1', ...createDto });

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(mockPrismaService.hero.create).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a hero if found', async () => {
      const mockHero = { id: '1', nickname: 'Test' };
      mockPrismaService.hero.findUnique.mockResolvedValue(mockHero);

      const result = await service.findOne('1');
      expect(result).toEqual(mockHero);
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrismaService.hero.findUnique.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update hero data and images', async () => {
      const updateDto = {
        nickname: 'Updated Hero',
        images: ['http://ex.com/new.jpg'],
      };

      mockPrismaService.hero.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.hero.update.mockResolvedValue({ id: '1', ...updateDto });

      const result = await service.update('1', updateDto);

      expect(result).toBeDefined();
      expect(mockPrismaService.hero.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove hero and its images', async () => {
      mockPrismaService.hero.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.image.deleteMany.mockResolvedValue({ count: 1 });
      mockPrismaService.hero.delete.mockResolvedValue({ id: '1' });

      await service.remove('1');

      expect(mockPrismaService.image.deleteMany).toHaveBeenCalled();
      expect(mockPrismaService.hero.delete).toHaveBeenCalled();
    });
  });
});
