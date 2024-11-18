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
    path: '/admin/dashboard',
    icon: icon(IconAnalytics),
  },
  {
    title: 'User',
    path: '/admin/user',
    icon: icon(IconUser),
  },
  {
    title: 'Product',
    path: '/admin/products',
    icon: icon(IconCart),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/admin/blog',
    icon: icon(IconBlog),
  },
  {
    title: 'Sign in',
    path: '/admin/sign-in',
    icon: icon(IconLock),
  },
  {
    title: 'Not found',
    path: '/admin/404',
    icon: icon(IconDisable),
  },
];
