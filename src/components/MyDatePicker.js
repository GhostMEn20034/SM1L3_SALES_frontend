import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker({value, setValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date of birth" value={value} onChange={(newValue) => setValue(newValue)} 
        inputFormat="YYYY-MM-DD" format="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
