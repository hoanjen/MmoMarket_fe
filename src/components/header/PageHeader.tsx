import { useEffect, useState } from 'react';
import { useAppSelector } from '@stores/app/hook';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import HistoryIcon from '@mui/icons-material/History';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import Cookies from 'js-cookie';
import DialogAuth from '../auth/auth';
import { CategoryApi } from '../../api/category/category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { ProfileApi } from '../../api/profile/profile';
import { setUser } from '../../stores/slice/user.slice';
import { useAppDispatch } from '../../stores/app/hook';
import SettingsIcon from '@mui/icons-material/Settings';

type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

function TabLists() {
  const [value, setValue] = useState(-1);
  const [categoryProduct, setCategoryProduct] = useState<Category[]>([]);
  const [categoryService, setCategoryService] = useState<Category[]>([]);
  const user = useAppSelector((state) => state.user);

  const fectchApi = async () => {
    try {
      const res = await CategoryApi.getCategory();
      setCategoryProduct(res.data.categoryProduct);
      setCategoryService(res.data.categoryService);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  return (
    <div className="flex flex-row w-1/2 justify-around h-full cursor-pointer">
      <div
        className="relative inline p-4 hover:border-b-4 border-sky-500 text-lg"
        onMouseOver={() => {
          setValue(1);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        Sản phẩm
        {value === 1 ? <ExpandMoreIcon color="primary" /> : <ExpandLessIcon />}
        <div className={value === 1 ? 'absolute top-[64px] left-0 ' : 'absolute top-[64px] left-0 hidden'}>
          <List
            className="bg-[#7be2b0]"
            sx={{ width: '200px', maxWidth: 360, bgcolor: 'rgb(33 191 115)' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {categoryProduct.length !== 0 ? (
              categoryProduct.map((item, index) => {
                return (
                  <ListItem key={index} className="hover:bg-[#7be2b0] bg-[#21bf73]">
                    <ListItemText primary={item.name}></ListItemText>
                  </ListItem>
                );
              })
            ) : (
              <Stack spacing={1}>
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
              </Stack>
            )}
          </List>
        </div>
      </div>
      {/* <div
        className="relative inline p-4 hover:border-b-4 border-sky-500  text-lg"
        onMouseOver={() => {
          setValue(2);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        Dịch vụ
        {value === 2 ? <ExpandMoreIcon color="primary" /> : <ExpandLessIcon />}
        <div className={value === 2 ? 'absolute top-[64px] left-0 ' : 'absolute top-[64px] left-0 hidden'}>
          <List
            className="bg-[#7be2b0]"
            sx={{ width: '200px', maxWidth: 360, bgcolor: 'rgb(33 191 115)' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {categoryService.length !== 0 ? (
              categoryService.map((item, index) => {
                return (
                  <ListItem key={index} className="hover:bg-[#7be2b0] bg-[#21bf73]">
                    <ListItemText primary={item.name}></ListItemText>
                  </ListItem>
                );
              })
            ) : (
              <Stack spacing={1}>
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
                <Skeleton animation="wave" variant="rectangular" width={200} height={32} />
              </Stack>
            )}
          </List>
        </div>
      </div> */}
      <div
        className="relative inline p-4 hover:border-b-4 border-sky-500  text-lg"
        onMouseOver={() => {
          setValue(3);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        Hỗ trợ
      </div>
      <div
        className="relative inline p-4 hover:border-b-4 border-sky-500 text-lg"
        onMouseOver={() => {
          setValue(4);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        Chia sẻ
      </div>
      <div
        className="relative inline p-4 hover:border-b-4 border-sky-500 text-lg"
        onMouseOver={() => {
          setValue(4);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        Công cụ
      </div>
      <div
        className="relative inline p-4 hover:border-b-4 border-sky-500 text-lg"
        onMouseOver={() => {
          setValue(5);
        }}
        onMouseOut={() => {
          setValue(-1);
        }}
      >
        FAQs
      </div>
      {
        user.role !== 'ADMIN' ?
        <Link to={`/payment`} className="flex align-center">
          <div
            className="relative inline p-4 hover:border-b-4 border-sky-500 text-lg"
            onMouseOver={() => {
              setValue(6);
            }}
            onMouseOut={() => {
              setValue(-1);
            }}
          >
            Nạp tiền
          </div>
        </Link> 
        :
        ""
      }
    </div>
  );
}

function BasicPopover({ user }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar src={user?.avatar}></Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <NestedList user={user} handleClose={handleClose}></NestedList>
        </Typography>
      </Popover>
    </div>
  );
}

function NestedList({ handleClose, user }: { handleClose: Function; user: any }) {
  const setLogout = () => {
    if (Cookies.get('access_token')) {
      Cookies.remove('access_token');
      location.reload();
    }
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to={`/profile/${user.id}`}>
        <ListItemButton
          onClick={() => {
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Thông tin cá nhân
        </ListItemButton>
      </Link>
      {user.role === 'ADMIN' ? (
        <Link to={`/admin`}>
          <ListItemButton
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Trang Quản trị
          </ListItemButton>
        </Link>
      ) : (
        <div>
          <Link to={`/order-history/1`}>
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <LocalGroceryStoreIcon />
              </ListItemIcon>
              Đơn hàng đã mua
            </ListItemButton>
          </Link>
          <Link to={`/deposit-history`}>
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              Lịch sử thanh toán
            </ListItemButton>
          </Link>
          <Link to={`/order-client`}>
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <OutlinedFlagIcon />
              </ListItemIcon>
              Lịch sử bán hàng
            </ListItemButton>
          </Link>
          <Link to={`/booth-manage`}>
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <ContentPasteIcon />
              </ListItemIcon>
              Quản lý gian hàng
            </ListItemButton>
          </Link>
        </div>
      )}

      <ListItemButton
        onClick={() => {
          handleClose();
          setLogout();
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>
    </List>
  );
}

export default function PageHeader() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const getUserInfo = async () => {
    const userInfor = await ProfileApi.getProfileByToken();
    dispatch(
      setUser({
        id: userInfor.data.user.id,
        email: userInfor.data.user.email,
        username: userInfor.data.user.username,
        avatar: userInfor.data.user.avatar,
        phone_number: userInfor.data.user.phone_number,
        role: userInfor.data.user.role,
        balance: userInfor.data.user.balance.account_balance,
      }),
    );
  };

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (Cookies.get('access_token')) {
      setIsLogin(true);
      getUserInfo();
    }
  }, []);

  return (
    <div className="flex flex-row w-full  items-center h-16 bg-[#21bf73] text-white font-medium">
      <Link to={`/`} className="logo w-32 h-16 overflow-hidden flex justify-center items-center ml-60">
        <img
          className="w-64"
          src="https://mmomarket.s3.amazonaws.com/image/1730041035280-dad08553-fa36-426f-a13b-c54ebb7519e9-z5973472124256_8ce6ac2daaa7807748f7db6108be0681.jpg"
          alt=""
        />
      </Link>
      <TabLists></TabLists>
      {isLogin ? (
        <div className="flex flex-row justify-around w-60">
          {
            user.role !== 'ADMIN' ? 
            <Link to={'/deposit-history'}>
              <IconButton color="inherit" className="text-xs max-w-15">
                  <p className="text-xl">{user.balance.toLocaleString('de-DE')} VND </p>
              </IconButton>
            </Link>
            :
           ""
          }
          <IconButton color="inherit">
            <Link to={'/chat-box'}>
              <QuestionAnswerIcon />
            </Link>
          </IconButton>
          {/* <IconButton color="inherit">
            <NotificationsNoneIcon />
          </IconButton> */}
          <BasicPopover user={user}></BasicPopover>
        </div>
      ) : (
        <DialogAuth setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
