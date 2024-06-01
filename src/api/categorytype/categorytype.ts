import axios from "../index";
import { ResponseCategoryType } from "./types"

export class CategoryTypeApi {
    public static async getCategoryType():Promise<ResponseCategoryType>{
        return axios.get("/category-type?limit=10&page=1")
            .then((_) => _.data);
    }
}
