import { ApiResponse, IHero } from "@/types/heros";
import { api } from "./axiosInstance";



class HerosService {

    async getHeros(): Promise<ApiResponse<IHero[]>> {
        const response = await api.get("/heros");
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

    async getSuperpowers(): Promise<ApiResponse<string[]>> {
        const response = await api.get("/heros/superpowers");
        return response.data;
    }
}

const herosService = new HerosService();
export default herosService;
