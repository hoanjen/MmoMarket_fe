'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Add, Delete, Edit, Search, ArrowBack } from '@mui/icons-material';
import { CategoryApi } from '@api/category/category';
import { toast } from 'react-toastify';
import { CategoryTypeApi } from '@api/categorytype/categorytype';
import { AdminApi } from '@api/admin/admin';
import { Iconify } from '@components/admin/components/iconify';
import { Label } from '@components/admin/components/label';

interface DataItem {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
}

// Sample detail data structure
interface DetailItem {
  id: string;
  name: string;
  parentId: string; //category_id
  created_at: string;
  updated_at: string;
}

function toastMessage(status: number, message: string) {
  if (status < 400) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  } else {
    toast.error('Thất bại.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
}

export default function UserView() {
  // View state

  // Main table state
  const [data, setData] = useState<DataItem[]>([]);
  const [detailData, setDetailData] = useState<DetailItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<DataItem | null>(null);

  const fetchApi = async (): Promise<void> => {
    try {
      const userData = await AdminApi.getListUser({});
      setData(
        userData.user.map((item) => {
          return {
            id: item.id,
            email: item.email,
            isVerified: true,
            name: item.full_name || item.first_name + ' ' + item.last_name,
            phone: item.phone_number,
            role: item.roles[0].name,
            username: item.username,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Filter data when search term changes
  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredData(filtered);
    setPage(0);
  }, [searchTerm, data]);

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search handler
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDeleteDialog = (item: DataItem) => {
    setCurrentItem(item);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (currentItem) {
      try {
        await AdminApi.kickUser({ id: currentItem.id });
        if (currentItem.role === 'USER') {
          toast.success('Kick người dùng thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
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
        });
      }

      // Also delete all detail items associated with this parent
      const updatedData = data.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            role: currentItem.role === 'USER' ? 'KICK' : 'USER',
          };
        }
        return item;
      });
      setData(updatedData);
      handleCloseDeleteDialog();
    }
  };

  // Calculate pagination
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách người dùng
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Tìm kiếm theo username và email"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Quyền</TableCell>
                <TableCell>Xác minh</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <Label color={item.role === 'ADMIN' ? 'info' : item.role === 'USER' ? 'success' : 'error'}>
                        {item.role}
                      </Label>
                    </TableCell>
                    <TableCell sx={{ pl: 5 }}>
                      {item.isVerified ? (
                        <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {item.role === 'USER' ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                            onClick={() => handleOpenDeleteDialog(item)}
                          >
                            Kick
                          </Button>
                        ) : (
                          <></>
                        )}
                        {item.role === 'KICK' ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => handleOpenDeleteDialog(item)}
                          >
                            Un Kick
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
          />
        </TableContainer>
      </>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận {currentItem?.role === 'USER' ? 'Kick' : 'Un Kick'}</DialogTitle>
        <DialogContent sx={{ width: 460 }}>
          <DialogContentText>
            Bạn có chắc chắn muốn {currentItem?.role === 'USER' ? 'Kick' : 'Un Kick'} "{currentItem?.username}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
          <Button onClick={handleDelete} variant="contained" color={currentItem?.role === 'USER' ? 'error' : 'primary'}>
            {currentItem?.role === 'USER' ? 'Kick' : 'Un Kick'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
