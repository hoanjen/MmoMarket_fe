import Rating from '@mui/material/Rating';
import { productSchema } from './ProductList';

export function Product(props: { product: productSchema }) {
  const quantity = props.product.vans_products.reduce((acc, current) => {
    return acc + current.quantity;
  }, 0);
  const image =
    props.product.image ?? 'https://taphoammo.net/img/telegram-ngam-lau-3-6-thang-chi-file-session_7144937.png';
  return (
    <div className="grid grid-cols-7 w-full border-[1.5px] h-auto py-4 px-6 shadow-md">
      <div className="col-span-2 flex flex-col justify-center text-center">
        <img src={image} alt="photo" className="object-scale-down h-44 w-44" />
        <div className="w-44 flex flex-col text-center">
          <p>
            Tồn kho: <span className="text-green-500">{quantity}</span>{' '}
          </p>
          <p className="font-bold">
            {props.product.minPrice} đ - {props.product.maxPrice} đ
          </p>
        </div>
      </div>
      <div className="col-span-5 flex flex-col space-y-2">
        <a className="font-semibold text-[16px] hover:text-green-500">
          <span className="px-1 py-[1px] text-[14px]  bg-green-500 text-white mr-1">Sản phẩm</span>
          <span>{props.product.title}</span>
        </a>
        <div className="flex items-center">
          <Rating name="read-only" value={4.5} readOnly size="small" precision={0.5} />
          <span className="text-[14px] text-[#b3b3b3]">
            1196 Reviews | Đã bán: {props.product.quantity_sold ?? 0} | Khiếu nại: 0.0%
          </span>
        </div>
        <div className="text-[14px]">
          <div>
            <p>
              Người bán: <span className="text-green-500"> dangtrungkienprovip</span>
            </p>
            <p>
              Sản phẩm : <span className="text-green-500">Tài Khoản Telegram</span>
            </p>
          </div>
          <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
            <li>
              <p>{props.product.description}</p>
            </li>
            {/* <li>
              <p>
                NT ĐƯỢC. | +84 : TDATA/SESSION BH SIM 1 NĂM T9/2025 | +880: TÀI KHOẢN QUA SD,YÊU CẦU PROXY,KHÔNG NT
                ĐƯỢC.. | +855 : TDATA/SESSION NEW ( DÙNG TDATA ) | +84 :TDATA/SESSION NEW T10 ( DÙNG TDATA )
              </p>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
