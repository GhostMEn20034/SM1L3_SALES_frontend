import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useLocation } from "react-router-dom";

export default function HomePageOption({name, description, icon, nextDestanation}) {

    const location = useLocation();

    const href = location.pathname + nextDestanation;

    return (
        <Card>
            <CardActionArea component={Link} to={href}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
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