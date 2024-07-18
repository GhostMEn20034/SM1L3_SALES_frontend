import { createBreadCrumbData } from "../breadCrumb/createBreadCrumbData";

let accountHomePageLink = '/your-account';
let accountHomePageTitle = 'Your Account';

let orderListLink = accountHomePageLink + '/order-history';
let archivedOrderListLink = accountHomePageLink + '/archived-orders/'
let orderListLinkWithQueryParams = orderListLink + '?section=allOrders';
let orderListTitle = 'Your Orders';
let archivedOrderListTitle = 'Your Archived Orders';

export const getOrderListBreadCrumbData = () => {
    const breadCrumbData = createBreadCrumbData(
        [accountHomePageLink, orderListLinkWithQueryParams],
        [accountHomePageTitle, orderListTitle],
        [false, true],
    );

    return breadCrumbData;
};

export const getArchivedOrderListBreadCrumbData = () => {
    const breadCrumbData = createBreadCrumbData(
        [accountHomePageLink, archivedOrderListLink],
        [accountHomePageTitle, archivedOrderListTitle],
        [false, true],
    );

    return breadCrumbData;
};

export const getOrderDetailsBreadCrumbData = (orderId) => {
    let orderNumberLabel = `Order Summary #${orderId}`;
    let orderDetailsLink = orderListLink + `/${orderId}`;

    const breadCrumbData = createBreadCrumbData(
        [accountHomePageLink, orderListLinkWithQueryParams, orderDetailsLink],
        [accountHomePageTitle, orderListTitle, orderNumberLabel],
        [false, false, true],
    );

    return breadCrumbData;
};
