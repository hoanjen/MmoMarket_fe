'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Grid,
  Avatar,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  VisibilityOff,
  Visibility,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Image as ImageIcon,
  PhotoCamera,
} from '@mui/icons-material';
import { ProductApi } from '@api/product/product';
import { UploadApi } from '@api/upload/upload';
import { toast } from 'react-toastify';
import ExcelImportButton from './ImportExcel';

interface ProductOwners {
  id: string;
  title: string;
  sub_title?: string;
  description?: string;
  quantity_sold: number;
  minPrice: number;
  maxPrice: number;
  created_at: string;
  isActive: boolean;
  image?: string;
}

export interface AccountCredential {
  id: string;
  account: string;
  password: string;
}

interface VansProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  // product_id: string;
  isActive: boolean;
}

type ViewState = 'list' | 'product-detail' | 'account-detail';

export default function ProductOwnerTable({ isRefresh }: { isRefresh?: boolean }) {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [selectedAccount, setSelectedAccount] = useState<ProductOwners | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<VansProduct | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const [credentialsCurrentPage, setCredentialsCurrentPage] = useState(1);
  const credentialsPerPage = 10;

  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editedProduct, setEditedProduct] = useState<VansProduct | null>(null);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<VansProduct, 'id' | 'isActive'>>({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [editedAccount, setEditedAccount] = useState<ProductOwners | null>(null);
  const [editAccountDialogOpen, setEditAccountDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hideDialogOpen, setHideDialogOpen] = useState(false);
  const [accountToHide, setAccountToHide] = useState<ProductOwners | null>(null);
  const [deleteCredentialDialogOpen, setDeleteCredentialDialogOpen] = useState(false);
  const [credentialToDelete, setCredentialToDelete] = useState<AccountCredential | null>(null);
  const [hideProductDialogOpen, setHideProductDialogOpen] = useState(false);
  const [productToHide, setProductToHide] = useState<VansProduct | null>(null);

  const [credentials, setCredentials] = useState<AccountCredential[]>([]);
  const [editingCredential, setEditingCredential] = useState<AccountCredential | null>(null);
  const [newCredential, setNewCredential] = useState<Partial<AccountCredential>>({ account: '', password: '' });
  const [isAddingCredential, setIsAddingCredential] = useState(false);

  const [vansProducts, setVansProducts] = useState<VansProduct[]>([]);

  const [allData, setAllData] = useState<ProductOwners[]>([]);

  useEffect(() => {
    const getProductOwner = async () => {
      try {
        const res = await ProductApi.getProductOwner();
        setAllData(
          res.data.map((item) => {
            return {
              id: item.id,
              title: item.title,
              sub_title: item.sub_title,
              description: item.description,
              quantity_sold: item.quantity_sold,
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
              created_at: item.created_at,
              isActive: item.is_active,
              image: item.image ?? '/assets/images/default_product.png',
            };
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getProductOwner();
  }, [isRefresh]);

  const filteredData = allData.filter((account) => account.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredProducts = vansProducts;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const totalProductsPages = Math.ceil(filteredProducts.length / productsPerPage);
  const productsStartIndex = (productsCurrentPage - 1) * productsPerPage;
  const productsEndIndex = productsStartIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(productsStartIndex, productsEndIndex);

  const totalCredentialsPages = Math.ceil(credentials.length / credentialsPerPage);
  const credentialsStartIndex = (credentialsCurrentPage - 1) * credentialsPerPage;
  const credentialsEndIndex = credentialsStartIndex + credentialsPerPage;
  const currentCredentials = credentials.slice(credentialsStartIndex, credentialsEndIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (viewState === 'account-detail') {
      setCredentialsCurrentPage(1);
    }
  }, [viewState]);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      quantity: 0,
    });
  };

  const handleSaveNewProduct = async () => {
    if (selectedAccount) {
      try {
        const createVanProduct = await ProductApi.createVansProduct({
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          return_percent: newProduct.quantity,
          product_id: selectedAccount?.id,
        });
        const vanData = createVanProduct.data.newVansProduct;

        setVansProducts([
          {
            id: vanData.id,
            title: vanData.title,
            description: vanData.description,
            price: vanData.price,
            quantity: vanData.quantity,
            isActive: vanData.is_active,
          },
          ...vansProducts,
        ]);
        toast.success('Thêm loại sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        toast.error('Thêm sản phẩm thất bại', {
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

    // Thêm sản phẩm mới vào danh sách

    // Reset form
    setIsAddingProduct(false);
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      quantity: 0,
    });
  };

  const handleCancelAddProduct = () => {
    setIsAddingProduct(false);
  };

  const handleEditAccount = (account: ProductOwners) => {
    setEditedAccount({ ...account });
    setEditAccountDialogOpen(true);
  };

  const handleSaveEditedAccount = async () => {
    if (editedAccount) {
      if (editedAccount.minPrice > editedAccount.maxPrice) {
        toast.error('Giá thấp nhất phải nhỏ hơn giá cao nhất', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return false;
      }
      setAllData((prevData) => prevData.map((item) => (item.id === editedAccount.id ? editedAccount : item)));
      try {
        await ProductApi.updateProduct({
          id: editedAccount.id,
          description: editedAccount.description ?? '',
          minPrice: editedAccount.minPrice,
          maxPrice: editedAccount.maxPrice,
          sub_title: editedAccount.sub_title ?? '',
          title: editedAccount.title,
          image: editedAccount.image,
        });
        toast.success('Chỉnh sửa sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        toast.error('Chỉnh sửa sản phẩm thất bại', {
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
      setEditAccountDialogOpen(false);
      setEditedAccount(null);
    }
  };

  const handleCancelEditAccount = () => {
    setEditAccountDialogOpen(false);
    setEditedAccount(null);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedAccount) {
      let url = '';
      try {
        const res = await UploadApi.uploadImage(file);
        url = res[0].url;
      } catch (error) {
        toast.error('Tải hình ảnh lên thất bại', {
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

      const imageUrl = url;
      setEditedAccount({ ...editedAccount, image: imageUrl });
    }
  };

  const handleImageUrlInput = (url: string) => {
    if (editedAccount && url) {
      setEditedAccount({ ...editedAccount, image: url });
    }
  };

  const handleClickUploadImage = () => {
    fileInputRef.current?.click();
  };

  // Handle click on ID to view product details
  const handleViewProductDetails = async (account: ProductOwners) => {
    try {
      const res = await ProductApi.getVanProductByProductId({ id: account.id });
      setVansProducts(
        res.data.map((item) => {
          return {
            id: item.id,
            description: item.description ?? '',
            isActive: item.is_active,
            price: item.price,
            title: item.title,
            quantity: item.quantity,
          };
        }),
      );
    } catch (error) {
      console.log('err', error);
    }
    setSelectedAccount(account);
    setViewState('product-detail');
  };

  // Handle click on  van product ID to view account details
  const handleViewAccountDetails = async (vanProduct: VansProduct) => {
    try {
      const res = await ProductApi.getProductDataByVansProduct({ vanProductId: vanProduct.id });
      setCredentials(
        res.data.map((item) => {
          return {
            id: item.id,
            account: item.account,
            password: item.password,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
    setSelectedProduct(vanProduct);
    setViewState('account-detail');
  };

  const handleBackToList = () => {
    setViewState('list');
    setSelectedAccount(null);
    setSelectedProduct(null);
    setIsEditingProduct(false);
    setEditedProduct(null);
  };

  // Handle back button click from account detail
  const handleBackToProductDetail = () => {
    setViewState('product-detail');
    setIsAddingCredential(false);
    setEditingCredential(null);
  };

  // Handle page change for main table
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Handle page change for products table
  const handleProductsPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setProductsCurrentPage(value);
  };

  // Handle page change for credentials table
  const handleCredentialsPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('value:', value);
    setCredentialsCurrentPage(value);
    setIsAddingCredential(false);
    setEditingCredential(null);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle hide account dialog
  const handleOpenHideDialog = (account: ProductOwners) => {
    setAccountToHide(account);
    setHideDialogOpen(true);
  };

  const handleCloseHideDialog = () => {
    setHideDialogOpen(false);
    setAccountToHide(null);
  };

  const handleConfirmHide = async () => {
    if (accountToHide) {
      try {
        await ProductApi.toggleActiveProduct({ id: accountToHide.id });
        toast.success(accountToHide.isActive === true ? 'Ẩn sản phẩm thành công' : 'Hiện sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        toast.error('Ẩn sản phẩm thất bại', {
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

      setAllData((prevData) =>
        prevData.map((item) => (item.id === accountToHide.id ? { ...item, isActive: !item.isActive } : item)),
      );
    }
    handleCloseHideDialog();
  };

  // Handle hide product dialog
  const handleOpenHideProductDialog = (product: VansProduct) => {
    setProductToHide(product);
    setHideProductDialogOpen(true);
  };

  const handleCloseHideProductDialog = () => {
    setHideProductDialogOpen(false);
    setProductToHide(null);
  };

  const handleConfirmHideProduct = async () => {
    if (productToHide) {
      try {
        await ProductApi.toggleActiveVansProduct({ id: productToHide.id });
        toast.success(
          productToHide.isActive === true ? 'Ẩn loại sản phẩm thành công' : 'Hiện loại sản phẩm thành công',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        );
      } catch (error) {
        toast.error('Ẩn loại sản phẩm thất bại', {
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

      setVansProducts((prevProducts) =>
        prevProducts.map((item) => (item.id === productToHide.id ? { ...item, isActive: !item.isActive } : item)),
      );

      handleCloseHideProductDialog();
    }
  };

  // Handle edit product
  const handleEditProduct = (product: VansProduct) => {
    setEditedProduct({ ...product });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = async () => {
    if (editedProduct) {
      try {
        await ProductApi.updateVansProduct({
          id: editedProduct.id,
          description: editedProduct.description,
          price: editedProduct.price,
          quantity: editedProduct.quantity,
          title: editedProduct.title,
        });
        toast.success('Chỉnh sửa loại sản phẩm thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setVansProducts((prevProducts) =>
          prevProducts.map((item) => (item.id === editedProduct.id ? editedProduct : item)),
        );

        setIsEditingProduct(false);
        setEditedProduct(null);
      } catch (error) {
        toast.error('Ẩn loại sản phẩm thất bại', {
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
  };

  const handleCancelEditProduct = () => {
    setIsEditingProduct(false);
    setEditedProduct(null);
  };

  // Handle credential actions
  const handleAddCredential = () => {
    setIsAddingCredential(true);
    setNewCredential({ account: '', password: '' });
  };

  const handleSaveNewCredential = async () => {
    if (newCredential.account && newCredential.password && selectedProduct) {
      try {
        const res = await ProductApi.createDataProduct({
          dataProducts: [
            {
              account: newCredential.account,
              password: newCredential.password,
            },
          ],
          vans_product_id: selectedProduct.id,
        });
        const result = res.data.results[0];
        toast.success('Thêm tài khoản thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setCredentials([
          {
            id: result.id,
            account: newCredential.account,
            password: newCredential.password,
          } as AccountCredential,
          ...credentials,
        ]);
        setIsAddingCredential(false);
        setNewCredential({ account: '', password: '' });

        // If we're on the last page and it's full, move to the next page
        if (currentCredentials.length >= credentialsPerPage && credentialsCurrentPage === totalCredentialsPages) {
          setCredentialsCurrentPage(totalCredentialsPages + 1);
        }
      } catch (error) {
        toast.error('Thêm tài khoản thất bại', {
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
  };

  const handleCancelAddCredential = () => {
    setIsAddingCredential(false);
    setNewCredential({ account: '', password: '' });
  };

  const handleEditCredential = (credential: AccountCredential) => {
    setEditingCredential(credential);
  };

  const handleSaveEditCredential = async () => {
    if (editingCredential && editingCredential.id) {
      try {
        await ProductApi.updateDataProduct({
          id: editingCredential.id,
          account: editingCredential.account,
          password: editingCredential.password,
        });
        toast.success('Chỉnh sửa tài khoản thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setCredentials((prevCredentials) =>
          prevCredentials.map((item) => (item.id === editingCredential.id ? editingCredential : item)),
        );
        setEditingCredential(null);
      } catch (error) {
        toast.error('Chỉnh sửa tài khoản thất bại!', {
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
  };

  const handleCancelEditCredential = () => {
    setEditingCredential(null);
  };

  const handleOpenDeleteCredentialDialog = (credential: AccountCredential) => {
    setCredentialToDelete(credential);
    setDeleteCredentialDialogOpen(true);
  };

  const handleCloseDeleteCredentialDialog = () => {
    setDeleteCredentialDialogOpen(false);
    setCredentialToDelete(null);
  };

  const handleConfirmDeleteCredential = async () => {
    if (credentialToDelete) {
      try {
        await ProductApi.deleteDataProduct({ id: credentialToDelete.id });
        setCredentials((prevCredentials) => prevCredentials.filter((item) => item.id !== credentialToDelete.id));

        // If we're deleting the last item on a page (except the first page), go to previous page
        if (currentCredentials.length === 1 && credentialsCurrentPage > 1) {
          setCredentialsCurrentPage(credentialsCurrentPage - 1);
        }
        toast.success('Xóa tài khoản thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        toast.error('Xóa tài khoản thất bại', {
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
    handleCloseDeleteCredentialDialog();
  };

  // Render the account detail view
  if (viewState === 'account-detail' && selectedAccount) {
    return (
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackToProductDetail}
            variant="outlined"
            sx={{ marginRight: 2 }}
          >
            Quay lại
          </Button>
          <Typography variant="h5" component="h2">
            Chi tiết tài khoản
          </Typography>
        </div>

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h3">
              Thông tin tài khoản
            </Typography>
            <div className="flex space-x-10">
              <ExcelImportButton
                setCredentials={setCredentials}
                vans_product_id={selectedProduct?.id ?? ''}
              ></ExcelImportButton>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCredential}
                disabled={isAddingCredential}
              >
                Thêm mới
              </Button>
            </div>
          </Box>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên tài khoản</TableCell>
                  <TableCell>Mật khẩu</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isAddingCredential && (
                  <TableRow>
                    <TableCell>Mới</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={newCredential.account}
                        onChange={(e) => setNewCredential({ ...newCredential, account: e.target.value })}
                        placeholder="Nhập tên tài khoản"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        // type="password"
                        value={newCredential.password}
                        onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                        placeholder="Nhập mật khẩu"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={handleSaveNewCredential} size="small">
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancelAddCredential} size="small">
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}

                {currentCredentials.map((credential) => (
                  <TableRow key={credential.id}>
                    <TableCell>{credential.id}</TableCell>
                    <TableCell>
                      {editingCredential?.id === credential.id ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={editingCredential.account}
                          onChange={(e) => setEditingCredential({ ...editingCredential, account: e.target.value })}
                        />
                      ) : (
                        credential.account
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCredential?.id === credential.id ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={editingCredential.password}
                          onChange={(e) => setEditingCredential({ ...editingCredential, password: e.target.value })}
                        />
                      ) : (
                        credential.password
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {editingCredential?.id === credential.id ? (
                        <>
                          <IconButton color="primary" onClick={handleSaveEditCredential} size="small">
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancelEditCredential} size="small">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton color="primary" onClick={() => handleEditCredential(credential)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleOpenDeleteCredentialDialog(credential)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {credentials.length === 0 && !isAddingCredential && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
                      Không có thông tin đăng nhập nào
                    </TableCell>
                  </TableRow>
                )}

                {credentials.length > 0 && currentCredentials.length === 0 && !isAddingCredential && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
                      Không có dữ liệu trên trang này
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination for credentials */}
          {credentials.length > credentialsPerPage && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Pagination
                  count={totalCredentialsPages}
                  page={credentialsCurrentPage}
                  onChange={handleCredentialsPageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="small"
                />
              </Box>

              {/* Display pagination info for credentials */}
              <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Hiển thị {credentials.length > 0 ? credentialsStartIndex + 1 : 0} -{' '}
                  {Math.min(credentialsEndIndex, credentials.length)} trong số {credentials.length} tài khoản
                </Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Delete Credential Confirmation Dialog */}
        <Dialog open={deleteCredentialDialogOpen} onClose={handleCloseDeleteCredentialDialog}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc chắn muốn xóa thông tin tài khoản này không?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteCredentialDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmDeleteCredential} color="error" variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    );
  }

  // Render the product detail view 1
  if (viewState === 'product-detail' && selectedAccount) {
    return (
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={handleBackToList} variant="outlined" sx={{ marginRight: 2 }}>
              Quay lại
            </Button>
            <Typography variant="h5" component="h2">
              Danh sách loại sản phẩm
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            disabled={isAddingProduct || isEditingProduct}
          >
            Thêm mới
          </Button>
        </div>

        <Box sx={{ p: 2 }}>
          {isAddingProduct ? (
            // Add new product form
            <Box component="form" sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Thêm loại sản phẩm mới
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giá"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="% Hoàn tiền"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={handleCancelAddProduct}>
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSaveNewProduct}
                      disabled={!newProduct.title || newProduct.price <= 0}
                    >
                      Lưu
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : isEditingProduct && editedProduct ? (
            // Edit form
            <Box component="form" sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề"
                    value={editedProduct.title}
                    onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    value={editedProduct.description}
                    onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giá"
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số lượng"
                    type="number"
                    value={editedProduct.quantity}
                    onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={handleCancelEditProduct}>
                      Hủy
                    </Button>
                    <Button variant="contained" onClick={handleSaveProduct}>
                      Lưu
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : (
            // Display products table
            <>
              <Table sx={{ minWidth: 650 }} aria-label="products table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell align="right">Giá</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    {/* <TableCell align="right">Mã sản phẩm</TableCell> */}
                    <TableCell align="right">Trạng thái</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell
                          component="th"
                          scope="row"
                          onClick={() => handleViewAccountDetails(product)}
                          sx={{
                            cursor: 'pointer',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {/* {product.id.substring(0, 8)}... */}
                          {product.id}
                        </TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell sx={{ maxWidth: 200 }}>
                          {product.description.length > 50
                            ? `${product.description.substring(0, 50)}...`
                            : product.description}
                        </TableCell>
                        <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        {/* <TableCell align="right">{product.product_id}</TableCell> */}

                        <TableCell align="right">
                          {product.isActive ? (
                            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>Đang hoạt động</Box>
                          ) : (
                            <Box sx={{ color: 'text.disabled' }}>Không hoạt động</Box>
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip title="Sửa sản phẩm">
                            <IconButton color="primary" onClick={() => handleEditProduct(product)} size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={product.isActive ? 'Ẩn sản phẩm' : 'Hiện sản phẩm'}>
                            <IconButton
                              color="default"
                              onClick={() => handleOpenHideProductDialog(product)}
                              size="small"
                            >
                              {product.isActive ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        Không có sản phẩm nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination for products */}
              {filteredProducts.length > productsPerPage && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination
                      count={totalProductsPages}
                      page={productsCurrentPage}
                      onChange={handleProductsPageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </Box>

                  {/* Display pagination info */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Hiển thị {filteredProducts.length > 0 ? productsStartIndex + 1 : 0} -{' '}
                      {Math.min(productsEndIndex, filteredProducts.length)} trong số {filteredProducts.length} sản phẩm
                    </Typography>
                  </Box>
                </>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Bấm vào ID để xem chi tiết
              </Typography>
            </>
          )}
        </Box>

        {/* Hide Product Confirmation Dialog */}
        <Dialog open={hideProductDialogOpen} onClose={handleCloseHideProductDialog}>
          <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {productToHide?.isActive
                ? 'Bạn có chắc chắn muốn ẩn loại sản phẩm này không?'
                : 'Bạn có chắc chắn muốn hiện loại sản phẩm này không?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHideProductDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmHideProduct} color="error" variant="contained">
              {productToHide?.isActive ? 'Ẩn' : 'Hiện'}
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    );
  }

  // Otherwise show the list view
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Danh sách sản phẩm
        </Typography>

        {/* Search input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="Danh sách sản phẩm">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>ID</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Tiêu đề</TableCell>
            <TableCell align="right">Đã bán</TableCell>
            <TableCell align="right">Giá thấp nhất</TableCell>
            <TableCell align="right">Giá cao nhất</TableCell>
            <TableCell align="right">Ngày tạo</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((account, index) => (
              <TableRow key={account.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => handleViewProductDetails(account)}
                  sx={{
                    cursor: 'pointer',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {account.id}
                </TableCell>
                <TableCell>
                  {account.image ? (
                    <Avatar src={account.image} alt={account.title} variant="rounded" sx={{ width: 60, height: 60 }} />
                  ) : (
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ImageIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
                  {account.title}
                </TableCell>
                <TableCell align="right">{account.quantity_sold}</TableCell>
                <TableCell align="right">{formatCurrency(account.minPrice)}</TableCell>
                <TableCell align="right">{formatCurrency(account.maxPrice)}</TableCell>
                <TableCell align="right">{formatDate(account.created_at)}</TableCell>

                <TableCell align="right">
                  {account.isActive ? (
                    <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>Đang hoạt động</Box>
                  ) : (
                    <Box sx={{ color: 'text.disabled' }}>Không hoạt động</Box>
                  )}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Chỉnh sửa">
                    <IconButton color="primary" onClick={() => handleEditAccount(account)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={account.isActive ? 'Ẩn sản phẩm' : 'Hiện sản phẩm'}>
                    <IconButton color="default" onClick={() => handleOpenHideDialog(account)} size="small">
                      {account.isActive ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                Không tìm thấy kết quả phù hợp
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Display pagination info */}

      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Hiển thị {filteredData.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, filteredData.length)} trong số{' '}
          {filteredData.length} kết quả
        </Typography>
      </Box>

      {/* Hide Product Confirmation Dialog */}
      <Dialog open={hideDialogOpen} onClose={handleCloseHideDialog}>
        <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {accountToHide?.isActive
              ? 'Bạn có chắc chắn muốn ẩn sản phẩm này không?'
              : 'Bạn có chắc chắn muốn hiện sản phẩm này không?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHideDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmHide} color="error" variant="contained">
            {accountToHide?.isActive ? 'Ẩn' : 'Hiện'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={editAccountDialogOpen} onClose={handleCancelEditAccount} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa Sản phẩm</DialogTitle>
        <DialogContent>
          {editedAccount && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'grey.100',
                    }}
                  >
                    {editedAccount.image ? (
                      <CardMedia
                        component="img"
                        image={editedAccount.image}
                        alt={editedAccount.title}
                        sx={{ height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <ImageIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                      </Box>
                    )}
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                      <IconButton color="primary" onClick={handleClickUploadImage} sx={{ bgcolor: 'background.paper' }}>
                        <PhotoCamera />
                      </IconButton>
                      <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
                      Nhấp vào biểu tượng máy ảnh để tải lên hình ảnh mới
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tiêu đề"
                      value={editedAccount.title}
                      onChange={(e) => setEditedAccount({ ...editedAccount, title: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mô tả phụ"
                      value={editedAccount.sub_title || ''}
                      onChange={(e) => setEditedAccount({ ...editedAccount, sub_title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mô tả"
                      value={editedAccount.description || ''}
                      onChange={(e) => setEditedAccount({ ...editedAccount, description: e.target.value })}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá thấp nhất"
                      type="number"
                      value={editedAccount.minPrice}
                      onChange={(e) => setEditedAccount({ ...editedAccount, minPrice: Number(e.target.value) })}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá cao nhất"
                      type="number"
                      value={editedAccount.maxPrice}
                      onChange={(e) => setEditedAccount({ ...editedAccount, maxPrice: Number(e.target.value) })}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditAccount}>Hủy</Button>
          <Button onClick={handleSaveEditedAccount} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
