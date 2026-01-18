import { IsString, IsArray, IsNotEmpty, MinLength, IsOptional, IsUrl } from 'class-validator';

export class CreateHeroDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    real_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    origin_description: string;

    @IsString()
    @IsOptional()
    catch_phrase?: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    superpowers: string[];

    @IsArray()
    @IsUrl({}, { each: true })
    @IsNotEmpty({ each: true })
    images: string[];
}
