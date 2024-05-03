import React from "react";
import { Box } from "@mui/material";

const Thumbnail = ({ path, onClickThumbnail, active }) => {

  const borderColor = active ? '#0073C4' : 'grey';

  return (
    <Box
      className="thumbnail-box"
      onClick={() => onClickThumbnail && onClickThumbnail()}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1.5px solid ${borderColor}`,
        borderRadius: "6px",
        px: 1,
        ":hover": {
          "cursor": "pointer",
        }
      }}>
      <img 
        className="thumbnail-image"
        src={path}  
        alt={`No Available img`}
        style={{
          objectFit: 'scale-down',
        }} />
    </Box>
  );
};

export default Thumbnail;

