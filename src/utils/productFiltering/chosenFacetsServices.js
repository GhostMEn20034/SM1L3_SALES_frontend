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
    const comparisonCondition = (chosenFacetCode, chosenFacetValue, chosenFacetUnit) => {
        return chosenFacetCode === code && JSON.stringify(chosenFacetValue) === JSON.stringify(value) && chosenFacetUnit === unit;
    };

    return facetsWithSpecifiedCode.some(
        (facet) => comparisonCondition(facet.code, facet.value, facet.unit)
    );
};


export const insertFacetValueToChosenFacets = (chosenFacets, { code, value, unit }) => {
    /**
     * Inserts facet object to the object with chosen facets
     * @param chosenFacets - An object with chosen facets.
     * @param {code} - facet's code
     * @param {value} - facet's value
     * @param {unit} - facet's unit
     */
    let clonedChosenFacets = structuredClone(chosenFacets);
    // Get the index of a facet object
    let index = clonedChosenFacets?.[code]?.findIndex(facet => 
        facet.code === code && JSON.stringify(facet.value) === JSON.stringify(value) && facet.unit === unit
    );
    
    // If the index of an object with the specified code, value, unit doesn't exist
    if (index === -1 || index === undefined) {    
         // If the code group (Array) with facet objects doesn't exist, add it
        if (!clonedChosenFacets[code]) {
            clonedChosenFacets[code] = [];
        }
        // Add facet object to the chosen facets
        clonedChosenFacets[code].push({ code, value, unit });
     // If the facet object exists, remove it
    } else {
        clonedChosenFacets[code].splice(index, 1);
        // If the code group (Array) with facet objects is empty, remove it
        if (clonedChosenFacets[code].length < 1) {
            delete clonedChosenFacets[code];
        }
    }

    return clonedChosenFacets;
};


export const deleteChosenFacetsCode = (chosenFacets, code) => {
    /**
     * Deletes facet group with the specified code
     */
    let clonedChosenFacets = structuredClone(chosenFacets);

    if (clonedChosenFacets?.[code]) {
        delete clonedChosenFacets[code];
    }

    return clonedChosenFacets;
};
