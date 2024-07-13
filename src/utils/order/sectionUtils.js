import { buyAgainPath, allOrdersSection, buyAgainSection, 
    notShippedSection, canceledOrdersSections } from "./sectionCallbacks";

export const getSectionName = (currentPathName, sectionValue) => {
    if (currentPathName === buyAgainPath) {
        return "buyAgain"
    }

    return sectionValue ? sectionValue : "allOrders";
};

export const getTabNumberBySectionName = (sectionName) => {
    let sectionNameToTabNumberMapping = {
        allOrders: 0,
        notShipped: 1,
        canceledOrders: 2,
        buyAgain: 3,
    };

    let tabNumber = sectionNameToTabNumberMapping[sectionName];
    if (tabNumber === undefined || tabNumber === null) {
        return 0;
    }

    return tabNumber;
};

export const getTabNumberToCallbackMapping = (navigate) => {
    return {
        0: () => allOrdersSection(navigate),
        1: () => notShippedSection(navigate),
        2: () => canceledOrdersSections(navigate),
        3: () => buyAgainSection(navigate),
    };
};

export const getOrderStatusBySectionName = (sectionName) => {
    let mapping = {
        allOrders: "allOrders",
        canceledOrders: "canceledOrders",
        notShipped: "notShipped",
    };

    let orderStatus = mapping[sectionName];
    if (!orderStatus) {
        orderStatus = mapping["allOrders"];
    }
    
    return orderStatus
};

export const getDefaultTimeFilterBySectionName = (sectionName, timeFilter) => {
    if (timeFilter) return timeFilter;

    let mapping = {
        allOrders: "last30",
        canceledOrders: "last30",
        notShipped: null,
    };

    return mapping[sectionName]
};

