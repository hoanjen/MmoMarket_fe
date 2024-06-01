import * as React from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CategoryTypeApi } from "../../api/categorytype/categorytype";
import { ProductApi } from "../../api/product/product";
export default function Home (){
    return (
      <Search/>
    )
}

type CategoryType = {
  id: string;
  name: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  category: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
  }
}

type Product = {
  title: string,
  sub_title: string,
  description: string,
  image: string,
  quantity_sold: number,
  id: string,
  category_type_id: string,
  user_id: string,
  created_at: string,
  updated_at: string
}

function Search () {
  const [categoryTypeList, setCategoryTypeList] = React.useState<CategoryType[]>([])
  const [categoryTypeId, setCategoryTypeId] = React.useState<string>("")
  const [productList, setProductList] = React.useState<Product[]>([]);
  const [productId, setProductId] = React.useState<string>("");

  const fectchApi = async ()=>{
    try {
      const res = await CategoryTypeApi.getCategoryType()
      setCategoryTypeList(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  
  React.useEffect(()=>{
    fectchApi()
  }, [])

  const fectchProductApi = async ()=>{
    try {
      const res = await ProductApi.getProduct({id: "b7472cd8-d63c-4364-b5ae-7be4aa0c66ea"})
      setProductList(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  React.useEffect(()=>{
    fectchProductApi()
  }, [categoryTypeId])

  const handleChangeCategoryType = (event: SelectChangeEvent) => {
    setCategoryTypeId(event.target.value as string);
  };

  const handleChangeProduct = (event: SelectChangeEvent) => {
    setProductId(event.target.value as string);
  };

  const handleSubmit = () =>{
    console.log("submit")
  }
  return (
    <div className="pl-32 pr-32 bg-zinc-50 rounded drop-shadow-md">
      <Box 
        className="h-60  flex flex-col justify-around items-center" 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ p:2 }}>
            <div className='flex flex-row w-full justify-between'>
              <Box 
                className="bg-white w-5/12"
                sx={{ minWidth: 120 , width: "48%"}}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryTypeId}
                    label="Danh mục"
                    size="small"
                    onChange={handleChangeCategoryType}
                  >
                    {categoryTypeList.map((item, index)=>{
                      return(
                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box 
                className="bg-white w-5/12"
                sx={{ minWidth: 120 , width: "48%"}}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sản phẩm</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productId}
                    label="Sản phẩm"
                    size="small"
                    onChange={handleChangeProduct}
                  >
                    {productList?.map((item, index)=>{
                      return (
                        <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <TextField className="bg-white" size="small" fullWidth label="Tìm gian hàng hoặc người bán" id="fullWidth" />
            <Button 
              color="primary"
              className="w-1/3 h-10 pl-1"
              style={{ textTransform: "none", fontWeight: 600 }}
              type="submit" variant="contained">
                Tìm kiếm
            </Button>
            
      </Box>
    </div>
  )
}
