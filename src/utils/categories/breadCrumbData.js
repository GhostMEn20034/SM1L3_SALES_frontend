import { createSearchParams } from "react-router-dom";
import { createBreadCrumbData } from "../breadCrumb/createBreadCrumbData";


export function getCategoryAncestorsBreadCrumbData (categories, disableLastValues=0 , includeIndexPagePath = true) {
    /** 
     * @param categories - List category objects
     * @param disableLastValues - How many disable breadcrumbs (For example, if value is 2, then last 2 breadcrums will be disabled)
     * @param includeIndexPagePath - Whether to add a link to index page as the first breadcrumb.
     * Returns breadcrumb data for categories' ancestors (Array of Objects).
     * Each object has three field:
     * - url: url path for searching product with the specified category
     * - valueToDisplay: Category name
     * - disabled: Whether breadcrumb disabled
     */
    let categoryListPath = '/categories';
    let urls = [];
    let valuesToDisplay = [];
    let disabledBreadCrumbs = [];

    const getSearchParamsString = (category_id) => {
        return createSearchParams({
            parentId: category_id
        }).toString();
    };

    if (includeIndexPagePath) {
        urls.push("/");
        valuesToDisplay.push("Main Page");
        disabledBreadCrumbs.push(false);
    }

    for (let category of categories) {
        urls.push(categoryListPath + "?" + getSearchParamsString(category._id));
        valuesToDisplay.push(category.name);
        disabledBreadCrumbs.push(false);
    }

    let disabledBreadCrumbsLength = disabledBreadCrumbs.length;

    if (disableLastValues > 0) {
        for (let i = disabledBreadCrumbsLength - disableLastValues; i < disabledBreadCrumbsLength; i++) {
            disabledBreadCrumbs[i] = true;
        }
    }

    return createBreadCrumbData(urls, valuesToDisplay, disabledBreadCrumbs);
};