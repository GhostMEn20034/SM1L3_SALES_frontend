import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SelectValueRadioGroup({ value, setValue, label, defaultValue, menuItems, size = "medium", valueKey = "value", labelKey = "name" }) {

    const handleChange = (event) => {
        setValue(event.target.value);
      };
    

    return (
        <FormControl size={size}>
            <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue={defaultValue}
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {menuItems.map((menuItem, index) => (
                    <FormControlLabel key={index} value={menuItem[valueKey]} control={<Radio />} label={menuItem[labelKey]} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}