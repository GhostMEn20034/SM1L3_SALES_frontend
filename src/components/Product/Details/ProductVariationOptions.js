import { Box, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fragment } from "react";

import { LightTooltip } from "../../CommonComponents/Tooltips";

var lodash = require("lodash");

const Item = styled(({ isChosenItem, disabled, ...otherProps }) => <Box {...otherProps} />)(({ theme, isChosenItem, disabled }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    height: 40,
    fontWeight: isChosenItem ? 700 : 400,
    lineHeight: '40px',
    border: `solid ${isChosenItem ? "1.55px" : "1px"}`,
    borderColor: isChosenItem ? "#1565C0" : "#D0D0D0",
    opacity: disabled ? 0.45 : 1,
    borderRadius: "15px",
    ":hover": {
        cursor: "pointer",
        backgroundColor: "#F3F3F3",
    },
}));



export default function ProductVariationOptions(props) {
    const {
        variationOptions,
        chosenOptions,
        productItems,
        changeProductOption,
    } = props;

    let variationOptionNames = variationOptions.map(variationOption => variationOption?.option_name);

    return (
        <Box>
            {variationOptions.map((variationOption, index) => {

                let currentVariationOption = variationOption?.choices.find(choice => lodash.isMatch(chosenOptions, choice.values));

                return (
                    <Box key={index}>
                        {/* #555555 */}
                        <Box sx={{ display: "flex", mt: 2 }}>
                            <Box sx={{ mr: 0.5 }}>
                                <Typography variant="subtitle1">
                                    {variationOption?.option_name}:
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">
                                    <b>{currentVariationOption?.display_name}</b>
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Grid container spacing={2}>
                                {variationOption?.choices.map((choice, choiceIndex) => {
                                    let mixedObject = {
                                        ...chosenOptions,
                                        ...choice.values,
                                    };

                                    let isOptionAvailable = productItems.some(
                                        (product) => lodash.isEqual(
                                            product.variation_attributes,
                                            mixedObject,
                                        )
                                    );

                                    let isChosenItem = lodash.isEqual(currentVariationOption.values, choice.values);

                                    return (
                                        isOptionAvailable ? (
                                            <Grid item lg={2} md={4} xs={6} key={`variationOption-${choiceIndex}`}>
                                                <Box>
                                                    <Item
                                                        isChosenItem={lodash.isEqual(currentVariationOption.values, choice.values)}
                                                        disabled={!isOptionAvailable}
                                                        onClick={() => changeProductOption(choice.values)}
                                                    >
                                                        {choice.display_name}
                                                    </Item>
                                                </Box>
                                            </Grid>
                                        ) : (
                                            <Grid item lg={2} md={4} xs={6} key={`variationOption-${choiceIndex}`}>
                                                <LightTooltip
                                                    arrow
                                                    placement="top"
                                                    title={
                                                        <Fragment>
                                                            <Typography variant="body2">
                                                                <b>{variationOptionNames.filter(
                                                                    name => name !== variationOption?.option_name
                                                                ).join(", ")}</b> See Available Options
                                                            </Typography>
                                                        </Fragment>
                                                    }
                                                >
                                                    <Box>
                                                        <Item
                                                            isChosenItem={isChosenItem}
                                                            disabled={!isOptionAvailable}
                                                            onClick={() => changeProductOption(choice.values)}
                                                        >
                                                            {choice.display_name}
                                                        </Item>
                                                    </Box>
                                                </LightTooltip>
                                            </Grid>
                                        )
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}