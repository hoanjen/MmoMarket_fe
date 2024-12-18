import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderApi } from '@api/order/order';
import { Link } from 'react-router-dom';

type OrderHistory = {
    orders: 
      {
        id: string,
        user_id: string,
        discount_id: string,
        vans_product_id: string,
        quantity: number,
        price: number,
        created_at: string,
        vans_product: {
          price: number,
          quantity: 2,
          product_id: string,
          product: {
            user_id: string,
          }
        }
      }[],
      previousPage: number,
      totalPages: number,
      nextPage: number,
      currentPage: number,
      totalDocs: number,
  }

export default function OrderHistory() {
    const [page, setPage] = useState<number>(1);
    const [values, setValues] = useState<OrderHistory>({
        orders: [
            {
                id: "",
                user_id: "",
                discount_id: "",
                vans_product_id: "",
                quantity: 0,
                price: 0,
                created_at: "",
                vans_product: {
                    price: 0,
                    quantity: 2,
                    product_id: "",
                    product: {
                    user_id: "",
                    }
                }
            }
        ],
        previousPage: 0,
        totalPages: 0,
        nextPage: 0,
        currentPage: 0,
        totalDocs: 0
    })
    useEffect(()=>{
        const getOrderHistory = async () =>{
            try {
                if(page){
                const res = await OrderApi.getOrderHistory({page});
                setValues(res.data);
                }
            } catch (error) {
                console.log(error);
            }
            finally{

            }
        }
        getOrderHistory()
    }, [page]);
    useEffect(()=>{
        const getOrderHistory = async () =>{
            try {
                if(page){
                const res = await OrderApi.getOrderHistory({page});
                setValues(res.data);
                }
            } catch (error) {
                console.log(error);
            }
            finally{

            }
        }
        getOrderHistory()
    }, []);
  return (
    <div className="bg-white p-8 rounded-md w-full">
        <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mã đơn hàng</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày mua</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gian hàng</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mặt hàng</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Người bán</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Số lượng</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Đơn giá</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giảm</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tổng tiền</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hoàn tiền</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                                {values.orders.map((value)=>{
                                    return (
                                    <tr key={value.id}>
                                        <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                            <div className="flex flex-row">                                    
                                                <p className='text-[#47991f] cursor-pointer'><TextsmsOutlinedIcon/></p>
                                                <p className='text-amber-300 cursor-pointer'><StarBorderOutlinedIcon/></p>
                                                <p className='text-red-600 cursor-pointer'><ReportGmailerrorredOutlinedIcon/></p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`/order-detail/${value.id}`}><p className="text-[#47991f] cursor-pointer whitespace-no-wrap">{value.id.slice(0, 8)}</p></Link>
                                            
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{value.created_at}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`/product-detail/${value.vans_product.product_id}`}><p className="text-[#47991f] cursor-pointer  whitespace-no-wrap">{value.vans_product.product_id.slice(0, 8)}</p></Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-[#47991f] cursor-pointer whitespace-no-wrap">{value.vans_product_id.slice(0, 8)}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`/profile/${value.user_id}`}><p className="text-[#47991f] cursor-pointer whitespace-no-wrap">{value.user_id.slice(0, 8)}</p></Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{value.quantity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{new Intl.NumberFormat('vi-VN').format(value.price)}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{new Intl.NumberFormat('vi-VN').format(value.quantity*value.price)}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Hoàn thành</p>
                                        </td>
                                    </tr>)})}
                        </tbody>
                    </table>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">Trang {values.currentPage} của tổng số {values.totalPages}  Trang</span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                            disabled={values.previousPage === null} 
                            onClick={()=>{
                                if(values.previousPage !== null){
                                    setPage(page-1);
                                }
                            }} 
                            className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-l">Trước</button>
                            &nbsp; &nbsp;
                            <button
                            disabled={values.nextPage === null} 
                            onClick={()=>{
                                if(values.nextPage !== null){
                                    setPage(page+1);
                                }
                            }}
                            className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-r">Tiếp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
