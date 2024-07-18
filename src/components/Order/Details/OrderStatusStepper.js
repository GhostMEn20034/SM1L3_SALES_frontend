import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { grey, blue } from '@mui/material/colors';
import { cloneElement } from "react";


export default function OrderStatusStepper({ status, createdAt, shippedAt, deliveredAt }) {

    const orderSteps = [
        { 
            label: "Processed", 
            optionalLabel: null, 
            icon: <CheckCircleIcon />, 
            completed: status !== 'pending' },
        { 
            label: "Shipped", 
            icon: <LocalShippingIcon />, 
            optionalLabel: shippedAt ? `At ${dayjs(shippedAt).format("LL")}` : `Approximate date: ${dayjs(createdAt).add(2, 'day').format("LL")}`, 
            completed: ['shipped', 'delivered'].includes(status)
        },
        { 
            label: "Delivered", 
            icon: <AssignmentTurnedInIcon />, 
            optionalLabel: deliveredAt ? `At ${dayjs(deliveredAt).format("LL")}` : `Approximate date: ${dayjs(createdAt).add(6, 'day').format("LL")}`, 
            completed: status === 'delivered' 
        },
    ];

    return (
        <Box>
            <Stepper nonLinear activeStep={2} alternativeLabel>
                {orderSteps.map((orderStep, index) => {
                    const labelProps = {};
                    const iconColor = orderStep.completed ? blue["A700"] : grey[500];

                    if (orderStep.optionalLabel) {
                        labelProps.optional = (
                            <Typography variant="caption">
                                {orderStep.optionalLabel}
                            </Typography>
                        );
                    }

                    return (
                        <Step completed={orderStep.completed} key={index}>
                            <StepLabel 
                                {...labelProps} 
                                icon={cloneElement(orderStep.icon, { style: { color: iconColor } })}
                            >
                                {orderStep.label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}