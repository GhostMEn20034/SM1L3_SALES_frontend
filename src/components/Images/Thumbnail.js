import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const Thumbnail = ({ path, onHoverThumbnail, active }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const borderColor = active ? '#0073C4' : 'grey';
  const size = isMobile ? { width: '50px', height: '60px' } : { width: '65px', height: '75px' };

  return (
    <Box
      onMouseOver={() => onHoverThumbnail && onHoverThumbnail()}
      sx={{
        minWidth: size.width,
        minHeight: size.height,
        maxWidth: size.width,
        maxHeight: size.height,
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
      <img src={path}
        alt={`No Available img`}
        style={{
          width: size.width,
          height: size.height,
          objectFit: 'scale-down',
        }} />
    </Box>
  );
};

export default Thumbnail;

