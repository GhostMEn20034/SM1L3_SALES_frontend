import { createSearchParams } from "react-router-dom";

const orderHistoryPath = "/your-account/order-history";
export const buyAgainPath = "/op/buyagain";

export const allOrdersSection = (navigate) => {
    navigate(
        {
            pathname: orderHistoryPath,
            search: createSearchParams(
                { section: "allOrders" }
            ).toString(),
            replace: true,
        },
    );
};

export const notShippedSection = (navigate) => {
    navigate(
        {
            pathname: orderHistoryPath,
            search: createSearchParams(
                { section: "notShipped" }
            ).toString(),
        },
    );
};

export const canceledOrdersSections = (navigate) => {
    navigate(
        {
            pathname: orderHistoryPath,
            search: createSearchParams(
                { section: "canceledOrders" }
            ).toString(),
        },
    );
};


export const buyAgainSection = (navigate) => {
    navigate(buyAgainPath);
};
