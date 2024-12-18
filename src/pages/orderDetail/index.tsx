import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderApi } from '@api/order/order';
import { Link } from 'react-router-dom';

type OrderDetail = {
    data_product_orders: 
    {
        data_product: {
            id: string,
            account: string,
            password: string,
        }
    }[]
};
export default function OrderHistory() {
    const { id } = useParams<{id: string}>();
    const [values, setValues] = useState<OrderDetail>({
        data_product_orders:
        [{
            data_product: {
                id: "",
                account: "",
                password: "",
            }
        }]
    })
    useEffect(()=>{
        const getOrderHistory = async () =>{
            try {
                if(id){
                    const res = await OrderApi.getOrderDetail({id});
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
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sản phẩm</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                                {values.data_product_orders.map((value)=>{
                                    return (
                                    <tr key={value.data_product.id}>
                                        <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                            <div className="flex flex-row">                                    
                                                <p className='text-red-600 cursor-pointer'><ReportGmailerrorredOutlinedIcon/></p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 cursor-pointer whitespace-no-wrap">{value.data_product.account}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{value.data_product.password}</p>
                                        </td>
                                    </tr>)})}
                        </tbody>
                    </table>
                    {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
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
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}
