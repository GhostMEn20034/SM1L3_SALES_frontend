export const transformOrderListFilters = (filters) => {
    if (!filters) return null;

    let result = Object.entries(filters).map(([key, value]) => ({ value: key, name: value }));
    
    return result;
};