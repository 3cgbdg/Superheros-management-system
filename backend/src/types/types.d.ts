export interface IHero {
    id: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    catch_phrase: string;
    superpowers: string[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IPaginatedResponse<T> {
    data: T[];
    total: number;
}

export interface ISuccessResponse<T> {
    success: boolean;
    data: T;
}

export interface IHeroCreate {
    nickname: string;
    real_name: string;
    origin_description: string;
    catch_phrase?: string;
    superpowers: string[];
    images: string[];
}

export interface IHeroUpdate extends Partial<IHeroCreate> { }
