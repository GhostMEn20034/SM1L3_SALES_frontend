const convertCrumb = (crumb) => {
    crumb = crumb.replace(/[-_]/g, " ");

    crumb = crumb.replace(/^\w/, (c) => c.toUpperCase());

    return crumb;
}


export function createBreadCrumpData (path, valuesToDisplay) {
    /**
     * Creates an object with breadcrump data.
     * @param {Array} path - Array with urls.
     * @param {Array} valuesToDisplay - Array with displayable values
     */
    return path.map((elem, i) => {
        return {"url": elem, "valueToDisplay": valuesToDisplay[i]}
    });
}


export function createBreadCrumpDataFromUrl (url, lastValueName=null) {
    /**
     * Creates an object with breadcrump data from the URL.
     * @param {String} url
     * @param {String} [lastValueName] - Value that will be displayed in last breadcrump element
     */
    let urlPath = [];
    let valuesToDisplay = [];
    let splitedUrl = url.split("/").filter(crumb => crumb !== '');
    let currentLink = '';

    for (let i = 0; i < splitedUrl.length; i++) {
        currentLink += `/${splitedUrl[i]}`;
        urlPath.push(currentLink);
        valuesToDisplay.push(convertCrumb(splitedUrl[i]));
    }

    if (lastValueName) {
        valuesToDisplay[valuesToDisplay.length - 1] = lastValueName;
    }

    return createBreadCrumpData(urlPath, valuesToDisplay);
}
