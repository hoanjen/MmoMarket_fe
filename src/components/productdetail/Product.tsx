import { useState, useEffect, useRef, forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, Link } from 'react-router-dom';
import { ProductApi } from '@api/product/product'
import { OrderApi } from '@api/order/order'
import { Bounce, toast } from 'react-toastify';
import SubProduct from './SubProduct';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '@stores/app/hook';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type productDetail = {
    title: string,
    sub_title: string,
    description: string,
    image: string,
    quantity_sold: number,
    minPrice: number,
    maxPrice: number,
    id: string,
    category_type_id: string,
    user_id: string,
    created_at: string,
    updated_at: string,
    vans_products: {
      id: string,
      title: string,
      description: string,
      price: number,
      quantity: number,
      product_id: string,
      created_at: string,
      updated_at: string
    }[],
    user: {
        id: string;
        first_name: string;
        last_name: string;
        username: string
      }
}

type order = {
    vans_product_id : string
    quantity: number
}

type vansProduct = {
    vans_product_id : string
    quantity: number
    price: number
    description : string
}

type productInvalid = {
    account: boolean,
    password: boolean,
}

type productImport = {
    account: string,
    password: string
}

type createVansProduct = {
    title: string,
    description: string,
    price: number
}

type invalidCreateVansProduct = {
    title: boolean,
    description: boolean,
    price: boolean
}

export default function Product(){
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { id } = useParams<{ id: string}>()
    const user = useAppSelector((state) => state.user);
    const [values, setValues] = useState<productDetail>({
        title: '',
        sub_title: '',
        description: '',
        image: '',
        quantity_sold: 0,
        minPrice: 0,
        maxPrice: 0,
        id: '',
        category_type_id: '',
        user_id: '',
        created_at: '',
        updated_at: '',
        vans_products: 
        [
            {
                id: '',
                title: '',
                description: '',
                price: 0,
                quantity: 0,
                product_id: '',
                created_at: '',
                updated_at: ''
            }
        ],
        user: {
            id: '',
            first_name: '',
            last_name: '',
            username: ''
          }
    });

    const [numberRate, setNumberRate] = useState<number>(0)

    const [invalidCreateVansProduct, setInvalidCreateVansProduct] = useState<invalidCreateVansProduct>({
        title: false,
        description: false,
        price: false,
    });
    const [createVansProduct, setCreateVansProduct] = useState<createVansProduct>({
        title: "",
        description: "",
        price: 0,
    })

    const [invalidProduct, setInvalidProduct] = useState<productInvalid>({
        account: false,
        password: false,
    });
    const [productImport, setProductImport] = useState<productImport>({
        account: "",
        password: ""
    })
    const [vansProduct, setVansProduct] = useState<vansProduct>({
        vans_product_id: '',
        quantity: 0,
        description: '',
        price: 0
    })
    const [tab, setTab] = useState("detail");
    const [order, setOrder] = useState<order>({
        vans_product_id: '',
        quantity: 1
    })
    const [orderValid, setOrderValid] = useState<{
        vans_product_id : boolean
        quantity: boolean
    }>({
        vans_product_id: false,
        quantity: false
    })
    const isOrderSet = useRef(false);
    const handleClick = (id: string) => {
        setOrder({...order, vans_product_id: id});
    };
    const increaseNumber = () =>{
        const newQuantity = Number(order.quantity + 1);
        setOrder({...order, quantity: order.quantity + 1});
    }
    const decreaseNumber = () =>{
        const newQuantity = Number(order.quantity - 1);
        setOrder({...order, quantity: order.quantity - 1});
    }

    useEffect(()=>{
        if(order.quantity < 1 || order.quantity > vansProduct.quantity){
            setOrderValid(
                {
                    ...orderValid,
                    quantity: false,
                }
            );
        }
        else{
            setOrderValid(
                {
                    ...orderValid,
                    quantity: true,
                }
            );
        }
    }, [order, vansProduct])

    const handleChange = (event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
    };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
      };
    
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(orderValid.vans_product_id && orderValid.quantity){
            const res = await OrderApi.buyVansProduct({...order});
            if (res.statusCode === 400) {
                toast.error('Mua hàng thất bại!', {
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
              if (res.data && res.statusCode === 200) {
                toast.success('Mua hàng thành công', {
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
        }
    }
    const handleSubmitProduct = async (event: any) => {
        event.preventDefault();
        
        if(!productImport.account || !productImport.password){
            setInvalidProduct({
                account: productImport.account ? invalidProduct.account : true,
                password: productImport.password ? invalidProduct.password : true,
            })
        }
        else{
            const res = await ProductApi.importVansProduct({
                dataProducts: [
                    {
                        account: productImport.account,
                        password: productImport.password,
                    }
                ], 
                vans_product_id: vansProduct.vans_product_id,
            })
            if (res && res.statusCode === 400) {
                toast.error('Nhập kho sản phẩm thất bại!', {
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
                toast.success('Nhập kho sản phẩm thành công', {
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
    const handleSubmitCreateProduct = async (event: any) => {
        event.preventDefault();

        if(!createVansProduct.title || !createVansProduct.description || !createVansProduct.price){
            setInvalidCreateVansProduct({
                title: createVansProduct.title ? invalidCreateVansProduct.title : true,
                description: createVansProduct.description ? invalidCreateVansProduct.description : true,
                price: createVansProduct.price ? invalidCreateVansProduct.price : true,
            })
        }
        else{
            const res = await ProductApi.createVansProduct({
                title: createVansProduct.title,
                description: createVansProduct.description,
                price: createVansProduct.price,
                product_id: values.id
            })
            if (res && res.statusCode === 400) {
                toast.error('Thêm sản phẩm thất bại!', {
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
                toast.success('Thêm sản phẩm thành công', {
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
                fectchApi()
                handleClose();
            }
        }
    };
    useEffect(() => {
        const selectedProduct = values.vans_products.find(
            (product) => product.id === order.vans_product_id
        );
        if (selectedProduct) {
            setVansProduct({
                vans_product_id: selectedProduct.id,
                quantity: selectedProduct.quantity,
                description: selectedProduct.description,
                price: selectedProduct.price
            });
            const newQuantity = Number(1);
            setOrderValid((prevOrderValid) => ({
                ...prevOrderValid,
                quantity: !(vansProduct.quantity >= newQuantity && newQuantity > 0),
            }));
        }
    }, [order.vans_product_id]);

    const fectchApi = async () => {
        try {
            if(id){
            const res = await ProductApi.getProductDetail(id);
            setValues(res.data);
            if(res.data.vans_products.length >= 1 && isOrderSet.current === false){
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    vans_product_id: order.vans_product_id || res.data.vans_products[0].id
                }));
                setOrderValid({vans_product_id: true, quantity: res.data.vans_products[0].quantity >= 1})
                isOrderSet.current = true;
            }
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    const fectchApiComment = async () => {
        try {
            if(id){
                const res = await ProductApi.getCommentByProductId({product_id: id});
                setNumberRate(res.data.length)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fectchApi()
        fectchApiComment()
    }, []);

    return (
    <>
        {isLoading? 
        <div className="relative flex flex-col rounded-xl shadow-lg p-3 max-w-xs md:max-w-6xl mx-auto border border-white bg-white">
            <form className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-6xl">
                <div className="w-full md:w-1/3 bg-white grid place-items-start">
                    <Skeleton variant="rectangular" width={368} height={368} />
                </div>
                <div className="w-full min-w-[730px] md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        <Skeleton variant="text" width={72} height={24}/>
                        <div className="flex items-center">
                            <Skeleton variant="text" width={134} height={24}/>
                        </div>
                        <Skeleton variant="text" width={94} height={24}/>
                    </div>
                    <Skeleton variant="text" width={714} height={72} />
                    <Skeleton variant="text" width={714} height={28} />
                    <Skeleton variant="text" width={120} height={28} />
                    <Skeleton variant="text" width={120} height={28} />
                    <Skeleton variant="text" width={80} height={28} />
                    <p className="text-3xl font-medium text-gray-800 py-4">
                        <Skeleton variant="text" width={80} height={40} />
                    </p>

                    <FormControl>
                        <Skeleton variant="text" width={80} height={24} />
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {
                                [1, 2, 3].map((index, item)=>{
                                    return <Skeleton key={index} variant="text"  width={160} height={40} />
                                })
                            }
                        </div>
                    </FormControl>
                    <div className="w-[250px] max-w-sm mt-4">
                        <div className="flex flex-col py-4">
                            <Skeleton variant="text" width={80} height={24} />
                            <div className="flex flex-row h-16">
                                <Skeleton variant="text"  width={250} height={40} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 pt-4">
                        {
                            [1, 2, 3].map((index, item)=>{
                                return <Skeleton key={index} variant="text"  width={140} height={40} />
                            })
                        }
                    </div>
                </div>
            </form>
            </div>
        :
        <div className="relative flex flex-col rounded-xl shadow-lg p-3 max-w-xs md:max-w-6xl mx-auto border border-white bg-white">
            <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-6xl">
                <div className="w-full md:w-1/3 bg-white grid place-items-start">
                    <img src={values.image === "" ? values.image : values.image} alt="tailwind logo" className="rounded-xl" />
                </div>
                <div className="w-full min-w-[730px] md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        <p className="text-gray-500 font-medium hidden md:block">Sản phẩm</p>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="text-gray-600 font-bold text-sm ml-1">
                                <span className="text-gray-500 font-normal">({numberRate} đánh giá)</span>
                            </p>
                        </div>
                        <p className="text-gray-600 font-bold text-sm ml-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a1 1 0 011-1h2a1 1 0 01.92.606L8.94 6H17a1 1 0 01.96 1.276l-1.75 7A1 1 0 0115.25 15H7.06l-.25 1H16a1 1 0 110 2H6a1 1 0 01-.96-1.276l1.5-6H4a1 1 0 010-2h1.18L5.44 3.606A1 1 0 014.75 3H3a1 1 0 110-2h2a1 1 0 01.92.606L8.78 10H15.6l1.25-5H8.44L6.94 5H5a1 1 0 01-1-1zM7.5 17a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                            <span className="text-gray-500 font-normal">({values.quantity_sold} đã bán)</span>
                        </p>
                    </div>
                    <h3 className="font-bold text-gray-800 md:text-3xl text-xl">{values.title}</h3>
                    <p className="md:text-lg text-gray-500 text-base">{values.sub_title}</p>
                    <div className="md:text-lg text-gray-500 text-base flex flex-row">
                        Người bán<Link to={`/profile/${values.user.id}`}><p className="md:text-lg text-[#47991f] cursor-pointer text-base">{": " + values.user.username}</p></Link>
                    </div>
                    <p className="md:text-lg text-gray-500 text-base">Kho: {vansProduct.quantity}</p>
                    <p className="text-3xl font-medium text-gray-800 py-4">
                        {new Intl.NumberFormat('vi-VN').format(vansProduct.price)}
                        <span className="font-normal text-gray-600 text-lg"> VND</span>
                    </p>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Sản phẩm:</FormLabel>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {
                                values.vans_products.map((product)=>{
                                    return <Button
                                    key={product.id}
                                    variant={ product.id === order.vans_product_id ? "contained" : "outlined"}
                                    onClick={() => handleClick(product.id)}
                                    className="overflow-hidden text-ellipsis max-w-[600px]"
                                    >{product.title}</Button>

                                })
                            }
                        </div>
                    </FormControl>
                    {
                        values.user_id !== user.id && user.role !== "ADMIN" ?
                        <>
                            <div className="w-[250px] max-w-sm mt-4">
                                <div className="flex flex-col py-4">
                                    <p className="md:text-lg text-gray-500 text-base py-2">Số lượng: </p>
                                    <div className="flex flex-row h-16">
                                        <Button
                                            onClick={decreaseNumber}
                                            disabled={order.quantity <= 1}
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth="1.5" 
                                                stroke="currentColor" 
                                                className="w-8 h-8"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                        </Button>
                                        <TextField
                                            error={!orderValid.quantity}
                                            helperText={!orderValid.quantity? "Số lượng không đủ cho đơn hàng" : ""}
                                            size="small"
                                            id="outlined-number"
                                            value={order.quantity}
                                            type="number"
                                            onChange={(e) => {
                                                const newQuantity = Number(e.target.value);
                                                setOrder((prevOrder) => ({
                                                    ...prevOrder,
                                                    quantity: newQuantity,
                                                }));
                                            }}
                                            />
                                        <Button
                                            onClick={increaseNumber}
                                            disabled={order.quantity >= vansProduct.quantity}
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth="1.5" 
                                                stroke="currentColor" 
                                                className="w-8 h-8"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        ""
                    }
                    <div className="flex flex-row gap-2 pt-4">
                        {
                        user.id !== "" ?
                        <>
                        {
                            values.user_id === user.id ?
                            <FormControl className='mr-2'>
                                <FormLabel id="demo-radio-buttons-group-label">Nhập kho sản phẩm:</FormLabel>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <Link to={`/booth-manage`} className="flex align-center">
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                                Nhập kho
                                        </Button>
                                    </Link>
                                    {/* <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                        fullWidth={true}
                                        component="form"
                                    >
                                        <div className="flex flex-col p-8 space-y-4">
                                        <DialogTitle>{"Nhập kho một sản mới"}</DialogTitle>
                                            <TextField
                                            error={invalidProduct.account}
                                            id="outlined-error-helper-text"
                                            label="Tài khoản"
                                            helperText={invalidProduct.account === false ? "" : "Bắt buộc có tài khoản"}
                                            value={productImport.account}
                                            onChange={(e)=>{
                                                setProductImport({...productImport, account: e.target.value});
                                                if(e.target.value !== ""){
                                                    setInvalidProduct({...invalidProduct, account: false});
                                                }
                                            }}
                                            />
                                            <TextField
                                            error={invalidProduct.password}
                                            id="outlined-error-helper-text"
                                            label="Mật khẩu"
                                            
                                            helperText={invalidProduct.password === false ? "" : "Bắt buộc có mật khẩu"}
                                            value={productImport.password}
                                            onChange={(e)=>{
                                                setProductImport({...productImport, password: e.target.value});
                                                if(e.target.value !== ""){
                                                    setInvalidProduct({...invalidProduct, password: false});
                                                }
                                            }}
                                            />
                                        </div>
                                        <DialogActions>
                                        <Button onClick={handleClose}>Hủy bỏ</Button>
                                        <Button type='submit' onClick={handleSubmitProduct}>Nhập kho</Button>
                                        </DialogActions>
                                    </Dialog> */}
                                </div>
                            </FormControl>
                            :
                            <>
                            {user.role !== "ADMIN" ?    
                                <> 
                                    <Button type="submit" variant="contained">Mua hàng</Button>
                                    <Button variant="contained">Đặt trước</Button>
                                </>              
                                :
                                ""
                            }

                            <Button variant="outlined">
                                <Link to={`http://localhost:3000/chat-box?chat_to=e83f1f7e-d278-4e12-9397-53ebdadfed54`}>Nhắn tin</Link>
                            </Button>
                            </>
                        }

                        </>
                        :
                         <Button type="submit" variant="contained">Đăng nhập</Button>}

                    </div>
                    <div>
                        {
                            values.user_id === user.id ?
                            <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Thêm sản phẩm:</FormLabel>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                <Link to={`/booth-manage`} className="flex align-center">
                                    <Button variant="outlined" onClick={handleClickOpen2}>
                                        Thêm sản phẩm mới
                                    </Button>
                                </Link>
                                    {/* <Dialog
                                        open={open2}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose2}
                                        aria-describedby="alert-dialog-slide-description"
                                        fullWidth={true}
                                        component="form"
                                    >
                                        <div className="flex flex-col p-8 space-y-4">
                                            <DialogTitle>{"Thêm một sản mới"}</DialogTitle>
                                            <TextField
                                            error={invalidCreateVansProduct.title}
                                            id="outlined-error-helper-text"
                                            label="Tiêu đề"
                                            helperText={invalidCreateVansProduct.title === false ? "" : "Bắt buộc có tiêu đề"}
                                            value={createVansProduct.title}
                                            onChange={(e)=>{
                                                setCreateVansProduct({...createVansProduct, title: e.target.value});
                                                if(e.target.value !== ""){
                                                    setInvalidCreateVansProduct({...invalidCreateVansProduct, title: false});
                                                }
                                            }}
                                            />
                                            <TextField
                                            error={invalidCreateVansProduct.description}
                                            id="outlined-error-helper-text"
                                            label="Tiêu đề phụ"
                                            
                                            helperText={invalidCreateVansProduct.description === false ? "" : "Bắt buộc có mô tả đề phụ"}
                                            value={createVansProduct.description}
                                            onChange={(e)=>{
                                                setCreateVansProduct({...createVansProduct, description: e.target.value});
                                                if(e.target.value !== ""){
                                                    setInvalidCreateVansProduct({...invalidCreateVansProduct, description: false});
                                                }
                                            }}
                                            />
                                            <TextField
                                            error={invalidCreateVansProduct.price}
                                            type='number'
                                            placeholder="Mô tả gian hàng"
                                            helperText={invalidCreateVansProduct.price === false ? "" : "Bắt buộc nhập giá sản phẩm"}
                                            value={createVansProduct.price}
                                            onChange={(e)=>{
                                                setCreateVansProduct({...createVansProduct, price: Number(e.target.value)}); 
                                                if(e.target.value !== ""){
                                                    setInvalidCreateVansProduct({...invalidCreateVansProduct, price: false});
                                                }
                                            }}
                                            />
                                        </div>
                                        <DialogActions>
                                        <Button onClick={handleClose2}>Hủy bỏ</Button>
                                        <Button type='submit' onClick={handleSubmitCreateProduct}>Thêm sản phẩm</Button>
                                        </DialogActions>
                                    </Dialog> */}
                                </div>
                            </FormControl>
                            :
                            ""
                        }
                    
                    </div>
                </div>
            </form>
            <SubProduct  description={values.description} tab={tab} handleChange={handleChange} />
        </div>
        }
    </>
  );
}
