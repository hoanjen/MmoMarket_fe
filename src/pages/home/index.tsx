import CategorySlider from '@components/categoryslider/CategorySlider';
import Search from '@components/search/search';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import { ProductApi } from '@api/product/product';

type TopProduct = {
  id: string,
  title: string,
  image: string,
  sub_title: string,
  quantity_sold: number,
  minPrice: number,
  maxPrice: number
}[]

const dataProduct = [
  {
    id: "",
    title: `EMAIL`,
    image: `https://taphoammo.net/images/categories/mail.png`,
    sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    quantity_sold: 0,
    minPrice: 0,
    maxPrice: 0
  },
  {
    id: "",
    title: `Phần mềm`,
    image: `https://taphoammo.net/images/categories/soft2.png`,
    sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    quantity_sold: 0,
    minPrice: 0,
    maxPrice: 0
  },
  {
    id: "",
    title: `Tài khoản`,
    image: `https://taphoammo.net/images/categories/account.png`,
    sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    quantity_sold: 0,
    minPrice: 0,
    maxPrice: 0
  },
  {
    id: "",
    title: `Khác`,
    image: `https://taphoammo.net/images/categories/more.png`,
    sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    quantity_sold: 0,
    minPrice: 0,
    maxPrice: 0
  },
]

export default function Home() {
  const [topProducts, setTopProducts] = useState<TopProduct>(dataProduct)

  useEffect(() => {
      const getOrderHistory = async () => {
        try {
            const res = await ProductApi.getAllProduct();
            setTopProducts(res);
        } catch (error) {
          console.log(error);
        } finally {

        }
      };
      getOrderHistory();
    }, []);

  const dataService = [
    {
      id: "",
      title: `EMAIL`,
      image: `https://taphoammo.net/images/categories/mail.png`,
      sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      quantity_sold: 0,
      minPrice: 0,
      maxPrice: 0
    },
    {
      id: "",
      title: `Phần mềm`,
      image: `https://taphoammo.net/images/categories/soft2.png`,
      sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      quantity_sold: 0,
      minPrice: 0,
      maxPrice: 0
    },
    {
      id: "",
      title: `Tài khoản`,
      image: `https://taphoammo.net/images/categories/account.png`,
      sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      quantity_sold: 0,
      minPrice: 0,
      maxPrice: 0
    },
    {
      id: "",
      title: `Khác`,
      image: `https://taphoammo.net/images/categories/more.png`,
      sub_title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      quantity_sold: 0,
      minPrice: 0,
      maxPrice: 0
    },
  ];
  return (
    <div className="flex flex-col mt-8 mx-36">
      <Search />
      <CategorySlider type="SẢN PHẨM" data={topProducts} />
      <CategorySlider type="DỊCH VỤ" data={dataService}/>
    </div>
  );
}
