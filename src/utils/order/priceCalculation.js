import { roundToTwo } from "../dataTypeUtils/numberUtils";

export const calculateTotalItemsPrice = (orderItems) => {
    let totalItemsPrice = 0;
    let totalTax = 0;
    
    for (let orderItem of orderItems) {
        totalItemsPrice += orderItem.total_item_price;
        totalTax += orderItem.total_item_tax;
    }
    
    let priceAndTaxSum = totalItemsPrice + totalTax;
    totalItemsPrice = roundToTwo(totalItemsPrice);
    totalTax = roundToTwo(totalTax);
    priceAndTaxSum = roundToTwo(priceAndTaxSum);

    return {totalItemsPrice, totalTax, priceAndTaxSum};
};