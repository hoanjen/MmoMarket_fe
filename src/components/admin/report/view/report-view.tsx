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
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { logDOM } from '@testing-library/react';

interface DataItem {
  id: string;
  order_id: string;
  merchant_id: string;
  reason: string;
  user_id: string;
  created_at: string;
  user:{
    username: string
  },
  order:{
    quantity: number,
    price: number,
    status: string,
    unlock_time: string,    
    vans_product:{
      product:{
        user_id: string
      }
    }
  }
}

export default function ReportViews() {
  // View state

  // Main table state
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<DataItem | null>(null);

  const fetchApi = async (): Promise<void> => {
    try {
      const res = await AdminApi.getListReport();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [rowsPerPage, page]);

  // Filter data when search term changes
  useEffect(() => {
    const filtered = data.filter((item) => item.user_id.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
    console.log("nad", {filtered})
    setPage(1);
  }, [searchTerm]);

  // Search handler
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenApproveDialog = (item: DataItem) => {
    setCurrentItem(item);
    setOpenApproveDialog(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
  };

  const handleApprove = async () => {
    if(currentItem !== null){
      const res = await AdminApi.approveRefund({orderId : currentItem.order_id});
      if (res.statusCode === 200) {
        toast.success('Hoàn trả thành công', {
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
        fetchApi()
      } else {
        toast.error('Hoàn trả thất bại', {
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
    }

    handleCloseApproveDialog();

  };

  // Calculate pagination

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách Báo cáo
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 4 }}>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã báo cáo</TableCell>
                <TableCell>Người thực hiện</TableCell>
                <TableCell>Người bị báo cáo</TableCell>
                <TableCell>Lý do</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Số Tiền</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{
                        cursor: 'pointer',
                        color: 'primary.main',
                        '&:hover': { textDecoration: 'underline' },
                      }}                                          >
                      {
                      <Tooltip title={item.id} arrow>
                        <p className="whitespace-no-wrap cursor-pointer">
                        {item.id.length > 8
                          ? `${item.id.slice(0, 8)}...`
                          : item.id
                          }
                        </p>
                      </Tooltip>
                      }
                    </TableCell>
              
                      <TableCell
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        >{
                        <Link to={`/profile/${item.user_id}`}>
                          <Tooltip title={item.user_id} arrow>
                            <p className="whitespace-no-wrap cursor-pointer">
                            {item.user_id.length > 8
                              ? `${item.user_id.slice(0, 8)}...`
                              : item.user_id
                              }
                            </p>
                          </Tooltip>
                        </Link>
                        }
                      </TableCell>
                      <TableCell
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        >{
                          <Link to={`/profile/${item.order.vans_product.product.user_id}`}>
                            <Tooltip title={item.order.vans_product.product.user_id} arrow>
                              <p className="whitespace-no-wrap cursor-pointer">
                              {item.order.vans_product.product.user_id.length > 8
                                ? `${item.order.vans_product.product.user_id.slice(0, 8)}...`
                                : item.order.vans_product.product.user_id
                                }
                              </p>
                            </Tooltip>
                          </Link>
                          }
                      </TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'Asia/Ho_Chi_Minh'
                      })}
                    </TableCell>
                    <TableCell>{new Intl.NumberFormat('vi-VN').format(item.order.price*item.order.quantity)}</TableCell>
                    <TableCell>
                      <Label color={item.order.status !== "RETURN" ? 'warning' : 'success'}>
                        {item.order.status === "RETURN" ? 'Đã hoàn' : 'Chờ giải quyết'}
                      </Label>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            disabled={item.order.status === "RETURN" ? true : false}
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => handleOpenApproveDialog(item)}
                            sx={{ width: 110 }}
                          >
                            Hoàn trả
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
          {/* <CustomPagination
            count={totalDocs} // từ API
            page={page}
            rowsPerPage={rowsPerPage}
            totalPages={totalPage}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setPage(1);
            }}
          /> */}
        </TableContainer>
      </>
      <Dialog open={openApproveDialog} onClose={handleCloseApproveDialog}>
        <DialogTitle>Xác nhận hoàn trả </DialogTitle>
        <DialogContent sx={{ width: 460 }}>
          <DialogContentText>
            Bạn có chắc chắn muốn hoàn trả đơn hàng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApproveDialog}>Hủy</Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            color={'primary'}
          >
            Hoàn trả
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

interface CustomPaginationProps {
  count: number; // tổng số item
  page: number; // page hiện tại (bắt đầu từ 1)
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  rowsPerPageOptions?: number[];
}

function CustomPagination({
  count,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [1, 3, 5],
}: CustomPaginationProps) {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };
  let displayText = '';
  if (page === 1) {
    displayText = `${1}–${Math.min(page * rowsPerPage, count)} của ${count}`;
  } else if (page === totalPages) {
    displayText = `${(page - 1) * rowsPerPage}–${count} của ${count}`;
  } else {
    displayText = `${(page - 1) * rowsPerPage}–${page * rowsPerPage} của ${count}`;
  }
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} gap={2}>
      {/* Số dòng mỗi trang */}
      <Box display="flex" alignItems="center">
        <Typography variant="body2" sx={{ mr: 1 }}>Số dòng mỗi trang:</Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(parseInt(e.target.value as string, 10))}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </Box>
      {/* Hiển thị số lượng */}
      <Typography variant="body2">
        {
          displayText
        }
      </Typography>

      {/* Điều hướng trang */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={handlePrev} disabled={page === 1}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={handleNext} disabled={page === totalPages}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>

  );
}

