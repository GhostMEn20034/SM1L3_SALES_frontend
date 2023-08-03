import React from 'react';
import { MuiTelInput } from 'mui-tel-input';

export default function PhoneField(props) {
    const {value, onChange, size} = props;

  return <MuiTelInput value={value} onChange={(newValue) => onChange(newValue)} size={size} label="Phone number" id='phone_number'
  forceCallingCode defaultCountry='UA' />
}