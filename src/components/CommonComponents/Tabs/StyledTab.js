import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: 'primary',
        '&.Mui-selected': {
            color: 'rgba(100, 95, 228)',
            fontWeight: theme.typography.fontWeightBold,
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);


export default StyledTab;