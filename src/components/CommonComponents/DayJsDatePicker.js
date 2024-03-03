import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DayJsDatePicker({ value, setValue, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        inputFormat="YYYY-MM-DD" format="YYYY-MM-DD"
      />
    </LocalizationProvider>
  );
}
