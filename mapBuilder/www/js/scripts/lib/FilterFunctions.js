/***********************
 * Functions to filter *
 ***********************/

let layerStorePointer;
let listFiltersPointer;
let selectedFiltersPointer;

/**
 * Initializes the variables required for functions.
 * @param {object} filters - The filters object that defines available filters.
 * @param {object} layerStore - The layer store object that contains layer store.
 * @param {object} selectedFilters - The object that tracks currently selected filters.
 */
export function initVars(filters, layerStore, selectedFilters) {
    layerStorePointer = layerStore;
    listFiltersPointer = filters;
    selectedFiltersPointer = selectedFilters;
}

/**
 * Initializes event listeners for managing keyword filters in the UI.
 * @param {import("../modules/Filter/KeywordsManager").KeywordsManager} keywordsManager The keywords manager.
 */
export function initEventKeywordsFilters(keywordsManager) {
    const button = document.getElementById("filterButtonKeywords");

    button.addEventListener("click", function() {
        if (!button.classList.contains("active")) {
            document.getElementById("filter-keywords-handler").classList.add("active");
        } else {
            document.getElementById("filter-keywords-handler").classList.remove("active");
        }
    });

    document.getElementById("filter-keywords-list-button").addEventListener("click", function() {
        const list = document.getElementById("filter-keywords-list")
        if (list.classList.contains("active")) {
            list.classList.remove("active");
        } else {
            list.classList.add("active");
        }
    });

    document.getElementById("keywordsUnionButton").addEventListener("click", function() {
        keywordsManager.setCalculationMethod("union");
        document.getElementById("filter-keywords-list-button").classList.replace("btn-danger", "btn-info");
        document.getElementById("filter-keywords-list-words").classList.remove("inter");
        filter();
    });

    document.getElementById("keywordsIntersectButton").addEventListener("click", function() {
        keywordsManager.setCalculationMethod("intersect");
        document.getElementById("filter-keywords-list-button").classList.replace("btn-info", "btn-danger");
        document.getElementById("filter-keywords-list-words").classList.add("inter");
        filter();
    });

    const textInputKeywords = document.getElementById("keywordsFindInput");

    let timeout;

    textInputKeywords.addEventListener("input", function () {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            keywordsManager.refreshKeywordsFromSearch(textInputKeywords.value);
        }, 400);
    });
}

/**
 * Initialize filter buttons.
 */
export function initFilterButtons() {
    // ButtonNoFilter
    document.getElementById("filter-button-no").addEventListener("click", function() {
        while (selectedFiltersPointer.pop())
            resetTree();
        document.getElementById("filterButtonExtent").classList.remove("active");
        document.getElementById("filterButtonKeywords").classList.remove("active");
    });

    const filtersUpdate = new CustomEvent('selectedFiltersUpdated');

    document.querySelectorAll('#filter-buttons > label').forEach(button => {
        const filterName = button.children[0].name;

        button.addEventListener("click", () => {
            if (!button.classList.contains("active")) {
                selectedFiltersPointer.push(filterName);
                document.dispatchEvent(filtersUpdate);
            } else {
                selectedFiltersPointer.splice(selectedFiltersPointer.indexOf(filterName), 1);
                document.dispatchEvent(filtersUpdate);
            }
        });
    });
}

/**
 * This method iterates through an array of selected filters, applying each filter function from the `listFilters` object.
 */
export async function filter() {
    layerStorePointer.setProjectAllVisible();

    for (let i = 0; i < selectedFiltersPointer.length; i++) {
        listFiltersPointer[selectedFiltersPointer[i]].filter();
    }
}

/**
 * Resets the state of the tree structure and updates it.
 * If the `complete` parameter is set to true, additional UI elements are reset.
 * @param {boolean} [complete] - Indicates if a complete reset should occur, including UI elements.
 */
export function resetTree(complete = true) {
    layerStorePointer.setProjectAllVisible();
    if (complete) {
        document.getElementById("filter-keywords-list").classList.remove("active");
        document.getElementById("filter-keywords-handler").classList.remove("active");
    }
    layerStorePointer.updateTree(layerStorePointer.getTree());
}
