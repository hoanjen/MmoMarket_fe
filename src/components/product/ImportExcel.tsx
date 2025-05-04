'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ProductApi } from '@api/product/product';
import { AccountCredential } from './TableProduct';
import { toast } from 'react-toastify';

export default function ExcelImportButton({
  vans_product_id,
  setCredentials,
}: {
  vans_product_id: string;
  setCredentials: React.Dispatch<React.SetStateAction<AccountCredential[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      setError('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
      return;
    }

    setLoading(true);
    await ProductApi.importExcelData({ vans_product_id, file });

    try {
      const res = await ProductApi.getProductDataByVansProduct({ vanProductId: vans_product_id });
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
    toast.success('Import tài khoản thành công', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setLoading(false);

    setError(null);

    // Reset input để có thể chọn lại cùng một file
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={handleFileSelect}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Đang xử lý...
          </>
        ) : (
          'Import Excel'
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </div>
  );
}
