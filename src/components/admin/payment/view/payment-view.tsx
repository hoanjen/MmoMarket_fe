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
  action: string;
  paypal_id: string;
  amount: number;
  status: string;
  user_id: string;
  created_at: string;
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchApi = async (): Promise<void> => {
    try {
      const res = await AdminApi.getListPayment({limit: rowsPerPage, page});
      setData(res.data.transactions);
      setTotalPage(res.data.totalPages)
      setTotalDocs(res.data.totalDocs)
      setFilteredData(res.data.transactions)
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


  // Calculate pagination

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách thanh toán
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 4 }}>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã thanh toán</TableCell>
                <TableCell>Người thực hiện</TableCell>
                <TableCell>Kiểu thanh toán</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Số Tiền</TableCell>
                <TableCell>Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
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
                    <Link to={`/profile/${item.user_id}`}>
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
                    </Link>
                    <TableCell>
                      <Label color={item.action !== "DEPOSIT" ? 'error' : 'success'}>
                        {item.action === "DEPOSIT" ? 'Nạp tiền' : 'Rút tiền'}
                      </Label>
                    </TableCell>
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
                    <TableCell>{new Intl.NumberFormat('vi-VN').format(item.amount)}</TableCell>
                    <TableCell>
                      <Label color={item.status !== "SUCCESS" ? 'warning' : 'success'}>
                        {item.status === "SUCCESS" ? 'Thành công' : 'Đang xử lý'}
                      </Label>
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
          <CustomPagination
            count={totalDocs} // từ API
            page={page}
            rowsPerPage={rowsPerPage}
            totalPages={totalPage}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setPage(1);
            }}
          />
        </TableContainer>
      </>
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
  rowsPerPageOptions = [5, 10, 20],
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

