import dayjs from "dayjs";

export default function getOrderStatusInfo({ orderStatus, shippedAt, cancelledAt, deliveredAt, returnedAt}) {

    const getText = () => {
        switch (orderStatus) {
            case "shipped":
                return "Shipped at";
            case "delivered":
                return "Delivered at";
            case "cancelled":
                return "Cancelled at";
            case "returned":
                return "Returned at";
            default:
                return null;
        }
    };

    const getDate = () => {
        switch (orderStatus) {
            case "shipped":
                return dayjs(shippedAt);
            case "delivered":
                return dayjs(deliveredAt);
            case "cancelled":
                return dayjs(cancelledAt);
            case "returned":
                return dayjs(returnedAt);
            default:
                return dayjs();
        }
    };

    return {
        statusText: getText(),
        statusDate: getDate(),
    };
}