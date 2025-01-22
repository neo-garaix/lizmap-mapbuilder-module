import { AbstractFilter } from "./AbstractFilter";

export class KeywordsFilter extends AbstractFilter {

  /**
   * Filter the layer tree using keywords of layers.
   * @param {[LayerTreeElement]} layerTree - Layer tree to filter.
   */
  constructor(layerTree, keywords, method) {
    super(layerTree);
    this.keywords = keywords;
    this.method = method;
  }

  recFilter(layerTreeElement) {
    let layerKeywords = layerTreeElement.getKeywords();
    const visibility = this.calculateFilter(layerKeywords);
    this.switchAllVisible(visibility);
  }

  calculateFilter(layerKeywords) {
    if (this.keywords.length < 1) {
      return false;
    }
    if (this.method === "union") {
      return this.keywords.some(keyword => layerKeywords.includes(keyword));
    } else {
      return this.keywords.every(keyword => layerKeywords.includes(keyword));
    }
  }
}
