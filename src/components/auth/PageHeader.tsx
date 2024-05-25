import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
import { Link } from 'react-router-dom';

function TabLists() {
  const [value, setValue] = React.useState(0);

  return(
    <div className="flex flex-row w-1/2 justify-around h-full">
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(1)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM ONE
        <div className={value === 1? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(2)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM TWO
        <div className={value === 2? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(3)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM THREE
        <div className={value === 3? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(4)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM FOUR
        <div className={value === 4? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(5)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM FIVE
        <div className={value === 5? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
      <div className="relative inline p-4 hover:border-b-4 border-sky-500" 
          onMouseOver={()=>{
            setValue(6)
          }} 
          onMouseOut={()=>{
            setValue(0)
          }} >
        ITEM SIX
        <div className={value === 6? "absolute top-[64px] left-0 ": "absolute top-[50px] left-0  hidden"} >
            <List
              sx={{ width: '200px', maxWidth: 360, bgcolor: 'white' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
              <ListItem className="hover:bg-slate-50">
                <ListItemText  primary="Single-line 2 item"></ListItemText>
              </ListItem>
            </List>
        </div>
      </div>
    </div>
  )
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
          <NestedList handleClose={handleClose}></NestedList>
        </Typography>
      </Popover>
    </div>
  );
}

function NestedList({handleClose} :{handleClose: Function}) {

    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={() =>{
          handleClose()
        }}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>
        <ListItemButton onClick={() =>{
          handleClose()
        }}>
          <ListItemIcon>
            <LocalGroceryStoreIcon />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng đã mua" />
        </ListItemButton>
        <ListItemButton onClick={() =>{
          handleClose()
        }}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Lịch sử thanh toán" />
        </ListItemButton>
        <ListItemButton onClick={() =>{
          handleClose()
        }}>
          <ListItemIcon>
            <ContentPasteIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý nội dung" />
        </ListItemButton>
        <ListItemButton onClick={() =>{
          handleClose()
        }}>
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
        <div className='flex flex-row w-full justify-between items-center h-16'>
            <div className='logo bg-black w-32 h-14'></div>
            <TabLists></TabLists>
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