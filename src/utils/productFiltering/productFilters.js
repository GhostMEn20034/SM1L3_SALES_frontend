class ProductFilters {
    constructor({
        querySearch,
        category,
        priceMin,
        priceMax,
        chosenFacets,
    } = {}) {
        this.querySearch = querySearch;
        this.category = category;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.chosenFacets = chosenFacets;
    }

    // Get all filter parameters
    getFilters() {
        return {
            q: this.querySearch?.length > 0 ? this.querySearch : null,
            category: this.category,
            min_price: this.priceMin,
            max_price: this.priceMax,
            chosen_facets: this.chosenFacets,
        };
    }
}


export default ProductFilters;