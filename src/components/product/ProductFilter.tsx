import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { KeyboardArrowDown } from '@mui/icons-material';

interface ProductFilterProps {
  searchProduct: (id: string[]) => void;
}

export default function ProductFilter(props: ProductFilterProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const test = [
    {
      id: 'abc',
      name: 'Dịch vụ tiền ảo',
    },
    {
      id: 'def',
      name: 'Dịch vụ code tool',
    },
    {
      id: 'ght',
      name: 'Tài khoản FB',
    },
    {
      id: 'aad',
      name: 'Thẻ Nạp',
    },
    {
      id: 'dada',
      name: 'Phần Mềm FB',
    },
    {
      id: 'vvv',
      name: 'Tài Khoản BM',
    },
  ];

  const handleChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const submitFilter = () => {
    const filter = Object.keys(checkedItems).filter((item) => checkedItems[item] === true);

    console.log(checkedItems);
    console.log(filter);
    props.searchProduct(filter);
  };

  const clickSelector = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="border flex flex-col">
      <div className="h-16 border leading-[64px] pl-5">
        <h1 className=" font-bold text-black text-[20px]">Bộ lọc</h1>
      </div>
      <div className={`pl-4 mt-3 transition-all duration-1000 ease-out delay-100`}>
        <Button
          endIcon={isHidden ? <KeyboardArrowUpIcon /> : <KeyboardArrowDown />}
          color="inherit"
          style={{
            textTransform: 'none',
            textAlign: 'left',
            fontWeight: 700,
            fontSize: '15px',
            background: '#f2f2f2',
          }}
          onClick={() => clickSelector()}
        >
          Chọn 1 hoặc nhiều sản phẩm
        </Button>
        {isHidden ? (
          <FormGroup className="pl-4 mt-1">
            {test.map((item, index) => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={item.name}
                  key={index}
                  onChange={() => handleChange(item.id)}
                  sx={{ typography: 'body1', fontSize: '15px', '& .MuiSvgIcon-root': { fontSize: 20 } }} //
                />
              );
            })}
          </FormGroup>
        ) : (
          <></>
        )}

        <Button
          variant="contained"
          size="medium"
          style={{
            color: '#fff',
            borderColor: '#47991f',
            background: '#47991f',
            margin: '20px 0px',
          }}
          onClick={() => submitFilter()}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
