const convertCrumb = (crumb) => {
    crumb = crumb.replace(/[-_]/g, " ");

    crumb = crumb.replace(/^\w/, (c) => c.toUpperCase());

    return crumb;
}


export function createBreadCrumbData (path, valuesToDisplay, disabledIndexes) {
    /**
     * Creates an object with breadcrump data.
     * @param {Array} path - Array with urls.
     * @param {Array} valuesToDisplay - Array with displayable values
     * @param {Array} disabledIndexes - Array with indexes where breadcrumb will be disabled. For example:
     * if value on the 1st index is true, then breadcrumb with 1st index will be disabled
     */
    return path.map((elem, i) => {
        return {"url": elem, "valueToDisplay": valuesToDisplay[i], "disabled": disabledIndexes[i]};
    });
}


export function createBreadCrumbDataFromUrl (url, lastValueName=null) {
    /**
     * Creates an object with breadcrump data from the URL.
     * @param {String} url
     * @param {String} [lastValueName] - Value that will be displayed in last breadcrump element
     */
    let urlPath = [];
    let valuesToDisplay = [];
    let disabledBreadCrumbs = [];
    let splitedUrl = url.split("/").filter(crumb => crumb !== '');
    let currentLink = '';

    for (let i = 0; i < splitedUrl.length; i++) {
        currentLink += `/${splitedUrl[i]}`;
        urlPath.push(currentLink);
        valuesToDisplay.push(convertCrumb(splitedUrl[i]));

        if (i === splitedUrl.length - 1) {
            disabledBreadCrumbs.push(true);
        } else {
            disabledBreadCrumbs.push(false);
        }
    }

    if (lastValueName) {
        valuesToDisplay[valuesToDisplay.length - 1] = lastValueName;
    }

    return createBreadCrumbData(urlPath, valuesToDisplay, disabledBreadCrumbs);
}
