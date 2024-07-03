import { Box } from "@mui/material";

import AddNewShippingAddressDialog from "./AddNewShippingAddressDialog";


import SelectValueRadioGroup from "../../CommonComponents/Selectors/SelectValueRadioGroup";

export default function ShippingAdddressStep(props) {
    const {
        userInfo, addresses, chosenAddress, setChosenAddress,
        createAddress, addressErrors, setAddressErrors,
    } = props;

    return (
        <Box>

            <Box>
                <SelectValueRadioGroup
                    value={chosenAddress}
                    setValue={setChosenAddress}
                    label={"Choose shipping address"}
                    menuItems={addresses}
                    valueKey="id"
                    labelKey="oneline_repr"
                />
            </Box>
            <Box>
                <AddNewShippingAddressDialog
                    userInfo={userInfo}
                    errors={addressErrors}
                    setErrors={setAddressErrors}
                    createAddress={createAddress}
                />
            </Box>

        </Box>
    );
}