import CategorySlider from '@components/categoryslider/CategorySlider';
import Search from '@components/search/search';
export default function Home() {
  const dataProduct = [
    {
      name: `EMAIL`,
      img: `https://taphoammo.net/images/categories/mail.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Phần mềm`,
      img: `https://taphoammo.net/images/categories/soft2.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Tài khoản`,
      img: `https://taphoammo.net/images/categories/account.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Khác`,
      img: `https://taphoammo.net/images/categories/more.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ];
  const dataService = [
    {
      name: `EMAIL`,
      img: `https://taphoammo.net/images/categories/mail.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Phần mềm`,
      img: `https://taphoammo.net/images/categories/soft2.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Tài khoản`,
      img: `https://taphoammo.net/images/categories/account.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Khác`,
      img: `https://taphoammo.net/images/categories/more.png`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ];
  return (
    <div className="flex flex-col">
      <Search />
      <CategorySlider type="SẢN PHẢM" data={dataProduct} />
      <CategorySlider type="DỊCH VỤ" data={dataService}/>
    </div>
  );
}
