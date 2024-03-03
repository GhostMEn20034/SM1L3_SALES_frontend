export const arrayToMenuItems = (array) => {
    // If there's no input array, then return empty array
    if (!array) {
        return [];
    }

    // Use the map method to apply an arrow function to each element of the array
    let menuItems = array.map(element => ({
        name: element,
        value: element
    }));

    // Return the list
    return menuItems;
};
