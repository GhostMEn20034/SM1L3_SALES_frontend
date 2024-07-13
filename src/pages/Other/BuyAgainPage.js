import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import Sections from "../../components/CommonComponents/Tabs/Sections";
import BreadCrumb from "../../components/CommonComponents/Navigation/BreadCrumb";
import { getOrderListBreadCrumbData } from "../../utils/order/breadCrumbUtils";

import { getTabNumberBySectionName, getTabNumberToCallbackMapping } from "../../utils/order/sectionUtils";


export default function BuyAgainPage() {

    let section = "buyAgain"
    const breadCrumbData = getOrderListBreadCrumbData();

    const [tabNumber, setTabNumber] = useState(getTabNumberBySectionName(section));

    const navigate = useNavigate();

    const tabNumberToCallBackMapping = getTabNumberToCallbackMapping(navigate);

    const sections = [
        { "name": "Orders", "value": 0},
        { "name": "Not yet shipped", "value": 1 },
        { "name": "Cancelled", "value": 2 },
        { "name": "Buy Again", "value": 3 },
    ];

    const onClick = () => {
        navigate({pathname: "/your-account/order-history?section=allOrders"});
    }

    

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Box display="flex" justifyContent="center">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mb: 1 }}>
                        <BreadCrumb breadCrumbData={breadCrumbData} />
                    </Box>
                    <Typography sx={{ mb: 1 }} variant="h4">Your Orders</Typography>
                </Box>
            </Box>
            <Box>
                <Sections
                    value={tabNumber}
                    setValue={setTabNumber}
                    setNewValue={true}
                    sections={sections}
                    valueToCallbackMapping={tabNumberToCallBackMapping}
                />
            </Box>
            <Box sx={{ mt: 1 }} onClick={onClick}>
                <Typography variant="body1">Buy Again</Typography>
            </Box>
        </Container>
    );
}