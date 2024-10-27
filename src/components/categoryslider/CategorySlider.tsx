import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './arrow.css';

type data = {
  name: string,
  img: string,
  review: string,
}[]

export default function CategorySlider({ type, data }: { type: string, data: data }) {
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
            <div key={d.name} className="bg-white h-[250px] text-black rounded-xl border-2 border-[#1976d2]">
              <div className="h-40 flex justify-center items-center rounded-t-xl">
                <img src={d.img} alt="" className="h-28 w-28 rounded-full" />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-normal text-[#1976d2]">{d.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
