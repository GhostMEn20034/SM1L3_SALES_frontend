export const canProductBeSold = (stock, forSale) => {
    /**
     * @param stock - product's stock
     * @param forSale - determines whether product is for sale
     * Returns true if product has stock > 0 and forSale is true
     */
    if (!forSale) {
        return false;
    }

    return stock > 0;
};