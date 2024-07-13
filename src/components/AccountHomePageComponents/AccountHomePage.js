import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomePageOption from './HomePageCards';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { Typography } from '@mui/material';

const settings = [
    {
        settingName: "Your orders",
        settingDescription: "Track, return, cancel an order, or buy again",
        settingIcon: <InventorySharpIcon sx={{ fontSize: "100px", color: "#353582cf" }} />,
        nextDestanation: '/order-history?section=allOrders'
    },
    {
        settingName: "Personal information",
        settingDescription: "View, edit your personal information",
        settingIcon: <LockOpenOutlinedIcon sx={{ fontSize: "100px", color: "#353582cf" }} />,
        nextDestanation: '/personal-information'
    },
    {
        settingName: "Your addresses",
        settingDescription: "Edit, remove, or add addresses",
        settingIcon: <MapsHomeWorkRoundedIcon sx={{ fontSize: "100px", color: "#353582cf" }} />,
        nextDestanation: '/addresses'
    },
    {
        settingName: "Recently viewed items",
        settingDescription: "View all products you've seen",
        settingIcon: <RestoreOutlinedIcon sx={{ fontSize: "100px", color: "#353582cf" }} />,
        nextDestanation: '/recently-viewed-items'
    },
    {
        settingName: "Payments",
        settingDescription: "View all transactions",
        settingIcon: <PaymentRoundedIcon sx={{ fontSize: "100px", color: "#353582cf" }} />,
        nextDestanation: '/payments'
    },

]

export default function HomePageOptions() {

    const homePageOptions = settings.map((setting, index) => (
        <Grid item xl={2.4} lg={3} md={4} sm={6} xs={12} key={index}>
            <HomePageOption
                name={setting.settingName}
                description={setting.settingDescription}
                icon={setting.settingIcon}
                nextDestanation={setting.nextDestanation}
            />
        </Grid>
    ));

    return (
        <Box sx={{ flexGrow: 1, py: 4, px: 8 }}>
            <Typography variant='h4'>
                Your account
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {homePageOptions}
            </Grid>
        </Box>
    );
}