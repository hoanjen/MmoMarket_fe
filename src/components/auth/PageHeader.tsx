import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
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
function TabList() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '50%'}}>
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
        >
            <Tab
                sx={{padding: "22px 16px"}}
                value={1}
                label="Item one"
            />
            <Tab 
                sx={{padding: "22px 16px"}}
                value={2} 
                label="Item Two" />
            <Tab 
                sx={{padding: "22px 16px"}}
                value={3} 
                label="Item Three" />
            <Tab
                sx={{padding: "22px 16px"}}
                value={4} 
                label="Item Four" />
            <Tab 
                sx={{padding: "22px 16px"}}
                value={5} 
                label="Item Five" />
            <Tab 
                sx={{padding: "22px 16px"}}
                value={6} 
                label="Item Six" />            
        </Tabs>
    </Box>

  );
}

function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

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
        <Avatar>H</Avatar>
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
          <NestedList></NestedList>
        </Typography>
      </Popover>
    </div>
  );
}

function NestedList() {

    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LocalGroceryStoreIcon />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng đã mua" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Lịch sử thanh toán" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ContentPasteIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý nội dung" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    );
}

export default function PageHeader (){

    return(
        <div className='flex flex-row w-full justify-between items-center h-14'>
            <div className='logo bg-black w-32 h-14'></div>
            <TabList></TabList>
            <div className='flex flex-row justify-between w-60'>
            <IconButton>
              <HelpOutlineIcon/>
            </IconButton>
            <IconButton>
              <MailOutlineIcon/>
            </IconButton>
            <IconButton>
              <QuestionAnswerIcon/>
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon/>
            </IconButton>
            <BasicPopover></BasicPopover>
            </div>
        </div>
    )
}