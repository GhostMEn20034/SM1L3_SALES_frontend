import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

export default function SelectValue({ value, setValue, menuItems, size, label, disabled, valueField, displayedField, styles, error }) {

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const disabledInput = disabled ? true : false;
    const displayName = displayedField ? displayedField : "name";
    const menuValue = valueField ? valueField : "value";
    const selectorSize = size ? size : 'small';

    return (
        <FormControl sx={styles} size="small" disabled={disabledInput} error={error?.isError}>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                label={label}
                size={selectorSize}
                onChange={handleChange}
            >
                {menuItems.map((menuItem, index) => (
                    <MenuItem key={index} value={menuItem[menuValue]}>{menuItem[displayName]}</MenuItem>
                ))}
            </Select>
            {error?.isError && (
                <FormHelperText>{error.helperText}</FormHelperText>
            )}
        </FormControl>
    );
}