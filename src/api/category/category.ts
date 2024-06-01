import axios from "../index";
import { ResponseCategory } from "./types"

export class CategoryApi {
    public static async getCategory():Promise<ResponseCategory>{
        return axios.get("/category?limit=10&page=1&populate=CategoryType")
            .then((_) => _.data);
    }
}
