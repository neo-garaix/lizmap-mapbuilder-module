import { LayerTreeFolder } from "../LayerTree/LayerTreeFolder";

export class AbstractFilter {

  /**
   * @type {LayerTreeFolder} Layer currently filtered.
   * @private
   */
  _currentElement;

  /**
   * Filter the layer tree.
   * @param {LayerTreeFolder[]} layerTree - Layer tree to filter.
   */
  constructor(layerStore) {
    this._layerStore = layerStore;
  }

  /**
   * Filter the layer tree.
   */
  filter() {
    this._layerTree = this._layerStore.getTree();
    for (let i = 0; i < this._layerTree.length; i++) {
      this._currentElement = this._layerTree[i];
      if (this._currentElement.isVisible()) {
        this.recFilter(this._layerTree[i]);
      }
    }
    this._layerStore.updateTree(this._layerTree);
  }

  /**
   * Recursive function to filter a layer.
   * @param {LayerTreeFolder|LayerTreeLayer} layerTreeElement - Layer tree element to filter.
   */
  recFilter(layerTreeElement) {
    throw new Error("Method 'recFilter()' must be implemented.");
  }

  /**
   * Set a layer to a decided visibility.
   * @param {boolean} visibility - Visibility of the layer.
   */
  switchAllVisible(visibility) {
    this.recSwitchAllVisible(this._currentElement, visibility);
  }

  /**
   * Recursive function to set a layer to a decided visibility.
   * @param {LayerTreeFolder|LayerTreeLayer} layerTreeElement - Layer tree element to set invisible.
   * @param {boolean} visibility - Visibility of the layer.
   */
  recSwitchAllVisible(layerTreeElement, visibility) {
    if (layerTreeElement instanceof LayerTreeFolder) {
      let children = layerTreeElement.getChildren();
      for (let i = 0; i < children.length; i++) {
        this.recSwitchAllVisible(children[i], visibility);
      }
    }
    layerTreeElement.setVisible(visibility);
  }
}
