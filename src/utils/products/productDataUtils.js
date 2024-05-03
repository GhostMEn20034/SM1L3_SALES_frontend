import { createSearchParams } from "react-router-dom";
import { createBreadCrumbData } from "../breadCrumb/createBreadCrumbData";

export function getCategoryBreadCrumbData (categories) {
    /**
     * Returns breadcrumb data for categories (Array of Objects).
     * Each object has three field:
     * - url: url path for searching product with the specified category
     * - valueToDisplay: Category name
     * - disabled: Whether breadcrumb disabled
     */
    let product_search_path = '/s';
    let urls = [];
    let valuesToDisplay = [];
    let disabledBreadCrumbs = [];

    const getSearchParamsString = (category_id) => {
        return createSearchParams({
            category: category_id
        }).toString();
    };


    for (let category of categories) {
        urls.push(product_search_path + "?" + getSearchParamsString(category._id));
        valuesToDisplay.push(category.name);
        disabledBreadCrumbs.push(false);
    }

    return createBreadCrumbData(urls, valuesToDisplay, disabledBreadCrumbs);
};