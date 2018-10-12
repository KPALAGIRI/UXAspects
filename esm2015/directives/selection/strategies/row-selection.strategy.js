/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';
export class RowSelectionStrategy extends SelectionStrategy {
    constructor() {
        super(...arguments);
        this._selection = { start: null, end: null };
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        event.preventDefault();
    }
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
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
    }
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
    keydown(event, data) {
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
    }
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    toggle(data, activate = false) {
        super.toggle(data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
    }
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    singleSelect(data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    }
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    multipleSelect(data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect(...this.getSelectedItems());
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select(...this.getSelectedItems());
    }
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    setSelectionStart(data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    setSelectionEnd(data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    clearSelection(deactivate = true) {
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    }
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    getSelectedItems() {
        // get the latest dataset
        const { dataset } = this.selectionService;
        // get the indexes of the start and end point
        const /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        const /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    }
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    navigate(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        const /** @type {?} */ sibling = this.selectionService.activateSibling(event.which === UP_ARROW);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE1BQU0sMkJBQTRCLFNBQVEsaUJBQWlCOzs7MEJBR3pCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOzs7Ozs7OztJQU0xRCxTQUFTLENBQUMsS0FBaUI7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7O0lBS0QsS0FBSyxDQUFDLEtBQWlCLEVBQUUsSUFBUzs7UUFHaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7O1FBR0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7Ozs7SUFTRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FB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QUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELHVCQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBR3BELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQU0zRSxRQUFRLENBQUMsS0FBb0IsRUFBRSxJQUFTOztRQUc5QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQzs7UUFHcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCOztRQUdELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7O1FBR2hGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUd4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7O0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbmV4cG9ydCBjbGFzcyBSb3dTZWxlY3Rpb25TdHJhdGVneSBleHRlbmRzIFNlbGVjdGlvblN0cmF0ZWd5IHtcblxuICAvLyBzdG9yZSB0aGUgbW9zdCByZWNlbnRseSBzZWxlY3RlZCByb3dcbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb24gPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCBvbiBzaGlmdCBjbGljayB0aGUgYnJvd3NlciB3aWxsIGhpZ2hsaWdodFxuICAgKiB0ZXh0LiBUaGlzIGxvb2tzIGJhZCBhbmQgd2UgZG9uJ3Qgd2FudCB0aGlzIHRvIG9jY3VyXG4gICAqL1xuICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gYSByb3cgaXMgY2xpY2tlZCB3ZSB3YW50IHRvIGhhbmRsZSBzZWxlY3Rpb25cbiAgICovXG4gIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSB3aGljaCBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkXG4gICAgY29uc3QgeyBjdHJsS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XG5cbiAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgd2Ugd2FudCB0byBwZXJmb3JtIGEgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgaWYgKHNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgY29udHJvbCBrZXkgaXMgcHJlc3NlZCB3ZSB3YW50IHRvIHBlcmZvcm0gYW4gYWRkaXRpdmUgdG9nZ2xlIHNlbGVjdGlvblxuICAgIGlmIChjdHJsS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gcGVyZm9ybSBhIHNpbmdsZSBzZWxlY3Rpb24gd2hlcmUgYWxsIG90aGVyIHJvd3MgYXJlIGRlc2VsZWN0ZWRcbiAgICB0aGlzLnNpbmdsZVNlbGVjdChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBzdXBwb3J0IGZ1bGwga2V5Ym9hcmQgY29udHJvbCB3ZSBuZWVkIHRvIHN1cHBvcnQgdGhlIGZvbGxvd2luZzpcbiAgICogMS4gQXJyb3cga2V5cyB0byBuYXZpZ2F0ZSB1cCBhbmQgZG93blxuICAgKiAyLiBTcGFjZWJhciB0byB0b2dnbGUgc2VsZWN0aW9uXG4gICAqIDMuIFNoaWZ0ICsgQXJyb3cga2V5cyB0byBtdWx0aXBsZSBzZWxlY3RcbiAgICogNC4gQ3RybCArIEFycm93IGtleXMgdG8gYWxsb3cgcmV0YWluZWQgc2VsZWN0aW9uIGFuZCBuYXZpZ2F0aW9uXG4gICAqL1xuICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblxuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShldmVudCwgZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kudG9nZ2xlKGRhdGEsIHRydWUpO1xuICAgICAgICBicmVhaztcblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgc3RhbmRhcmQgdG9nZ2xlIGZ1bmN0aW9uIHRvIHN0b3JlIG9yIGNsZWFyIHRoZVxuICAgKiBtb3N0IHJlY2VudGx5IHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIHRvZ2dsZShkYXRhOiBhbnksIGFjdGl2YXRlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBzdXBlci50b2dnbGUoZGF0YSk7XG5cbiAgICAvLyBzdG9yZSBvciBjbGVhciB0aGUgc2VsZWN0aW9uXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQoZGF0YSkgPyB0aGlzLnNldFNlbGVjdGlvblN0YXJ0KGRhdGEpIDogdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgLy8gaWYgd2Ugd2FudCB0byBrZWVwIHRoZSBpdGVtIGFjdGl2YXRlZCB0aGVuIGFjdGl2YXRlXG4gICAgaWYgKGFjdGl2YXRlKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBvdGhlciBzZWxlY3RlZCBpdGVtcyBhbmQgc2VsZWN0IG9ubHlcbiAgICogdGhlIG1vc3QgcmVjZW50bHkgc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgcHJpdmF0ZSBzaW5nbGVTZWxlY3QoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgb3RoZXIgcm93cyBpZiBuZWl0aGVyIG1vZGlmaWVyIGtleSBpcyBwcmVzc2VkXG4gICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xuXG4gICAgLy8gc2VsZWN0IHRoZSBjdXJyZW50IHJvd1xuICAgIHRoaXMuc2VsZWN0KGRhdGEpO1xuXG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgaXRlbSBhcyB0aGUgc2VsZWN0aW9uIHN0YXJ0XG4gICAgdGhpcy5zZXRTZWxlY3Rpb25TdGFydChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgbXVsdGlwbGUgc2VsZWN0aW9uOlxuICAgKiAxLiBJZiBubyBzdGFydCBpdGVtIHNlbGVjdGVkIC0gc2VsZWN0IGl0XG4gICAqIDIuIElmIGEgc3RhcnQgaXRlbSBoYXMgYmVlbiBzZWxlY3RlZCAtIHNlbGVjdCBhbGwgaW4gYmV0d2VlblxuICAgKiAzLiBJZiBhIHN0YXJ0IGFuZCBlbmQgaXRlbSBoYXZlIGJlZW4gc2VsZWN0ZWQgY2xlYXIgdGhlIHJhbmdlIGFuZCB0aGVuIHNlbGVjdCB0aGUgbmV3IHJhbmdlXG4gICAqL1xuICBwcm90ZWN0ZWQgbXVsdGlwbGVTZWxlY3QoZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBpZiBubyBzZWxlY3Rpb24gY3VycmVudGx5IGV4aXN0cyB0aGVuIHBlcmZvcm0gaW5pdGlhbCBzZWxlY3Rpb25cbiAgICBpZiAoIXRoaXMuX3NlbGVjdGlvbi5zdGFydCkge1xuXG4gICAgICAvLyBzZWxlY3QgdGhlIHJvd1xuICAgICAgdGhpcy5zZWxlY3QoZGF0YSk7XG5cbiAgICAgIC8vIHN0b3JlIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgcmV0dXJuIHRoaXMuc2V0U2VsZWN0aW9uU3RhcnQoZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gaWYgYSBtdWx0aXBsZSBzZWxlY3Rpb24gYWxyZWFkeSB0b29rIHBsYWNlIC0gY2xlYXIgdGhlIHByZXZpb3VzIHNlbGVjdGlvblxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24uc3RhcnQgJiYgdGhpcy5fc2VsZWN0aW9uLmVuZCkge1xuICAgICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBuZXcgc2VsZWN0aW9uIGVuZCBwb2ludFxuICAgIHRoaXMuc2V0U2VsZWN0aW9uRW5kKGRhdGEpO1xuXG4gICAgLy8gc2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIHJhbmdlXG4gICAgdGhpcy5zZWxlY3QoLi4udGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0aW9uIHN0YXJ0IHBvaW50LiBJZiB0aGVyZSB3YXMgcHJldmlvdXNseSBhXG4gICAqIHNlbGVjdGlvbiBlbmQgcG9pbnQgdGhlbiBjbGVhciBpdCBhcyB0aGlzIGlzIGEgbmV3IHNlbGVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3Rpb25TdGFydChkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uc3RhcnQgPSBkYXRhO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5lbmQgPSBudWxsO1xuXG4gICAgLy8gYWN0aXZhdGUgdGhlIGl0ZW1cbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3Rpb24gZW5kIHBvaW50XG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGlvbkVuZChkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZW5kID0gZGF0YTtcblxuICAgIC8vIGFjdGl2YXRlIHRoZSBpdGVtXG4gICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGJvdGggc3RhcnQgYW5kIGVuZCBzZWxlY3Rpb24gcG9pbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJTZWxlY3Rpb24oZGVhY3RpdmF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcblxuICAgIC8vIHJlc2V0IHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgdGhpcy5fc2VsZWN0aW9uID0geyBzdGFydDogbnVsbCwgZW5kOiBudWxsIH07XG5cbiAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW1cbiAgICBpZiAoZGVhY3RpdmF0ZSkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIGFsbCB0aGUgaXRlbXMgYWZmZWN0ZWQgYnkgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgKiBOb3RlIHRoYXQgdGhlIGVuZCBwb2ludCBtYXkgYmUgYWJvdmUgdGhlIHN0YXJ0IHBvaW50IHNvXG4gICAqIHdlIG5lZWQgdG8gYWNjb3VudCBmb3IgdGhpcy5cbiAgICovXG4gIHByaXZhdGUgZ2V0U2VsZWN0ZWRJdGVtcygpOiBhbnlbXSB7XG5cbiAgICAvLyBnZXQgdGhlIGxhdGVzdCBkYXRhc2V0XG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSB0aGlzLnNlbGVjdGlvblNlcnZpY2U7XG5cbiAgICAvLyBnZXQgdGhlIGluZGV4ZXMgb2YgdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRcbiAgICBjb25zdCBzdGFydElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uc3RhcnQpO1xuICAgIGNvbnN0IGVuZElkeCA9IGRhdGFzZXQuaW5kZXhPZih0aGlzLl9zZWxlY3Rpb24uZW5kKTtcblxuICAgIC8vIGdldCB0aGUgcmVnaW9uIG9mIHRoZSBhcnJheSB0aGF0IGlzIHNlbGVjdGVkIC0gbm90ZSB0aGUgZW5kSWR4IG1heSBiZSBiZWZvcmUgdGhlIHN0YXJ0SWR4IHNvIGFjY291bnQgZm9yIHRoaXNcbiAgICByZXR1cm4gZGF0YXNldC5zbGljZShNYXRoLm1pbihzdGFydElkeCwgZW5kSWR4KSwgTWF0aC5tYXgoc3RhcnRJZHgsIGVuZElkeCkgKyAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3RpdmF0ZSB0aGUgc2libGluZyBpdGVtIHdoZW4gYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgKi9cbiAgcHJpdmF0ZSBuYXZpZ2F0ZShldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxuICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xuXG4gICAgLy8gaWYgbm8gbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZCB0aGVuIGRlc2VsZWN0IGFsbCBhbmQgY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgIGlmICghY3RybEtleSAmJiAhc2hpZnRLZXkpIHtcbiAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGFjdGl2YXRlIHRoZSBzaWJsaW5nIC0gaWYgdGhlIHVwIGFycm93IGlzIHByZXNzZWQgdGhlbiBuYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgc2libGluZ1xuICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGV2ZW50LndoaWNoID09PSBVUF9BUlJPVyk7XG5cbiAgICAvLyBpZiB0aGUgc2hpZnQga2V5IGlzIHByZXNzZWQgdGhlbiB3ZSBhbHNvIHdhbnQgdG8gdG9nZ2xlIHRoZSBzdGF0ZSBpZiB0aGUgaXRlbVxuICAgIGlmIChzaGlmdEtleSAmJiBzaWJsaW5nKSB7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnQgc2VsZWN0aW9uIHN0YXJ0IHRoZW4gc2VsZWN0IHRoZSBjdXJyZW50IHJvd1xuICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rpb24uc3RhcnQpIHtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChkYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdChzaWJsaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb24ge1xuICBzdGFydDogYW55O1xuICBlbmQ6IGFueTtcbn1cbiJdfQ==