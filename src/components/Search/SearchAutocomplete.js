import { useEffect, useState, useRef, memo } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Search, StyledInputBase } from './CustomInput';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Paper, Autocomplete, IconButton } from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import useAxios from '../../utils/useAxios';


function PaperComponent(props) {
    return <Paper {...props} sx={{ width: 470 }} />
}

const SearchAutocomplete = memo(function SearchAutocomplete() {

    const controllerRef = useRef();
    const [search, setSearch] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const api = useAxios('products');

    const loading = open && options.length === 0;

    console.log(inputValue);
    console.log(search);



    const getOptions = async (query='') => {

        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        let params = {
            q: query ? query : '',
        }

        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        try {
            let response = await api.get('/api/v1/search/', {
                params: params,
                signal: signal,
            });
            setOptions(response.data);

        } catch (e) {
            console.log("Something Went Wrong");
        }
    };

    const handleInputValueChange = (newValue) => {
        setInputValue(newValue);
        getOptions(newValue);
    };

    useEffect(() => {


        if (!loading) {
            return undefined;
        }
        getOptions();

    }, [open]);

    return (
        <Box display="flex">
            <Autocomplete
                open={open}
                onOpen={() => (setOpen(true))}
                onClose={() => setOpen(false)}
                id="custom-input-demo"
                options={options}
                value={search}
                freeSolo
                onChange={(e, newValue) => setSearch(newValue)}
                onBlur={() => setSearch((prevValue) => prevValue)}
                inputValue={inputValue}
                onInputChange={(e, newValue) => handleInputValueChange(newValue)}
                blurOnSelect
                getOptionLabel={(option) => option.name ? option.name : ''}
                isOptionEqualToValue={(option, value) => {
                    if (!value) return false;
                    return option.name === value.name;
                }}
                renderInput={(params) => (
                    <Search ref={params.InputProps.ref}>
                        <StyledInputBase
                            type="text"
                            placeholder='Search...'
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    </Search>
                )}
                clearOnBlur={false}
                autoComplete
                PaperComponent={PaperComponent}
                ListboxProps={{
                    style: {
                        maxHeight: "390px",
                        overflow: 'hidden'  // Hides the scrollbar
                    }
                }}
                renderOption={(props, option, { inputValue }) => {
                    const matches = match(option.name, inputValue, { insideWords: true });
                    const parts = parse(option.name, matches);

                    return (
                        <li {...props}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{color: "#D5D507", display: "flex", alignItems: "center"}}>
                                    {option.trend_search_term && <TrendingUpOutlinedIcon style={{ marginRight: 8 }} />}
                                </div>
                                <div style={{ color: "#D5D507" }}>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </li>
                    );
                }}
            />
            <Box sx={{ ml: 1 }}>
                <IconButton type='contained'>
                    <SearchIcon sx={{ color: '#D5D507' }} />
                </IconButton>
            </Box>
        </Box>
    );
})

export default SearchAutocomplete;