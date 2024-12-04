import axios from '../index';
import { ResponseBuyVansProduct } from './types'

export class OrderApi {
  public static async buyVansProduct ({
        vans_product_id, 
        quantity
    }:{
        vans_product_id: string, 
        quantity: number
    }): Promise<ResponseBuyVansProduct>{
        return axios.post(`/order`,
            {
                vans_product_id,
                quantity
            })
        .then((_)=>(_.data)
        )
  }
}
