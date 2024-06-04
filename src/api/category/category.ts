import axios from "../index";
import { ResponseCategory } from "./types"

export class CategoryApi {
    public static async getCategory():Promise<ResponseCategory>{
        return axios.get("/category")
            .then((_) => _.data);
    }
}
