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
  Avatar,
} from '@mui/material';
import { Add, Delete, Edit, Search, ArrowBack } from '@mui/icons-material';
import { CategoryApi } from '@api/category/category';
import { toast } from 'react-toastify';
import { CategoryTypeApi } from '@api/categorytype/categorytype';
import { AdminApi } from '@api/admin/admin';
import { Iconify } from '@components/admin/components/iconify';
import { Label } from '@components/admin/components/label';

import { Link } from 'react-router-dom';

interface DataItem {
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
}

// Sample detail data structure
interface DetailItem {
  id: string;
  name: string;
  parentId: string; //category_id
  created_at: string;
  updated_at: string;
}

export default function TransactionViews() {
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
      const userData = await AdminApi.getListProduct({});
      setData(userData.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Filter data when search term changes
  useEffect(() => {
    const filtered = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const deleteProduct = async (): Promise<void> => {
    if (currentItem) {
      try {
        await AdminApi.deleteProduct({ id: currentItem.id });

        if (!currentItem.deleted) {
          toast.success('Xóa sản phẩm thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            // transition: Bounce,
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
            // transition: Bounce,
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
          // transition: Bounce,
        });
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    if (currentItem) {
      await deleteProduct();
      const updatedData = data.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            deleted: !currentItem.deleted,
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
              label="Tìm kiếm theo tên sản phẩm"
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
                <TableCell>Tên sàn phẩm</TableCell>
                <TableCell>Đã bán</TableCell>
                <TableCell>Email người bán</TableCell>
                <TableCell>Giá Bán</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <Box gap={2} display="flex" alignItems="center" sx={{ m: 1 }}>
                      <Avatar alt={item.title} src={item.image} />
                      {item.title}
                    </Box>
                    <TableCell>{item.quantity_sold}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
                    <TableCell>{`${item.minPrice} - ${item.maxPrice}`}</TableCell>
                    <TableCell>
                      <Label color={item.deleted === true ? 'error' : 'success'}>
                        {item.deleted === false ? 'Hoạt động' : 'Đã xóa'}
                      </Label>
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {item.deleted === false ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                            onClick={() => handleOpenDeleteDialog(item)}
                            sx={{ width: 110 }}
                          >
                            Xóa
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => handleOpenDeleteDialog(item)}
                            sx={{ width: 110 }}
                          >
                            Khôi phục
                          </Button>
                        )}

                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ width: 110 }}
                          startIcon={<Iconify icon="solar:share-bold" />}
                        >
                          <Link target="_blank" to={`/product-detail/${item.id}`}>
                            Xem
                          </Link>
                        </Button>
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
        <DialogTitle>Xác nhận {currentItem?.deleted === false ? 'xóa' : 'khôi phục'} sản phẩm </DialogTitle>
        <DialogContent sx={{ width: 460 }}>
          <DialogContentText>
            Bạn có chắc chắn muốn {currentItem?.deleted === false ? 'xóa' : 'khôi phục'} {currentItem?.title} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color={currentItem?.deleted === false ? 'error' : 'primary'}
          >
            {currentItem?.deleted === false ? 'Xóa' : 'Khôi phục'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
