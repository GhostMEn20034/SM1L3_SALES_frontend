import { createBreadCrumbData } from "../breadCrumb/createBreadCrumbData";

export const getOrderListBreadCrumbData = () => {
    let accountHomePageLink = '/your-account';
    let orderListLink = accountHomePageLink + '/order-history?section=allOrders';

    const breadCrumbData = createBreadCrumbData(
        [accountHomePageLink, orderListLink],
        ['Your Account', 'Your Orders'],
        [false, true],
    );

    return breadCrumbData;
};