import React, { useState } from 'react';
import { Button, Popover, MenuItem, Stack, Typography, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'; 
import weekOfYear from 'dayjs/plugin/weekOfYear'; 

dayjs.extend(utc); 
dayjs.extend(weekOfYear);

interface CustomDatePickerProps {
  onApply: (range: [Dayjs, Dayjs]) => void;
}

const quickRanges: Record<string, [Dayjs, Dayjs]> = {
  Today: [
    dayjs().utc().startOf('day'), 
    dayjs().utc().endOf('day'), 
  ],
  'This Week': [
    dayjs().utc().startOf('week'), 
    dayjs().utc().endOf('week'),
  ],
  'This Month': [
    dayjs().utc().startOf('month'), 
    dayjs().utc().endOf('month'), 
  ],
  'This Year': [
    dayjs().utc().startOf('year'), // Bắt đầu năm này (UTC)
    dayjs().utc().endOf('year'), // Kết thúc năm này (UTC)
  ],
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onApply }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState<[Dayjs, Dayjs]>(quickRanges['Today']);
  const [manualRange, setManualRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [selectedQuickRange, setSelectedQuickRange] = useState<string>('Today');
  const [isManualSelected, setIsManualSelected] = useState(false); 

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleQuickSelect = (label: string) => {
    setSelectedQuickRange(label);
    const range = quickRanges[label];
    setSelectedRange(range);
    setIsManualSelected(false);
  };

  const handleManualSelect = () => {
    setIsManualSelected(true);
    setManualRange([null, null]); 
  };

  const handleApply = () => {
    const range = isManualSelected ? manualRange : selectedRange;
    onApply(range as any);
    handleClose();
  };

  const handleManualRangeChange = (newDate: Dayjs | null, isStart: boolean) => {
    if (isStart) {
      setManualRange([newDate, manualRange[1]]);
    } else {
      setManualRange([manualRange[0], newDate]);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        Chọn ngày để xem
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack sx={{ p: 2, minWidth: 250 }} spacing={1}>
          <Typography variant="subtitle1">Chọn nhanh</Typography>
          {/* Các lựa chọn nhanh */}
          {Object.keys(quickRanges).map((label) => (
            <MenuItem
              key={label}
              onClick={() => handleQuickSelect(label)}
              selected={label === selectedQuickRange}
              sx={{
                backgroundColor: label === selectedQuickRange ? '#e0e0e0' : 'inherit',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              {label}
            </MenuItem>
          ))}

          {!isManualSelected && (
            <Button variant="outlined" onClick={handleManualSelect}>
              Chọn thủ công
            </Button>
          )}

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Chọn thủ công
          </Typography>
          <Stack direction="row" spacing={2}>
            {isManualSelected && (
              <>
                <TextField
                  label="Từ ngày"
                  type="date"
                  value={manualRange[0]?.utc().format('YYYY-MM-DD') || ''}
                  onChange={(e) => handleManualRangeChange(dayjs.utc(e.target.value), true)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Đến ngày"
                  type="date"
                  value={manualRange[1]?.utc().format('YYYY-MM-DD') || ''}
                  onChange={(e) => handleManualRangeChange(dayjs.utc(e.target.value), false)}
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}
          </Stack>

          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default CustomDatePicker;
