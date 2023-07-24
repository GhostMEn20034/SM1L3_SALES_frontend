import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useLocation } from "react-router-dom";

export default function HomePageOption({name, description, icon, nextDestanation}) {

    const location = useLocation();

    const href = location.pathname + nextDestanation;

    return (
        <Card sx={{ maxWidth: 345}}>
            <CardActionArea href={href}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // sx={{backgroundColor: "#121212"}}
                    >
                    {icon}
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{height: "30px"}}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}