import React from 'react';
import { MuiTelInput } from 'mui-tel-input';

export default function PhoneField(props) {
    const {value, onChange} = props;

  return <MuiTelInput value={value} onChange={(newValue) => onChange(newValue)} 
  forceCallingCode defaultCountry='UA' disableFormatting />
}