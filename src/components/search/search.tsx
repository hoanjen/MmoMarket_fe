import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CategoryApi } from '../../api/category/category';
import { CategoryTypeApi } from '../../api/categorytype/categorytype';

type Category = {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
};

type CategoryType = {
  id: string;
  name: string;
  category_id: string;
  created_at: string;
  updated_at: string;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 120,
    },
  },
};

export default function Search() {
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);
  const [categoryId, setCategoryId] = React.useState<string>('');
  const [categoryTypeList, setCategoryTypeList] = React.useState<CategoryType[]>([]);
  const [categoryTypeId, setCategoryTypeId] = React.useState<string>('');
  const [keyword, setKeyword] = React.useState<string>('');
  const fetchCategoryListApi = async () => {
    try {
      const res = await CategoryApi.getCategory();
      setCategoryList([...res.data.categoryProduct, ...res.data.categoryService]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchCategoryListApi();
  }, []);

  const fetchCategoryTypeListApi = async (id: string) => {
    try {
      const res = await CategoryTypeApi.getCategoryType({ id: id });
      setCategoryTypeList(res.data.categoryType);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoryId = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string);
    setCategoryId((prev) => {
      fetchCategoryTypeListApi(prev);
      return prev;
    });
  };

  const handleChangeCategoryTypeId = (event: SelectChangeEvent) => {
    setCategoryTypeId(event.target.value as string);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  };
  return (
    <div className="pl-32 pr-32 bg-zinc-50 rounded drop-shadow-md">
      <Box
        className="h-60 flex flex-col justify-around items-center"
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2 }}
      >
        <div className="flex flex-row w-full justify-between">
          <Box className="bg-white" sx={{ minWidth: 120, width: '48%', maxHeight: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Danh mục"
                onChange={handleChangeCategoryId}
                MenuProps={MenuProps}
              >
                {categoryList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box className="bg-white" sx={{ minWidth: 120, width: '48%' }}>
            <FormControl fullWidth size="small" disabled={categoryId === '' ? true : false}>
              <InputLabel id="demo-simple-select-label">Sản phẩm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryTypeId}
                label="Sản phẩm"
                onChange={handleChangeCategoryTypeId}
                MenuProps={MenuProps}
              >
                {categoryTypeList?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <TextField
          className="bg-white"
          size="small"
          fullWidth
          label="Tìm gian hàng hoặc người bán"
          id="fullWidth"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button
          color="primary"
          className="w-1/3 h-10 pl-1"
          style={{ textTransform: 'none', fontWeight: 600 }}
          type="submit"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
    </div>
  );
}
