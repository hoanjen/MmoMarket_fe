import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './arrow.css';
import { Link } from 'react-router-dom';

type TopProduct = {
  id: string,
  title: string,
  image: string,
  sub_title: string,
  quantity_sold: number,
  minPrice: number,
  maxPrice: number
}[]

export default function CategorySlider({ type, data }: { type: string, data: TopProduct }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="mt-16 bg-white">
      <div className="flex flex-col items-center text-xl font-semibold pt-4 pb-4 text-[#1976d2]">
        <p>-- DANH SÁCH {type} --</p>
      </div>
      <div className="">
        <Slider {...settings}>
          {data.map((d) => (
          <Link to={`/product-detail/${d.id}`} >
            <div key={d.id} className="bg-white h-[250px] text-black rounded-xl border-2 border-[#1976d2]">
              <div className="h-36 flex justify-center items-center rounded-t-xl">
                <img src={d.image} alt="" className="h-28 w-28 rounded-full" />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-2">
                <p className="w-full h-3 flex items-center justify-center overflow-hidden relative text-m font-normal text-[#000000]">

                    <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Đã bán: {d.quantity_sold}
                    </span>
                </p>
                <p className="w-full h-3 flex items-center justify-center overflow-hidden relative text-m font-normal text-[#000000]">
                  <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {`${d.minPrice.toLocaleString('vi-VN')}đ - ${d.maxPrice.toLocaleString('vi-VN')}đ`}
                  </span>
                </p>
                <p className="w-full h-6 flex items-center justify-center overflow-hidden relative text-xl font-normal text-[#1976d2]">
                  {d.title.length > 12 ? (
                    <span className="absolute animate-marquee whitespace-nowrap">
                      {d.title}
                    </span>
                  ) : (
                    <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                      {d.title}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
