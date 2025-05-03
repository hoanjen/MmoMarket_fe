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

interface DataItem {
  id: string;
  name: string;
  type: 'PRODUCT' | 'SERVICE';
  created_at: string;
  updated_at: string;
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

export default function DataTable() {
  // View state
  const [currentView, setCurrentView] = useState<'main' | 'detail'>('main');

  // Main table state
  const [data, setData] = useState<DataItem[]>([]);
  const [detailData, setDetailData] = useState<DetailItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<DataItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<DataItem>>({
    name: '',
    type: 'PRODUCT',
  });

  // Detail table state
  const [detailPage, setDetailPage] = useState(0);
  const [detailRowsPerPage, setDetailRowsPerPage] = useState(5);
  const [openDetailAddDialog, setOpenDetailAddDialog] = useState(false);
  const [openDetailEditDialog, setOpenDetailEditDialog] = useState(false);
  const [openDetailDeleteDialog, setOpenDetailDeleteDialog] = useState(false);
  const [currentDetailItem, setCurrentDetailItem] = useState<DetailItem | null>(null);
  const [newDetailItem, setNewDetailItem] = useState<Partial<DetailItem>>({
    name: '',
  });
  const [currentParentId, setCurrentParentId] = useState<string>('');
  const [currentParentName, setCurrentParentName] = useState<string>('');

  useEffect(() => {
    const getProductOwner = async () => {
      try {
        const res = await CategoryApi.GetAllCategory();

        setData(
          res.data.map((item) => {
            return {
              id: item.id,
              created_at: item.created_at,
              name: item.name,
              type: item.type,
              updated_at: item.updated_at,
            };
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getProductOwner();
  }, []);

  // Filter data when search term changes
  useEffect(() => {
    const filtered = data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
    setPage(0);
  }, [searchTerm, data]);

  // View switching
  const handleViewDetail = async (item: DataItem) => {
    try {
      const res = await CategoryApi.getCategoryTypeByCategory({ id: item.id });
      setDetailData(
        res.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            parentId: item.category_id,
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        }),
      );
    } catch (error) {}
    setCurrentParentId(item.id);
    setCurrentParentName(item.name);
    setCurrentItem(item);
    setDetailPage(0);
    setCurrentView('detail');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  // Detail pagination handlers
  const handleChangeDetailPage = (_event: unknown, newPage: number) => {
    setDetailPage(newPage);
  };

  const handleChangeDetailRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailRowsPerPage(Number.parseInt(event.target.value, 10));
    setDetailPage(0);
  };

  // Search handler
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Main table dialog handlers
  const handleOpenAddDialog = () => {
    setNewItem({ name: '', type: 'PRODUCT' });
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (item: DataItem) => {
    setCurrentItem(item);
    setNewItem({ name: item.name, type: item.type });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = (item: DataItem) => {
    setCurrentItem(item);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Detail table dialog handlers
  const handleOpenDetailAddDialog = () => {
    setNewDetailItem({
      name: '',
      // quantity: 0,
      // price: 0,
      // parentId: currentParentId,
    });
    setOpenDetailAddDialog(true);
  };

  const handleCloseDetailAddDialog = () => {
    setOpenDetailAddDialog(false);
  };

  const handleOpenDetailEditDialog = (item: DetailItem) => {
    setCurrentDetailItem(item);
    setNewDetailItem({
      name: item.name,
      // quantity: item.quantity,
      // price: item.price,
    });
    setOpenDetailEditDialog(true);
  };

  const handleCloseDetailEditDialog = () => {
    setOpenDetailEditDialog(false);
  };

  const handleOpenDetailDeleteDialog = (item: DetailItem) => {
    setCurrentDetailItem(item);
    setOpenDetailDeleteDialog(true);
  };

  const handleCloseDetailDeleteDialog = () => {
    setOpenDetailDeleteDialog(false);
  };

  // CRUD operations for main table
  const handleAdd = async () => {
    if (newItem.name && newItem.type) {
      try {
        const res = await CategoryApi.createCategory({
          name: newItem.name,
          type: newItem.type,
        });
        toastMessage(res.statusCode, 'Thêm danh mục thành công');
        const newDataItem: DataItem = {
          id: res.data.newCategory.id,
          name: newItem.name,
          type: newItem.type as 'PRODUCT' | 'SERVICE',
          created_at: res.data.newCategory.created_at,
          updated_at: res.data.newCategory.updated_at,
        };

        setData([newDataItem, ...data]);
        handleCloseAddDialog();
      } catch (error) {
        console.log('err', error);
        handleCloseAddDialog();
      }
    }
  };

  const handleEdit = async () => {
    if (currentItem && newItem.name && newItem.type) {
      try {
        const res = await CategoryApi.updateCategory({ id: currentItem.id, name: newItem.name, type: newItem.type });
        console.log('update', res);
        toastMessage(res.status, 'Chỉnh sửa danh mục thành công');

        const updatedData = data.map((item) => {
          if (item.id === currentItem.id) {
            return {
              ...item,
              name: newItem.name as string,
              type: newItem.type as 'PRODUCT' | 'SERVICE',
              updated_at: new Date().toISOString(),
            };
          }
          return item;
        });

        setData(updatedData);
        handleCloseEditDialog();
      } catch (error) {}
    }
  };

  const handleDelete = () => {
    if (currentItem) {
      const updatedData = data.filter((item) => item.id !== currentItem.id);
      // Also delete all detail items associated with this parent
      const updatedDetailData = detailData.filter((item) => item.parentId !== currentItem.id);

      setData(updatedData);
      setDetailData(updatedDetailData);
      handleCloseDeleteDialog();
    }
  };

  // CRUD operations for detail table
  const handleDetailAdd = async () => {
    if (newDetailItem.name && currentParentId) {
      try {
        const res = await CategoryTypeApi.createCategoryType({
          category_id: currentParentId,
          name: newDetailItem.name,
        });
        toastMessage(res.statusCode, 'Thêm loại sản phẩm thành công');
        const newDetailDataItem: DetailItem = {
          id: res.data.newCategoryType.id,
          parentId: currentParentId,
          name: newDetailItem.name as string,
          created_at: res.data.newCategoryType.created_at,
          updated_at: res.data.newCategoryType.updated_at,
        };

        setDetailData([...detailData, newDetailDataItem]);
      } catch (error) {
        console.log('err', error);
      }
      handleCloseDetailAddDialog();
    }
  };

  const handleDetailEdit = async () => {
    if (currentDetailItem && newDetailItem.name) {
      try {
        const res = await CategoryTypeApi.updateCategoryType({ id: currentDetailItem.id, name: newDetailItem.name });
        toastMessage(res.status, 'Chỉnh sửa loại sản phẩm thành công.');
        const updatedDetailData = detailData.map((item) => {
          if (item.id === currentDetailItem.id) {
            return {
              ...item,
              name: newDetailItem.name as string,
            };
          }
          return item;
        });

        setDetailData(updatedDetailData);
        handleCloseDetailEditDialog();
      } catch (error) {}
    }
  };

  const handleDetailDelete = () => {
    if (currentDetailItem) {
      const updatedDetailData = detailData.filter((item) => item.id !== currentDetailItem.id);
      setDetailData(updatedDetailData);
      handleCloseDetailDeleteDialog();
    }
  };

  // Calculate pagination
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Get detail items for a parent
  const getDetailItems = (parentId: string) => {
    return detailData.filter((item) => item.parentId === parentId);
  };

  // Calculate detail pagination
  const paginatedDetailData = currentParentId
    ? getDetailItems(currentParentId).slice(
        detailPage * detailRowsPerPage,
        detailPage * detailRowsPerPage + detailRowsPerPage,
      )
    : [];

  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      {currentView === 'main' ? (
        // Main Table View
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Danh sách danh mục
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Tìm kiếm theo tên"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Box>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenAddDialog}>
              Thêm mới
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Ngày cập nhật</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => handleViewDetail(item)}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type === 'PRODUCT' ? 'Sản phẩm' : 'Dịch vụ'}</TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{new Date(item.updated_at).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => handleOpenEditDialog(item)}
                          >
                            Sửa
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => handleOpenDeleteDialog(item)}
                          >
                            Xóa
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
      ) : (
        // Detail Table View
        <>
          <Box sx={{ mb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={handleBackToMain}
              >
                <ArrowBack sx={{ mr: 0.5, fontSize: 20 }} />
                Danh sách danh mục
              </Link>
              <Typography color="text.primary">Chi tiết danh mục</Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h1">
              Chi tiết cho: {currentParentName} (ID: {currentParentId})
            </Typography>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenDetailAddDialog}>
              Thêm loại danh mục
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên loại</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Ngày chỉnh sửa</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDetailData.length > 0 ? (
                  paginatedDetailData.map((detailItem) => (
                    <TableRow key={detailItem.id}>
                      <TableCell>{detailItem.id}</TableCell>
                      <TableCell>{detailItem.name}</TableCell>

                      <TableCell>{new Date(detailItem.created_at).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{new Date(detailItem.updated_at).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => handleOpenDetailEditDialog(detailItem)}
                          >
                            Sửa
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => handleOpenDetailDeleteDialog(detailItem)}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Không có dữ liệu chi tiết
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={getDetailItems(currentParentId).length}
              rowsPerPage={detailRowsPerPage}
              page={detailPage}
              onPageChange={handleChangeDetailPage}
              onRowsPerPageChange={handleChangeDetailRowsPerPage}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </TableContainer>
        </>
      )}

      {/* Main Table Dialogs */}
      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm mới</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Nhập thông tin để thêm mới.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            variant="outlined"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Loại</InputLabel>
            <Select
              value={newItem.type}
              label="Loại"
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'PRODUCT' | 'SERVICE' })}
            >
              <MenuItem value="PRODUCT">Sản phẩm</MenuItem>
              <MenuItem value="SERVICE">Dịch vụ</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Hủy</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Chỉnh sửa thông tin.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            variant="outlined"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Loại</InputLabel>
            <Select
              value={newItem.type}
              label="Loại"
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'PRODUCT' | 'SERVICE' })}
            >
              <MenuItem value="PRODUCT">Sản phẩm</MenuItem>
              <MenuItem value="SERVICE">Dịch vụ</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Hủy</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent sx={{ width: 460 }}>
          <DialogContentText>Bạn có chắc chắn muốn xóa "{currentItem?.name}"?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail Add Dialog */}
      <Dialog open={openDetailAddDialog} onClose={handleCloseDetailAddDialog}>
        <DialogTitle>Thêm loại danh mục mới</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Nhập thông tin chi tiết.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Mô tả"
            fullWidth
            variant="outlined"
            value={newDetailItem.name}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, name: e.target.value })}
          />
          {/* <TextField
            margin="dense"
            label="Số lượng"
            type="number"
            fullWidth
            variant="outlined"
            value={newDetailItem.quantity}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, quantity: Number.parseInt(e.target.value) })}
          /> */}
          {/* <TextField
            margin="dense"
            label="Giá"
            type="number"
            fullWidth
            variant="outlined"
            value={newDetailItem.price}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, price: Number.parseInt(e.target.value) })}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailAddDialog}>Hủy</Button>
          <Button onClick={handleDetailAdd} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail Edit Dialog */}
      <Dialog open={openDetailEditDialog} onClose={handleCloseDetailEditDialog}>
        <DialogTitle>Chỉnh sửa chi tiết</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Chỉnh sửa thông tin chi tiết.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Mô tả"
            fullWidth
            variant="outlined"
            value={newDetailItem.name}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, name: e.target.value })}
          />
          {/* <TextField
            margin="dense"
            label="Số lượng"
            type="number"
            fullWidth
            variant="outlined"
            value={newDetailItem.quantity}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, quantity: Number.parseInt(e.target.value) })}
          /> */}
          {/* <TextField
            margin="dense"
            label="Giá"
            type="number"
            fullWidth
            variant="outlined"
            value={newDetailItem.price}
            onChange={(e) => setNewDetailItem({ ...newDetailItem, price: Number.parseInt(e.target.value) })}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailEditDialog}>Hủy</Button>
          <Button onClick={handleDetailEdit} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detail Delete Dialog */}
      <Dialog open={openDetailDeleteDialog} onClose={handleCloseDetailDeleteDialog}>
        <DialogTitle>Xác nhận xóa loại danh mục</DialogTitle>
        <DialogContent sx={{ width: 460 }}>
          <DialogContentText>Bạn có chắc chắn muốn xóa loại danh mục "{currentDetailItem?.name}"?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDeleteDialog}>Hủy</Button>
          <Button onClick={handleDetailDelete} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
