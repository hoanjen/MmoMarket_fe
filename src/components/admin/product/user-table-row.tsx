import { useState, useCallback, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from '../components/label';
import { Iconify } from '../components/iconify';
import { AdminApi } from '@api/admin/admin';
import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  title: string;
  sub_title: string;
  description: string;
  quantity_sold: number;
  image: string;
  minPrice: string;
  maxPrice: string;
  deleted: boolean;
  user: {
    id: string;
    email: string;
    username: string;
  };
};

type UserTableRowProps = {
  row: UserProps;
  onAction: Dispatch<SetStateAction<boolean>>;
  isReloadData: boolean;
};

export function UserTableRow({ row, onAction, isReloadData }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const fetchApi = async (): Promise<void> => {
    try {
      await AdminApi.deleteProduct({ id: row.id });

      if (!row.deleted) {
        toast.success('Xóa sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      } else {
        toast.success('Khôi phục sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error('Thất bại', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      console.log(error);
    }
  };

  const handleAction = async () => {
    await fetchApi();
    if (onAction) {
      onAction(!isReloadData); // Gọi lại hàm fetchData từ component cha để reload dữ liệu
    }

    handleClosePopover();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.title} src={row.image} />
            {row.title}
          </Box>
        </TableCell>

        <TableCell>{row.quantity_sold}</TableCell>

        <TableCell>{row.user.email}</TableCell>
        <TableCell>{`${row.minPrice} - ${row.maxPrice} `}</TableCell>
        {/* <TableCell>{row.deleted}</TableCell> */}

        <TableCell>
          <Label color={row.deleted === true ? 'error' : 'success'}>
            {row.deleted === false ? 'Hoạt động' : 'Đã xóa'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 150,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem>
            <Iconify icon="solar:share-bold" />
            <Link target="_blank" to={`/product-detail/${row.id}`}>
              Xem sản phẩm
            </Link>
          </MenuItem>
          {row.deleted === false ? (
            <MenuItem onClick={handleAction} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Xóa
            </MenuItem>
          ) : (
            <MenuItem onClick={handleAction}>
              <Iconify icon="mingcute:add-line" />
              Khôi phục
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </>
  );
}

//user table row
