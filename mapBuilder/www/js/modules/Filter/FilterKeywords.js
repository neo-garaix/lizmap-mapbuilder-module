import { AbstractFilter } from "./AbstractFilter";

export class KeywordsFilter extends AbstractFilter {

  selectedKeywords;
  method;

  /**
   * Filter the layer tree using keywords of layers.
   * @param {[LayerTreeElement]} layerTree - Layer tree to filter.
   */
  constructor(layerTree, keywordManager) {
    super(layerTree);
    this.keywordManager = keywordManager;
  }

  setVariables() {
    this.selectedKeywords = this.keywordManager.getSelectedKeywords();
    this.method = this.keywordManager.getCalculationMethod();
  }

  recFilter(layerTreeElement) {
    let layerKeywords = layerTreeElement.getKeywords();
    const visibility = this.calculateFilter(layerKeywords);
    this.switchAllVisible(visibility);
  }

  calculateFilter(layerKeywords) {
    this.setVariables();
    if (this.selectedKeywords.length < 1) {
      return false;
    }
    if (this.method === "union") {
      return this.selectedKeywords.some(keyword => layerKeywords.includes(keyword));
    } else {
      return this.selectedKeywords.every(keyword => layerKeywords.includes(keyword));
    }
  }
}
