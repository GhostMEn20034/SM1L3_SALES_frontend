import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react';
import HomePageOption from './HomePageCards';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { Typography } from '@mui/material';

const settings = [
    {
        settingName: "Your orders",
        settingDescription: "Track, return, cancel an order, or buy again",
        settingIcon: <InventorySharpIcon sx={{fontSize: "100px", color: "#353582cf"}} />,
        nextDestanation: '/orders'
    },
    {
        settingName: "Personal info",
        settingDescription: "Edit your personal information",
        settingIcon: <LockOpenOutlinedIcon sx={{fontSize: "100px", color: "#353582cf"}} />,
        nextDestanation: '/personal-info'
    },
    {
        settingName: "Your addresses",
        settingDescription: "Edit, remove, or add addresses",
        settingIcon: <MapsHomeWorkRoundedIcon sx={{fontSize: "100px", color: "#353582cf"}} />,
        nextDestanation: '/addresses'
    },
    {
        settingName: "Gift cards",
        settingDescription: "View balance on gift card balance or purchase a new gift card",
        settingIcon: <CardGiftcardRoundedIcon sx={{fontSize: "100px", color: "#353582cf"}} />,
        nextDestanation: '/gift-cards'
    },
    {
        settingName: "Payments",
        settingDescription: "View all transactions",
        settingIcon: <PaymentRoundedIcon sx={{fontSize: "100px", color: "#353582cf"}} />,
        nextDestanation: '/payments'
    },

]


function FormRow({ rowSettings }) {

    // Map each settings object to a HomePageOption component with props
    const rowOptions = rowSettings.map(setting => (
        <Grid item xs={4} key={setting.settingName} sx={{paddingBottom: 2}}>
            <HomePageOption
                name={setting.settingName}
                description={setting.settingDescription}
                icon={setting.settingIcon}
                nextDestanation={setting.nextDestanation}
            />
        </Grid>
    ));

    return (
        <Fragment>
            {rowOptions}
        </Fragment>
    );
}

export default function HomePageOptions() {

    // Define how many options per row
    const optionsPerRow = 3;

    // Calculate how many rows are needed
    const rows = Math.ceil(settings.length / optionsPerRow);

    // Create an array of row components with sliced settings
    const rowComponents = Array.from({ length: rows }, (v, i) => (
        <Grid container item spacing={3} key={i}>
            <FormRow rowSettings={settings.slice(i * optionsPerRow, (i + 1) * optionsPerRow)} />
        </Grid>
    ));

    return (
        <Box sx={{ flexGrow: 1, py: 4, px: 16 }}>
            <Typography variant='h4'>
                Your account
            </Typography>
            <Grid container spacing={1} sx={{marginTop: 1}}>
                {rowComponents}
            </Grid>
        </Box>
    );
}