import { Label } from '../components/label';
import { SvgColor } from '../components/svg-color';
import IconAnalytics from '@assets/icons/navbar/ic-analytics.svg';
import IconUser from '@assets/icons/navbar/ic-user.svg';
import IconCart from '@assets/icons/navbar/ic-cart.svg';
import IconBlog from '@assets/icons/navbar/ic-blog.svg';
import IconLock from '@assets/icons/navbar/ic-lock.svg';
import IconDisable from '@assets/icons/navbar/ic-disabled.svg';

// ----------------------------------------------------------------------

const icon = (source: string) => <SvgColor width="100%" height="100%" src={source} />;

export const navData = [
  {
    title: 'Trang Tổng quan',
    path: '/admin',
    icon: icon(`/assets/icons/navbar/ic-analytics.svg`),
  },
  {
    title: 'Người dùng',
    path: '/admin/user',
    icon: icon(`/assets/icons/navbar/ic-user.svg`),
  },
  {
    title: 'Sản phẩm',
    path: '/admin/product',
    icon: icon(`/assets/icons/navbar/ic-cart.svg`),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
  {
    title: 'Danh mục sản phẩm',
    path: '/admin/catalog',
    icon: icon(`/assets/icons/glass/ic-glass-bag.svg`),
  },
  {
    title: 'Giao dịch',
    path: '/admin/transaction',
    icon: icon(`/assets/icons/glass/ic-glass-buy.svg`),
  },
];
