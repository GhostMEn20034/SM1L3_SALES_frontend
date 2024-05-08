import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    // boxShadow: theme.shadows[1],
    fontSize: 11,
    [`& .${tooltipClasses.arrow}`]: {
      // This will change the color of the tooltip arrow
      color: theme.palette.common.white,
      "&::before": {
        backgroundColor: theme.palette.primary.dark,
        // You can set any color you want here
      },
    },
    borderRadius: "15px",
  },
}));
