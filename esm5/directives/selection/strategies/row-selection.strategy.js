/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
var RowSelectionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(RowSelectionStrategy, _super);
    function RowSelectionStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selection = { start: null, end: null };
        return _this;
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     */
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    RowSelectionStrategy.prototype.mousedown = /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
    };
    /**
     * When a row is clicked we want to handle selection
     */
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.click = /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if the shift key is pressed we want to perform a multiple selection
        if (shiftKey) {
            return this.multipleSelect(data);
        }
        // if the control key is pressed we want to perform an additive toggle selection
        if (ctrlKey) {
            return this.toggle(data);
        }
        // perform a single selection where all other rows are deselected
        this.singleSelect(data);
    };
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     */
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.keydown = /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        switch (event.which) {
            case UP_ARROW:
            case DOWN_ARROW:
                event.preventDefault();
                this.navigate(event, data);
                break;
            case SPACE:
                event.preventDefault();
                this.selectionService.strategy.toggle(data, true);
                break;
        }
    };
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     */
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    RowSelectionStrategy.prototype.toggle = /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    function (data, activate) {
        if (activate === void 0) { activate = false; }
        _super.prototype.toggle.call(this, data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
    };
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.singleSelect = /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    };
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     */
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.multipleSelect = /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    function (data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect.apply(this, tslib_1.__spread(this.getSelectedItems()));
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select.apply(this, tslib_1.__spread(this.getSelectedItems()));
    };
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionStart = /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.setSelectionEnd = /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    };
    /**
     * Clear both start and end selection points
     */
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    RowSelectionStrategy.prototype.clearSelection = /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    function (deactivate) {
        if (deactivate === void 0) { deactivate = true; }
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    };
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    RowSelectionStrategy.prototype.getSelectedItems = /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    function () {
        // get the latest dataset
        var dataset = this.selectionService.dataset;
        // get the indexes of the start and end point
        var /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        var /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    };
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    RowSelectionStrategy.prototype.navigate = /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    function (event, data) {
        // determine which modifier keys are pressed
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        var /** @type {?} */ sibling = this.selectionService.activateSibling(event.which === UP_ARROW);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    };
    return RowSelectionStrategy;
}(SelectionStrategy));
export { RowSelectionStrategy };
function RowSelectionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    RowSelectionStrategy.prototype._selection;
}
/**
 * @record
 */
export function Selection() { }
function Selection_tsickle_Closure_declarations() {
    /** @type {?} */
    Selection.prototype.start;
    /** @type {?} */
    Selection.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxJQUFBO0lBQTBDLGdEQUFpQjs7OzJCQUd6QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7O0lBRTFEOzs7T0FHRzs7Ozs7OztJQUNILHdDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQWlCO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN4QjtJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsb0NBQUs7Ozs7OztJQUFMLFVBQU0sS0FBaUIsRUFBRSxJQUFTOztRQUd4QixJQUFBLHVCQUFPLEVBQUUseUJBQVEsQ0FBVzs7UUFHcEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjs7UUFHRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pCO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7OztJQUNILHNDQUFPOzs7Ozs7Ozs7O0lBQVAsVUFBUSxLQUFvQixFQUFFLElBQVM7UUFFckMsTUFBTSxDQUFDLENBQUMsS0FBSyxD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QUVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7OytCQTdNTDtFQUcwQyxpQkFBaUIsRUE0TTFELENBQUE7QUE1TUQsZ0NBNE1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9XTl9BUlJPVywgU1BBQ0UsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgUm93U2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneSB7XG5cbiAgLy8gc3RvcmUgdGhlIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgcm93XG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uID0geyBzdGFydDogbnVsbCwgZW5kOiBudWxsIH07XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgb24gc2hpZnQgY2xpY2sgdGhlIGJyb3dzZXIgd2lsbCBoaWdobGlnaHRcbiAgICogdGV4dC4gVGhpcyBsb29rcyBiYWQgYW5kIHdlIGRvbid0IHdhbnQgdGhpcyB0byBvY2N1clxuICAgKi9cbiAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGEgcm93IGlzIGNsaWNrZWQgd2Ugd2FudCB0byBoYW5kbGUgc2VsZWN0aW9uXG4gICAqL1xuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxuICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHdlIHdhbnQgdG8gcGVyZm9ybSBhIG11bHRpcGxlIHNlbGVjdGlvblxuICAgIGlmIChzaGlmdEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGNvbnRyb2wga2V5IGlzIHByZXNzZWQgd2Ugd2FudCB0byBwZXJmb3JtIGFuIGFkZGl0aXZlIHRvZ2dsZSBzZWxlY3Rpb25cbiAgICBpZiAoY3RybEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gYSBzaW5nbGUgc2VsZWN0aW9uIHdoZXJlIGFsbCBvdGhlciByb3dzIGFyZSBkZXNlbGVjdGVkXG4gICAgdGhpcy5zaW5nbGVTZWxlY3QoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVG8gc3VwcG9ydCBmdWxsIGtleWJvYXJkIGNvbnRyb2wgd2UgbmVlZCB0byBzdXBwb3J0IHRoZSBmb2xsb3dpbmc6XG4gICAqIDEuIEFycm93IGtleXMgdG8gbmF2aWdhdGUgdXAgYW5kIGRvd25cbiAgICogMi4gU3BhY2ViYXIgdG8gdG9nZ2xlIHNlbGVjdGlvblxuICAgKiAzLiBTaGlmdCArIEFycm93IGtleXMgdG8gbXVsdGlwbGUgc2VsZWN0XG4gICAqIDQuIEN0cmwgKyBBcnJvdyBrZXlzIHRvIGFsbG93IHJldGFpbmVkIHNlbGVjdGlvbiBhbmQgbmF2aWdhdGlvblxuICAgKi9cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG5cbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubmF2aWdhdGUoZXZlbnQsIGRhdGEpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnRvZ2dsZShkYXRhLCB0cnVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIHN0YW5kYXJkIHRvZ2dsZSBmdW5jdGlvbiB0byBzdG9yZSBvciBjbGVhciB0aGVcbiAgICogbW9zdCByZWNlbnRseSBzZWxlY3RlZCBpdGVtXG4gICAqL1xuICB0b2dnbGUoZGF0YTogYW55LCBhY3RpdmF0ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgc3VwZXIudG9nZ2xlKGRhdGEpO1xuXG4gICAgLy8gc3RvcmUgb3IgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKGRhdGEpID8gdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKSA6IHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgIC8vIGlmIHdlIHdhbnQgdG8ga2VlcCB0aGUgaXRlbSBhY3RpdmF0ZWQgdGhlbiBhY3RpdmF0ZVxuICAgIGlmIChhY3RpdmF0ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgb3RoZXIgc2VsZWN0ZWQgaXRlbXMgYW5kIHNlbGVjdCBvbmx5XG4gICAqIHRoZSBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgc2luZ2xlU2VsZWN0KGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGVzZWxlY3QgYWxsIG90aGVyIHJvd3MgaWYgbmVpdGhlciBtb2RpZmllciBrZXkgaXMgcHJlc3NlZFxuICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcblxuICAgIC8vIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICB0aGlzLnNlbGVjdChkYXRhKTtcblxuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IGl0ZW0gYXMgdGhlIHNlbGVjdGlvbiBzdGFydFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIG11bHRpcGxlIHNlbGVjdGlvbjpcbiAgICogMS4gSWYgbm8gc3RhcnQgaXRlbSBzZWxlY3RlZCAtIHNlbGVjdCBpdFxuICAgKiAyLiBJZiBhIHN0YXJ0IGl0ZW0gaGFzIGJlZW4gc2VsZWN0ZWQgLSBzZWxlY3QgYWxsIGluIGJldHdlZW5cbiAgICogMy4gSWYgYSBzdGFydCBhbmQgZW5kIGl0ZW0gaGF2ZSBiZWVuIHNlbGVjdGVkIGNsZWFyIHRoZSByYW5nZSBhbmQgdGhlbiBzZWxlY3QgdGhlIG5ldyByYW5nZVxuICAgKi9cbiAgcHJvdGVjdGVkIG11bHRpcGxlU2VsZWN0KGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gaWYgbm8gc2VsZWN0aW9uIGN1cnJlbnRseSBleGlzdHMgdGhlbiBwZXJmb3JtIGluaXRpYWwgc2VsZWN0aW9uXG4gICAgaWYgKCF0aGlzLl9zZWxlY3Rpb24uc3RhcnQpIHtcblxuICAgICAgLy8gc2VsZWN0IHRoZSByb3dcbiAgICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuXG4gICAgICAvLyBzdG9yZSB0aGUgc3RhcnRpbmcgcG9pbnRcbiAgICAgIHJldHVybiB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpO1xuICAgIH1cblxuICAgIC8vIGlmIGEgbXVsdGlwbGUgc2VsZWN0aW9uIGFscmVhZHkgdG9vayBwbGFjZSAtIGNsZWFyIHRoZSBwcmV2aW91cyBzZWxlY3Rpb25cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uLnN0YXJ0ICYmIHRoaXMuX3NlbGVjdGlvbi5lbmQpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICAgIH1cblxuICAgIC8vIHNldCB0aGUgbmV3IHNlbGVjdGlvbiBlbmQgcG9pbnRcbiAgICB0aGlzLnNldFNlbGVjdGlvbkVuZChkYXRhKTtcblxuICAgIC8vIHNlbGVjdCBhbGwgdGhlIGl0ZW1zIGluIHRoZSByYW5nZVxuICAgIHRoaXMuc2VsZWN0KC4uLnRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHNlbGVjdGlvbiBzdGFydCBwb2ludC4gSWYgdGhlcmUgd2FzIHByZXZpb3VzbHkgYVxuICAgKiBzZWxlY3Rpb24gZW5kIHBvaW50IHRoZW4gY2xlYXIgaXQgYXMgdGhpcyBpcyBhIG5ldyBzZWxlY3Rpb25cbiAgICovXG4gIHByaXZhdGUgc2V0U2VsZWN0aW9uU3RhcnQoZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLnN0YXJ0ID0gZGF0YTtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW5kID0gbnVsbDtcblxuICAgIC8vIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25FbmQoZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmVuZCA9IGRhdGE7XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBib3RoIHN0YXJ0IGFuZCBlbmQgc2VsZWN0aW9uIHBvaW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIGNsZWFyU2VsZWN0aW9uKGRlYWN0aXZhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG5cbiAgICAvLyByZXNldCB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIHRoaXMuX3NlbGVjdGlvbiA9IHsgc3RhcnQ6IG51bGwsIGVuZDogbnVsbCB9O1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtXG4gICAgaWYgKGRlYWN0aXZhdGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBhbGwgdGhlIGl0ZW1zIGFmZmVjdGVkIGJ5IHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICogTm90ZSB0aGF0IHRoZSBlbmQgcG9pbnQgbWF5IGJlIGFib3ZlIHRoZSBzdGFydCBwb2ludCBzb1xuICAgKiB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoaXMuXG4gICAqL1xuICBwcml2YXRlIGdldFNlbGVjdGVkSXRlbXMoKTogYW55W10ge1xuXG4gICAgLy8gZ2V0IHRoZSBsYXRlc3QgZGF0YXNldFxuICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlO1xuXG4gICAgLy8gZ2V0IHRoZSBpbmRleGVzIG9mIHRoZSBzdGFydCBhbmQgZW5kIHBvaW50XG4gICAgY29uc3Qgc3RhcnRJZHggPSBkYXRhc2V0LmluZGV4T2YodGhpcy5fc2VsZWN0aW9uLnN0YXJ0KTtcbiAgICBjb25zdCBlbmRJZHggPSBkYXRhc2V0LmluZGV4T2YodGhpcy5fc2VsZWN0aW9uLmVuZCk7XG5cbiAgICAvLyBnZXQgdGhlIHJlZ2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBpcyBzZWxlY3RlZCAtIG5vdGUgdGhlIGVuZElkeCBtYXkgYmUgYmVmb3JlIHRoZSBzdGFydElkeCBzbyBhY2NvdW50IGZvciB0aGlzXG4gICAgcmV0dXJuIGRhdGFzZXQuc2xpY2UoTWF0aC5taW4oc3RhcnRJZHgsIGVuZElkeCksIE1hdGgubWF4KHN0YXJ0SWR4LCBlbmRJZHgpICsgMSk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGUgdGhlIHNpYmxpbmcgaXRlbSB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICovXG4gIHByaXZhdGUgbmF2aWdhdGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWRcbiAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5IH0gPSBldmVudDtcblxuICAgIC8vIGlmIG5vIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgdGhlbiBkZXNlbGVjdCBhbGwgYW5kIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICBpZiAoIWN0cmxLZXkgJiYgIXNoaWZ0S2V5KSB7XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgc2libGluZyAtIGlmIHRoZSB1cCBhcnJvdyBpcyBwcmVzc2VkIHRoZW4gbmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHNpYmxpbmdcbiAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhldmVudC53aGljaCA9PT0gVVBfQVJST1cpO1xuXG4gICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBwcmVzc2VkIHRoZW4gd2UgYWxzbyB3YW50IHRvIHRvZ2dsZSB0aGUgc3RhdGUgaWYgdGhlIGl0ZW1cbiAgICBpZiAoc2hpZnRLZXkgJiYgc2libGluZykge1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBjdXJyZW50IHNlbGVjdGlvbiBzdGFydCB0aGVuIHNlbGVjdCB0aGUgY3VycmVudCByb3dcbiAgICAgIGlmICghdGhpcy5fc2VsZWN0aW9uLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3QoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Qoc2libGluZyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uIHtcbiAgc3RhcnQ6IGFueTtcbiAgZW5kOiBhbnk7XG59XG4iXX0=