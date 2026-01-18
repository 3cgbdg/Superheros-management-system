

export type ApiResponse<T> = {
  success: boolean;
  status?: string | null;
  data?: T;
  message?: string;
  errors?: string[];
};

export interface IHero {
  id: string;
  real_name: string;
  nickname: string;
  origin_description: string;
  superpowers: string[];
  images: string[];
  catch_phrase: string;
  createdAt: string;
  updatedAt?: string;
}