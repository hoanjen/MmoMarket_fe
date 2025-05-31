import ReportIcon from '@mui/icons-material/Report';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useEffect, useState, forwardRef} from 'react';
import { useParams } from 'react-router-dom';
import { OrderApi } from '@api/order/order';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Bounce, toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import { UploadApi } from '@api/upload/upload';
import { CategoryApi } from '@api/category/category';
import { CategoryTypeApi } from '@api/categorytype/categorytype';
import { ProductApi } from '@api/product/product';
import ProductOwnerTable from '@components/product/TableProduct';
import { logDOM } from '@testing-library/react';
import Rating from '@mui/material/Rating';
import ReportOffIcon from '@mui/icons-material/ReportOff';

type ResponseOrderOfClient = {
  orders: {
    title: string;
    id: string;
    vans_products: {
      title: string;
      return_percent: number;
      orders: {
        id: string;
        user_id: string;
        quantity: number;
        price: number;
        status: string;
        unlock_time: string;
        created_at: string;
        reports: {
          reason: string
        }[]
      }[]
    }[];
  }[];
  previousPage: number;
  totalPages: number;
  nextPage: number;
  currentPage: number;
  totalDocs: number;
};

type OrderReport = {
  order_id: string,
  merchant_id: string,
  reason: string
}

type CommentProduct = {
  product_id: string,
  order_id: string,
  star: number,
  content: string
}

type OrderCancelReport = {
  order_id: string,
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export default function OrderOfClient() {
  const [page, setPage] = useState<number>(1);
  const [values, setValues] = useState<ResponseOrderOfClient>({
    orders: [
      {
        title: '',
        id: '',
        vans_products: [
          {
            title: '',
            return_percent: 0,
            orders: [
              {
                id: '',
                user_id: '',
                quantity: 0,
                price: 0,
                status: '',
                unlock_time: '',
                created_at: '',
                reports: [
                  {
                    reason: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    previousPage: 0,
    totalPages: 0,
    nextPage: 0,
    currentPage: 0,
    totalDocs: 0
  });
  

  const getOrderHistory = async () => {
    try {
      if (page) {
        const res = await OrderApi.getOrderOfClient({ page });
        setValues(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        if (page) {
          const res = await OrderApi.getOrderOfClient({ page });
          setValues(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getOrderHistory();
  }, [page]);
  useEffect(() => {
    getOrderHistory();
  }, []);
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày mua
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gian hàng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mặt hàng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Người mua
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hoàn tiền
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lý do báo cáo
                  </th>
                </tr>
              </thead>
              <tbody>
                {values.orders.map((value) => {
                  return (
                    <tr key={value.vans_products[0].orders[0].id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Tooltip title={value.vans_products[0].orders[0].id} arrow>
                          <p className="text-[#47991f] cursor-pointer whitespace-no-wrap">{value.vans_products[0].orders[0].id.slice(0, 8)}...</p>
                        </Tooltip>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(value.vans_products[0].orders[0].created_at).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Asia/Ho_Chi_Minh'
                          })}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/product-detail/${value.id}`}>
                         <Tooltip title={value.title} arrow>
                            <p className="text-[#47991f] whitespace-no-wrap cursor-pointer">
                            {value.title.length > 8
                              ? `${value.title.slice(0, 8)}...`
                              : value.title
                              }
                            </p>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Tooltip title={value.vans_products[0].title} arrow>
                          <p className="text-[#47991f] cursor-pointer  whitespace-no-wrap">
                            {
                              value.vans_products[0].title.length > 8 ?
                                `${value.vans_products[0].title.slice(0, 8)}...`
                                :
                                value.vans_products[0].title.slice(0, 8)
                            }
                          </p>
                        </Tooltip>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/profile/${value.vans_products[0].orders[0].user_id}`}>
                          <Tooltip title={value.vans_products[0].orders[0].user_id} arrow>
                            <p className="text-[#47991f] cursor-pointer whitespace-no-wrap">
                              {
                                value.vans_products[0].orders[0].user_id.length > 8 ?
                                `${value.vans_products[0].orders[0].user_id.slice(0, 8)}...`
                                :
                                value.vans_products[0].orders[0].user_id.slice(0, 8)
                              }
                            </p>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{value.vans_products[0].orders[0].quantity}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.vans_products[0].orders[0].price)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.vans_products[0].orders[0].quantity * value.vans_products[0].orders[0].price)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.vans_products[0].orders[0].status == null ? 0 : value.vans_products[0].return_percent*(value.vans_products[0].orders[0].quantity * value.vans_products[0].orders[0].price)/100)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p
                          className={
                            value.vans_products[0].orders[0].status == 'FREEZE'
                              ? 'text-blue-400 whitespace-no-wrap'
                              : value.vans_products[0].orders[0].status == 'SUCCESS'
                                ? 'whitespace-no-wrap text-[#47991f]'
                                : value.vans_products[0].orders[0].status == 'REPORT'
                                  ? 'whitespace-no-wrap text-red-600'
                                  : 'whitespace-no-wrap text-yellow-400'
                          }
                        >
                          {value.vans_products[0].orders[0].status == 'FREEZE'
                            ? 'Tạm giữ'
                            : value.vans_products[0].orders[0].status == 'SUCCESS'
                              ? 'Thành công'
                              : value.vans_products[0].orders[0].status == 'REPORT'
                                ? 'Tranh chấp'
                                : 'Hoàn trả'}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {value.vans_products[0].orders[0].reports !== null ? value.vans_products[0].orders[0].reports[0].reason: ""}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Trang {values.currentPage} của tổng số {values.totalPages} Trang
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  disabled={values.previousPage === null}
                  onClick={() => {
                    if (values.previousPage !== null) {
                      setPage(page - 1);
                    }
                  }}
                  className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-l"
                >
                  Trước
                </button>
                &nbsp; &nbsp;
                <button
                  disabled={values.nextPage === null}
                  onClick={() => {
                    if (values.nextPage !== null) {
                      setPage(page + 1);
                    }
                  }}
                  className="text-sm text-indigo-50 transition duration-150 min-w-16 hover:bg-[#54be4b] bg-[#47991f] font-semibold py-2 px-4 rounded-r"
                >
                  Tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}