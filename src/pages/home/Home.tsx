import CategorySlider from '@components/categoryslider/CategorySlider';
import Search from '@components/search/search';
export default function Home() {
  return (
    <div className="flex flex-col">
      <Search />
      <CategorySlider type="SẢN PHẢM" />
      <CategorySlider type="DỊCH VỤ" />
    </div>
  );
}
