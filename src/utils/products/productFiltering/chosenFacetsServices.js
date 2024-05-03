import { isObject } from "../../dataTypeUtils/objectUtils";

export const decodeChosenFacets = (encodedFacets) => {
    /**
     * Decodes base 64 encoded string with chosen by the user facets.
     * @param encodedFacets - base64 encoded string. If encodedFacets wasn't passed to the function, it returns null.
     */
    if (!encodedFacets) {
        return null;
    }

    try {
        let decodedFacets = atob(encodedFacets);
        return JSON.parse(decodedFacets);
    } catch {
        return null;
    }
};

export const encodeChosenFacets = (chosenFacets) => {
    /**
     * Returns base64 encoded string that contains chosen facets
     */
    if (!chosenFacets) {
        return null;
    }

    return btoa(JSON.stringify(chosenFacets));
};

export const isFacetValueChecked = (chosenFacets, {code, value, unit}) => {
    /**
     * Returns true if facet's object(value, code, unit) in chosenFacets object.
     * @param chosenFacets - chosen facets where function finds for object(value, code, unit)
     * @param {code} - facet's code
     * @param {value} - facet's value
     * @param {unit} - facet's unit
     */
    let facetsWithSpecifiedCode = chosenFacets?.[code];
    if (!facetsWithSpecifiedCode) {
        return false;
    }

    // console.log(code);
    const comparisonCondition = (chosenFacetValue, chosenFacetUnit) => {
        return JSON.stringify(chosenFacetValue) === JSON.stringify(value) && chosenFacetUnit === unit;
    };

    return facetsWithSpecifiedCode.values.some(
        (facet) => comparisonCondition(facet.value, facet.unit)
    );
};


export const insertFacetValueToChosenFacets = (chosenFacets, { code, value, unit, isRange }) => {
    /**
     * Inserts facet object to the object with chosen facets
     * @param chosenFacets - An object with chosen facets.
     * @param {code} - facet's code
     * @param {value} - facet's value
     * @param {unit} - facet's unit
     * @param {isRange} - determines whether facet is range facet (Has range values instead of exact values)
     */
    let clonedChosenFacets = structuredClone(chosenFacets);
    // Get the index of a facet object
    let index = clonedChosenFacets?.[code]?.values?.findIndex(facet => 
        JSON.stringify(facet.value) === JSON.stringify(value) && facet.unit === unit
    );
    // If the index of an object with the specified code, value, unit doesn't exist
    if (index === -1 || index === undefined) {    
         // If the code group with facet values doesn't exist, add it
        if (!clonedChosenFacets[code]) {
            clonedChosenFacets[code] = {
                is_range: Boolean(isRange),
                values: []
            };
        }
        let chosenFacetValues = clonedChosenFacets[code].values;
        chosenFacetValues.push({value, unit});
     // If the facet object exists, remove it
    } else {
        clonedChosenFacets[code].values.splice(index, 1);
        // If the code group (Array) with facet objects is empty, remove it
        if (clonedChosenFacets[code].values.length < 1) {
            delete clonedChosenFacets[code];
        }
    }

    return clonedChosenFacets;
};


export const clearChosenFacetCode = (chosenFacets, code) => {
    if (!chosenFacets) {
        return null;
    }

    let clonedChosenFacets = structuredClone(chosenFacets);

    if (code in chosenFacets) {
        delete clonedChosenFacets[code];
    }

    return clonedChosenFacets;
};

export const getDisplayNameForRegularFacet = (value, unit) => {
    /**
     * Returns user-friendly view of chosen regular facet.
     */
    if (isObject(value)) {
        let joinedValue = Object.values(value).join(" x ");
        return joinedValue + (unit ? ` ${unit}` : "");
    }

    return value + (unit ? ` ${unit}` : "");
}
