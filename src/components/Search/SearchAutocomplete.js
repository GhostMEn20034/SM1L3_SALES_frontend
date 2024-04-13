import { useEffect, useState, useRef, memo } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Search, StyledInputBase } from './CustomInput';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Paper, Autocomplete, IconButton } from '@mui/material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import useAxios from '../../utils/useAxios';
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom';


const SearchAutocomplete = memo(function SearchAutocomplete() {
    const [searchParams, setSearchParams] = useSearchParams();
    const controllerRef = useRef();
    const [search, setSearch] = useState(null);
    const [inputValue, setInputValue] = useState(searchParams.get("q") || '');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const api = useAxios('products');
    const navigate = useNavigate();
    const location = useLocation();

    const loading = open && options.length === 0;

    const getOptions = async (query = inputValue) => {

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

    const handleSubmit = (query) => {
        let querySearch;
        if (!query && !inputValue) {
            querySearch = null;
        } else if (!query) {
            querySearch = inputValue;
        } else {
            querySearch = query;
        }

        document.activeElement.blur();

        if (!querySearch) {
            navigate("/");
        } else {
            let searchParams = createSearchParams({
                q: querySearch,
                page: 1,
            }).toString();

            if (location.pathname === '/s') {
                navigate({
                    pathname: "s",
                    search: searchParams
                });
            } else {
                navigate({
                    pathname: "s",
                    search: createSearchParams({ q: querySearch }).toString()
                });
            }

        }
    };

    const handleChangeSearch = (newValue) => {
        setSearch(newValue);
        if (newValue) {
            handleSubmit(newValue?.name);
        }
    };

    return (
        <Box display="flex" sx={{ width: "100%" }}>
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                id="custom-input-demo"
                options={options}
                value={search}
                freeSolo
                onChange={(e, newValue) => handleChangeSearch(newValue)}
                onBlur={() => setSearch((prevValue) => prevValue)}
                inputValue={inputValue}
                onInputChange={(e, newValue) => handleInputValueChange(newValue)}
                blurOnSelect
                clearOnBlur={false}
                clearOnEscape={false}
                getOptionLabel={(option) => option.name ? option.name : ''}
                filterOptions={(x) => x}
                isOptionEqualToValue={(option, value) => {
                    if (!value) return false;
                    return option.name === value.name;
                }}
                renderInput={(params) => (
                    <Search ref={params.InputProps.ref} sx={{ display: "flex" }}>
                        <StyledInputBase
                            type="text"
                            placeholder='Search...'
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                        <Box sx={{ ml: 1 }}>
                            <IconButton type='contained' onClick={() => handleSubmit()}>
                                <SearchIcon sx={{ color: '#D5D507' }} />
                            </IconButton>
                        </Box>
                    </Search>
                )}
                autoComplete
                PaperComponent={props => <Paper {...props} width={"100%"} />}
                ListboxProps={{
                    style: {
                        overflow: 'hidden',  // Hides the scrollbar
                        minHeight: 36 * (options?.length ? options.length : 0),
                    }
                }}
                renderOption={(props, option, { inputValue }) => {
                    const matches = match(option.name, inputValue, { insideWords: true });
                    const parts = parse(option.name, matches);

                    return (
                        <li {...props}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ color: "#D5D507", display: "flex", alignItems: "center" }}>
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
                sx={{ width: "100%" }}
            />
        </Box>
    );
});

export default SearchAutocomplete;