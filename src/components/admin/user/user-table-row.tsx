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

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  phone_number: string;
  username: string;
  avatarUrl: string;
  isVerified: boolean;
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
      await AdminApi.kickUser({ id: row.id });
      if (row.role !== 'KICK') {
        toast.success('Kick người dùng thành công', {
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
        toast.success('Khôi phục người dùng thành công', {
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
      console.log(error);
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
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.username}</TableCell>

        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone_number}</TableCell>

        <TableCell>
          <Label color={row.role === 'ADMIN' ? 'info' : row.role === 'USER' ? 'success' : 'error'}>{row.role}</Label>
        </TableCell>

        <TableCell align="center">
          {row.isVerified ? <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} /> : '-'}
        </TableCell>

        {row.role !== 'ADMIN' ? (
          <TableCell align="right">
            <IconButton onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        ) : (
          <></>
        )}
      </TableRow>
      {row.role !== 'ADMIN' ? (
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
              width: 140,
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
            {row.role === 'KICK' ? (
              <MenuItem onClick={handleAction}>
                <Iconify icon="mingcute:add-line" />
                Un Kick
              </MenuItem>
            ) : (
              <MenuItem onClick={handleAction} sx={{ color: 'error.main' }}>
                <Iconify icon="solar:trash-bin-trash-bold" />
                Kick
              </MenuItem>
            )}
          </MenuList>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
}

//user table row
