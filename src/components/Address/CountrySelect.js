import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CountrySelect({value, setValue}) {

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
                <InputLabel id="country-select-label" size='small'>Country</InputLabel>
                <Select
                    labelId="country-select-label"
                    id="country"
                    value={value}
                    label="Country"
                    onChange={handleChange}
                    size='small'
                >
                    {countries.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            <Box display="flex">
                                <Box sx={{ mr: 1 }}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                </Box>
                                {option.label} ({option.code})
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
const countries = [
    { code: 'AT', label: 'Austria', phone: '43' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FR', label: 'France', phone: '33' },
    { code: 'DE', label: 'Germany', phone: '49' },
    { code: 'GR', label: 'Greece', phone: '30' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'PL', label: 'Poland', phone: '48' },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'GB', label: 'United Kingdom', phone: '44' }
]