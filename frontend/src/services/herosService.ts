import { ApiResponse, IHero, PaginatedResponse } from "@/types/heros";
import { api } from "./axiosInstance";



class HerosService {

    async getHeros(page: number, limit: number): Promise<ApiResponse<PaginatedResponse<IHero>>> {
        const response = await api.get("/heros", { params: { page, limit } });
        return response.data;
    }

    async getHero(id: string): Promise<ApiResponse<IHero>> {
        const response = await api.get(`/heros/${id}`);
        return response.data;
    }

    async createHero(hero: Partial<IHero>): Promise<ApiResponse<IHero>> {
        const response = await api.post("/heros", hero);
        return response.data;
    }

    async updateHero(id: string, hero: Partial<IHero>): Promise<ApiResponse<IHero>> {
        const response = await api.patch(`/heros/${id}`, hero);
        return response.data;
    }

    async deleteHero(id: string): Promise<ApiResponse<null>> {
        const res = await api.delete(`/heros/${id}`);
        return res.data;
    }

    async getSuperpowers(search?: string): Promise<ApiResponse<string[]>> {
        const response = await api.get("/heros/superpowers", { params: { search } });
        return response.data;
    }
}

const herosService = new HerosService();
export default herosService;
