import {ExtentFilter} from "../modules/Filter/FilterExtent";
import {KeywordsFilter} from "../modules/Filter/FilterKeywords";
import {initVars, initEventKeywordsFilters, initFilterButtons, filter, resetTree} from "./lib/FilterFunctions";

let selectedFilters = [];

/**
 * Initializes filters for the application by setting up event listeners, creating filter instances,
 * and binding filter-related events.
 * @param {object} layerStore - The layer store.
 * @param {object} keywordsManager - The manager responsible for keywords.
 */
export function initFilters(layerStore, keywordsManager) {

    document.addEventListener('keywordsUpdated', () => {
        filter();
    });

    initVars(
        {
            Extent: new ExtentFilter(layerStore),
            Keywords: new KeywordsFilter(layerStore, keywordsManager)
        },
        layerStore,
        selectedFilters
    );
    initFilterButtons();
    initEventKeywordsFilters(keywordsManager);

    document.addEventListener('selectedFiltersUpdated', () => {
        if (selectedFilters.length < 1) {
            resetTree();
        } else {
            resetTree(false)
            filter();
        }
    });
}
