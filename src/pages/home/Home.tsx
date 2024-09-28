import Search from '../../components/search/search';
import CategorySlider from '../../components/categoryslider/CategorySlider';
export default function Home() {
  return (
    <div className="flex flex-col">
      <Search />
      <CategorySlider type="SẢN PHẢM" />
      <CategorySlider type="DỊCH VỤ" />
    </div>
  );
}
