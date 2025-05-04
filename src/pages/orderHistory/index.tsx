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
type OrderHistory = {
  orders: {
    id: string;
    user_id: string;
    discount_id: string;
    vans_product_id: string;
    quantity: number;
    price: number;
    status: string;
    created_at: string;
    vans_product: {
      title: string;
      price: number;
      quantity: 2;
      product_id: string;
      product: {
        user_id: string;
        title: string;
        user: {
          id: string;
          username: string;
        }
      };
    };
    comments: [],
    freeze: {
      return: number
    }
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

export default function OrderHistory() {
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [openDialogComment, setOpenDialogComment] = useState<boolean>(false);
  const [openDialogCancelReport, setOpenDialogCancelReport] = useState<boolean>(false);
  const [valuesReport, setValuesReport] = useState<OrderReport>({
    order_id: '',
    merchant_id: '',
    reason: ''
  })
  const [valuesReportInvalid, setValuesReportInvalid] = useState<boolean>(false)
  const [valuesComment, setValuesComment] = useState<CommentProduct>({
    product_id: '',
    order_id: '',
    star: 2,
    content: '',
  })
  const [valuesCommentInvalid, setValuesCommentInvalid] = useState<boolean>(false)
  const [valuesCancelReport, setValuesCancelReport] = useState<OrderCancelReport>({
    order_id: '',
  })
  const [values, setValues] = useState<OrderHistory>({
    orders: [
      {
        id: '',
        user_id: '',
        discount_id: '',
        vans_product_id: '',
        quantity: 0,
        price: 0,
        created_at: '',
        status: '',
        vans_product: {
          title: '',
          price: 0,
          quantity: 2,
          product_id: '',
          product: {
            user_id: '',
            title: '',
            user: {
              id: '',
              username: '',
            }
          },
        },
        comments: [],
        freeze:{
          return: 0
        }
      },
    ],
    previousPage: 0,
    totalPages: 0,
    nextPage: 0,
    currentPage: 0,
    totalDocs: 0,
  });

  const getOrderHistory = async () => {
    try {
      if (page) {
        const res = await OrderApi.getOrderHistory({ page });
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
          const res = await OrderApi.getOrderHistory({ page });
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

  const handleClickOpenDialogCancelReport = (orderId: string) => {
    setValuesCancelReport({
      order_id: orderId
    })
    setOpenDialogCancelReport(true);
  };

  const handleCloseDialogCancelReport = () => {
    setValuesCancelReport({
      order_id: ''
    })
    setOpenDialogCancelReport(false);
  }; 

  const handleSubmitCancelReport = async (event: any) => {
    event.preventDefault();
    const res = await OrderApi.cancelReportOrder(valuesCancelReport);
    if (res && res.statusCode === 400) {
      toast.error('Hủy báo cáo thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleCloseDialogCancelReport()
      getOrderHistory();
    }
    if (res && res.statusCode === 200) {
      toast.success('Hủy báo cáo thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleCloseDialogCancelReport()
      getOrderHistory();
    }
  };

  const handleClickOpenDialogComment = (productId: string, orderId: string, star: number, content: string) => {
    setValuesComment(
      {
        product_id: productId,
        order_id: orderId,
        star: star,
        content: content,
      }
    )
    setOpenDialogComment(true);
  };

  const handleCloseDialogComment = () => {
    setValuesCommentInvalid(false)
    setOpenDialogComment(false);
  }; 

  const handleSubmitComment = async (event: any) => {
    event.preventDefault();
    if(valuesComment.content == ""){
      setValuesCommentInvalid(true)
      return
    }
    const res = await ProductApi.createCommentProduct(valuesComment);
    if (res && res.statusCode === 400) {
      toast.error('Đánh giá thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleCloseDialogComment()
      getOrderHistory();
    }
    if (res && res.statusCode === 200) {
      toast.success('Đánh giá thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleCloseDialogComment()
      getOrderHistory();
    }
  };

  const handleClickOpen = (orderId: string, userId: string) => {
    setValuesReport(
      {
      order_id: orderId, 
      merchant_id: userId,
      reason: ''
      }
    )
    setOpen(true);
  };

  const handleClose = () => {
    setValuesReportInvalid(false)
    setOpen(false);
  }; 

  const handleSubmitReport = async (event: any) => {
    event.preventDefault();
    if(valuesReport.reason == ""){
      setValuesReportInvalid(true)
      return
    }
    const res = await OrderApi.reportOrder(valuesReport);
    if (res && res.statusCode === 400) {
      toast.error('Báo cáo thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleClose()
      getOrderHistory();
    }
    if (res && res.statusCode === 200) {
      toast.success('Báo cáo thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      handleClose()
      getOrderHistory();
    }
  };
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
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
                    Người bán
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
                </tr>
              </thead>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                component="form"
              >
                <DialogTitle>{'Báo cáo đơn hàng'}</DialogTitle>
                <div className="flex flex-col p-8 space-y-4">
                  <TextField
                    error = {valuesReportInvalid}
                    helperText = {valuesReportInvalid == true ? "Hãy nhập lý do báo cáo" : ""}
                    placeholder="Mô tả lý do"
                    multiline
                    maxRows={6}
                    value={valuesReport.reason}
                    onChange={(e) => {
                      if(valuesReportInvalid == true){
                        setValuesReportInvalid(false)
                      }
                      setValuesReport({ ...valuesReport, reason: e.target.value });
                    }}
                  />
                </div>

                <DialogActions>
                  <Button onClick={handleClose}>Hủy bỏ</Button>
                  <Button type="submit" onClick={handleSubmitReport}>
                    Báo cáo đơn hàng
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDialogComment}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogComment}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                component="form"
              >
                <DialogTitle>{'Đánh giá đơn hàng'}</DialogTitle>
                <div className="flex flex-col p-8 space-y-4">
                  <Rating 
                    name="size-large" 
                    value={valuesComment.star}
                    onChange={(event, newValue) =>{
                      if(newValue == null) return
                      setValuesComment({...valuesComment, star: newValue})
                    }}
                    size="large" 
                  />
                  <TextField
                    error = {valuesCommentInvalid}
                    helperText = {valuesCommentInvalid == true ? "Hãy nhập đánh giá" : ""}
                    placeholder="Mô tả đánh giá"
                    multiline
                    maxRows={6}
                    value={valuesComment.content}
                    onChange={(e) => {
                      if(valuesCommentInvalid == true){
                        setValuesCommentInvalid(false)
                      }
                      setValuesComment({ ...valuesComment, content: e.target.value });
                    }}
                  />
                </div>
                <DialogActions>
                  <Button onClick={handleCloseDialogComment}>Hủy bỏ</Button>
                  <Button type="submit" onClick={handleSubmitComment}>
                    Đánh giá đơn hàng
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDialogCancelReport}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogCancelReport}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                component="form"
              >
                <DialogTitle>{'Hủy báo cáo đơn hàng'}</DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDialogCancelReport}>Hủy bỏ</Button>
                  <Button type="submit" onClick={handleSubmitCancelReport}>
                    Hủy báo cáo
                  </Button>
                </DialogActions>
              </Dialog>
              <tbody>
                {values.orders.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                        <div className="flex flex-row">
                          <p className="text-[#47991f] cursor-pointer">
                            <TextsmsOutlinedIcon />
                          </p>
                          {value.comments.length > 0 || value.status == "REPORT" || value.status == "SUCCESS" ? "" :
                            <p className="text-amber-300 cursor-pointer" onClick={() => handleClickOpenDialogComment(value.vans_product.product_id, value.id, 2, "")}>
                              <StarBorderOutlinedIcon />
                            </p>
                          }
                          {value.status == "FREEZE" ? 
                            <p className="text-red-600 cursor-pointer" onClick={() => handleClickOpen(value.id, value.vans_product.product.user_id)}>
                              <ReportIcon />
                            </p>
                            :
                            ""
                          }
                          {value.status == "REPORT" ? 
                            <p className="text-red-600 cursor-pointer" onClick={() => handleClickOpenDialogCancelReport(value.id)}>
                              <ReportOffIcon />
                            </p>
                            :
                            ""
                          }
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/order-detail/${value.id}`}>
                          <Tooltip title={value.id} arrow>
                            <p className="text-[#47991f] cursor-pointer whitespace-no-wrap">{value.id.slice(0, 8)}...</p>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(value.created_at).toLocaleString('vi-VN', {
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
                        <Link to={`/product-detail/${value.vans_product.product_id}`}>
                          <Tooltip title={value.vans_product.title} arrow>
                            <p className="text-[#47991f] cursor-pointer  whitespace-no-wrap">
                              {
                                value.vans_product.title.length > 8 ?
                                  `${value.vans_product.title.slice(0, 8)}...`
                                  :
                                  value.vans_product.title.slice(0, 8)
                              }
                            </p>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Tooltip title={value.vans_product.product.title} arrow>
                        <p className="text-[#47991f] whitespace-no-wrap cursor-pointer">
                        {value.vans_product.product.title.length > 8
                          ? `${value.vans_product.product.title.slice(0, 8)}...`
                          : value.vans_product.product.title
                          }
                        </p>
                      </Tooltip>
                    </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/profile/${value.vans_product.product.user.id}`}>
                          <Tooltip title={value.vans_product.product.user.username} arrow>
                            <p className="text-[#47991f] cursor-pointer whitespace-no-wrap">
                              {
                                value.vans_product.product.user.username.length > 8 ?
                                `${value.vans_product.product.user.username.slice(0, 8)}...`
                                :
                                value.vans_product.product.user.username.slice(0, 8)
                              }
                            </p>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{value.quantity}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.price)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.quantity * value.price)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Intl.NumberFormat('vi-VN').format(value.freeze == null ? 0 : value.freeze.return)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p
                          className={
                            value.status == 'FREEZE'
                              ? 'text-blue-400 whitespace-no-wrap'
                              : value.status == 'SUCCESS'
                                ? 'whitespace-no-wrap text-[#47991f]'
                                : value.status == 'REPORT'
                                  ? 'whitespace-no-wrap text-red-600'
                                  : 'whitespace-no-wrap text-yellow-400'
                          }
                        >
                          {value.status == 'FREEZE'
                            ? 'Tạm giữ'
                            : value.status == 'SUCCESS'
                              ? 'Thành công'
                              : value.status == 'REPORT'
                                ? 'Tranh chấp'
                                : 'Hoàn trả'}
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