import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState, useEffect, Fragment } from 'react';
import { Typography, Button } from '@mui/material';
import { fields } from './PersonalInfoFields';
import useAxios from '../../utils/useAxios';
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const style = {
  width: '100%',
  maxWidth: 580,
  bgcolor: 'background.paper',
  border: 1,
  borderRadius: "10px",
  borderColor: "#e3e1cf",
  mt: 1
};


export default function PersonalInfo() {

  const [userData, setUserData] = useState({});

  const api = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const getUserData = async () => {
    let response = await api.get("/api/user/personal-info/");
    let data = await response.data;
    setUserData(data);
  }

  const handleClick = appAction => {
    navigate({
      pathname: location.pathname + "/change",
      search: `?${createSearchParams({ appAction })}`,
    },
      { state: userData })
  }

  const displayData = (field) => {

    if (!userData[field.field] && !(["password"].includes(field.field))) {
      return (
        <Typography>Unspecified</Typography>
      )
    }

    switch (field.field) {
      case "password":
        return (
          <Typography>********</Typography>
        );
      case "date_of_birth":
        return (
          <Typography>{dayjs(userData[field.field]).format('YYYY-MM-DD')}</Typography>
        );
      default:
        return (
          <Typography>{userData[field.field]}</Typography>
        );
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {fields.map((field, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider />}
          <ListItem>
            <ListItemText primary={<b>{field.fieldDisplay}:</b>}
              secondary={displayData(field)} />
            <Button variant='contained' size='small' color='secondary'
              onClick={() => handleClick(field.appAction)}
              sx={{ "color": "black", backgroundColor: "#ffffff", ":hover": { "backgroundColor": "#f5f5f5" } }}>edit</Button>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}