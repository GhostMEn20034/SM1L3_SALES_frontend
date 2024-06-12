export const getDisplayNameFunction = (type, listUnwinded = true) => {
    switch (type) {
        case "decimal":
        case "integer":
            return (value, unit) => `${value}${unit ? " " + unit : ""}`;
        case "bivariate":
        case "trivariate":
            return (value, unit) => `${Object.values(value).join(" x ")}${unit ? " " + unit : ""}`;
        case "list":
            return !listUnwinded ? (value, _) => value : (value, _) => value.join(", ");
        case "string":
        default:
            return (value, _) => value;
    }
};

export const getDisplayNameForRegularFacet = (value, unit, type, listUnwinded = true) => {
    let displayNameFunc = getDisplayNameFunction(type, listUnwinded);
    return displayNameFunc(value, unit);
};

export const getDisplayNameForRangeFacet = (code, value, facetMetadata) => {
    let rangeToDisplayNameMappings = facetMetadata?.[code]?.range_to_display_name;
    let displayName = rangeToDisplayNameMappings?.[value?.gteq];
    return displayName;
}