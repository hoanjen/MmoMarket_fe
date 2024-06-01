import axios from "../index";
import { ResponseProduct } from "./types"

export class ProductApi {
    public static async getProduct ({
            id
        }:{
            id: string
        }):Promise<ResponseProduct>{
        return axios
        .get(`/product/categoryType?categorytype_id=${id}&limit=10&page=1`)
        .then((_)=>_.data)        
    }
}