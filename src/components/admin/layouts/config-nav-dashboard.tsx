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
    title: 'Dashboard',
    path: '/admin',
    icon: icon(`/assets/icons/navbar/ic-analytics.svg`),
  },
  {
    title: 'User',
    path: '/admin/user',
    icon: icon(`/assets/icons/navbar/ic-user.svg`),
  },
  {
    title: 'Product',
    path: '/admin/product',
    icon: icon(`/assets/icons/navbar/ic-cart.svg`),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
];
