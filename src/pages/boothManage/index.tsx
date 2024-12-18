import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderApi } from '@api/order/order';
import { Link } from 'react-router-dom';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UploadApi } from '@api/upload/upload'
import { CategoryApi } from '@api/category/category'
import { CategoryTypeApi } from '@api/categorytype/categorytype'
import { ProductApi } from "@api/product/product"
import { Bounce, toast } from 'react-toastify';

type booth = {
    title: string,
    sub_title: string,
    description: string,
    category_type_id: string,
    image: string,
}

type boothInvalid = {
    title: boolean,
    sub_title: boolean,
    description: boolean,
    category_type_id: boolean,
    image: boolean,
}

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

type Category = {
    id: string;
    name: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
  
  type CategoryType = {
    id: string;
    name: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  };
  
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 120,
      },
    },
  };

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function CreateBooth() {
    const [open, setOpen] = useState<boolean>(false);
    const [values, setValues] = useState<booth>({
        title: "",
        sub_title: "",
        description: "",
        category_type_id: "",
        image: "",
    });
    const [invalidValues, setInvalidValues] = useState<boothInvalid>({
        title: false,
        sub_title: false,
        description: false,
        category_type_id: false,
        image: false,
    });
    const [categoryList, setCategoryList] = React.useState<Category[]>([]);
    const [categoryId, setCategoryId] = React.useState<string>('');
    const [categoryTypeList, setCategoryTypeList] = React.useState<CategoryType[]>([]);
    const [categoryTypeId, setCategoryTypeId] = React.useState<string>('');
      const fetchCategoryListApi = async () => {
        try {
          const res = await CategoryApi.getCategory();
          setCategoryList([...res.data.categoryProduct, ...res.data.categoryService]);
        } catch (error) {
          console.log(error);
        }
      };
    
      React.useEffect(() => {
        fetchCategoryListApi();
      }, []);
    
      const fetchCategoryTypeListApi = async (id: string) => {
        try {
          const res = await CategoryTypeApi.getCategoryType({ id: id });
          setCategoryTypeList(res.data.categoryType);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleChangeCategoryId = (e: any) => {
        setCategoryId(e.target.value as string);
        setCategoryId((prev) => {
          fetchCategoryTypeListApi(prev);
          return prev;
        });
        setValues({...values, category_type_id: ""})
      };
    
      const handleChangeCategoryTypeId = (e: any) => {
        setCategoryTypeId(e.target.value as string);
        setValues({...values, category_type_id: e.target.value})
        setInvalidValues({...invalidValues, category_type_id: false})
      };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file?.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            console.log('only jpg, jpeg, png', file);
        } else {
            if(file !== undefined){
                const res = await UploadApi.uploadImage(file)
                setValues({...values, image: res[0].url})
                setInvalidValues({...invalidValues, image: false});
            }
        }
      };
      const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log((values))
        console.log((invalidValues))
        if(!values.category_type_id || !values.title || !values.sub_title || !values.description || !values.image){
            setInvalidValues({
                title: values.title ? invalidValues.title : true,
                sub_title: values.sub_title ? invalidValues.sub_title : true,
                description: values.description ? invalidValues.description : true,
                category_type_id: values.category_type_id ? invalidValues.category_type_id : true,
                image: values.image ? invalidValues.image : true,
            })
        }
        else{
            const res = await ProductApi.createProduct(values)
            if (res && res.statusCode === 400) {
                toast.error('Tạo gian hàng thất bại!', {
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
                
              }
              if (res && res.statusCode === 201) {
                toast.success('Tạo gian hàng thành công', {
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
                handleClose();
              }
        }
    };
    return (
      <React.Fragment>
        <Button variant="contained" onClick={handleClickOpen}>
          Tạo gian hàng
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth={true}
          component="form"
        >
        <DialogTitle>{"Tạo một gian hàng mới của bạn"}</DialogTitle>
        <div className="flex flex-col p-8 space-y-4">
            <FormControl>
                <InputLabel id="demo-simple-select-error-label">Chọn doanh mục sản phẩm</InputLabel>
                <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={categoryId}
                label="Chọn danh mục sản phẩm"
                MenuProps={MenuProps}
                onChange={handleChangeCategoryId}
                >
                {categoryList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                </Select>
            </FormControl>
            <FormControl error={invalidValues.category_type_id}>
                <InputLabel id="demo-simple-select-error-label">Chọn loại sản phẩm</InputLabel>
                <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={categoryTypeId}
                label="Chọn loại sản phẩm"
                MenuProps={MenuProps}
                onChange={handleChangeCategoryTypeId}
                >
                {categoryTypeList?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                </Select>
                {invalidValues.category_type_id === false ? "" : <FormHelperText>Phải chọn loại sản phẩm</FormHelperText>}
            </FormControl>
            <TextField
            error={invalidValues.title}
            id="outlined-error-helper-text"
            label="Tiêu đề"
            helperText={invalidValues.title === false ? "" : "Bắt buộc có tiêu đề"}
            value={values.title}
            onChange={(e)=>{
                setValues({...values, title: e.target.value});
                if(e.target.value !== ""){
                    setInvalidValues({...invalidValues, title: false});
                }
            }}
            />
            <TextField
            error={invalidValues.sub_title}
            id="outlined-error-helper-text"
            label="Tiêu đề phụ"
            
            helperText={invalidValues.sub_title === false ? "" : "Bắt buộc có tiêu đề phụ"}
            value={values.sub_title}
            onChange={(e)=>{
                setValues({...values, sub_title: e.target.value});
                if(e.target.value !== ""){
                    setInvalidValues({...invalidValues, sub_title: false});
                }
            }}
            />
            <TextField
            error={invalidValues.description}
            placeholder="Mô tả gian hàng"
            multiline
            maxRows={6}
            helperText={invalidValues.description === false ? "" : "Hãy nhập mô tả"}
            value={values.description}
            onChange={(e)=>{
                setValues({...values, description: e.target.value});
                if(e.target.value !== ""){
                    setInvalidValues({...invalidValues, description: false});
                }
            }}
            />
            <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Ảnh gian hàng
            <VisuallyHiddenInput
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
            />
            </Button>
        </div>

          <DialogActions>
            <Button onClick={handleClose}>Hủy bỏ</Button>
            <Button type='submit' onClick={handleSubmit}>Tạo gian hàng</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

export default function BoothManage() {
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
        <div className=" flex justify-end ">
            <div className="space-x-8">
                <CreateBooth/>
                <CreateBooth/>
            </div>
		</div>
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
