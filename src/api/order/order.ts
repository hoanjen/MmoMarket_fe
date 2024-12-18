import axios from '../index';
import { ResponseBuyVansProduct, ResponseOrderHistory, ResponseOrderDetail } from './types'

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

  public static async getOrderHistory ({page} :{page: number}): Promise<ResponseOrderHistory>{
    return axios.get(`/order?limit=10&page=${page}`)
    .then((_)=>(_.data)
    )
  }

  public static async getOrderDetail ({id} :{id: string}): Promise<ResponseOrderDetail>{
    return axios.get(`/order/${id}`)
    .then((_)=>(_.data)
    )
  }

}

