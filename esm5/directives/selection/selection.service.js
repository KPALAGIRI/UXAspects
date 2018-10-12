/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RowAltSelectionStrategy } from './strategies/row-alt-selection.strategy';
import { RowSelectionStrategy } from './strategies/row-selection.strategy';
import { SelectionStrategy } from './strategies/selection.strategy';
import { SimpleSelectionStrategy } from './strategies/simple-selection.strategy';
var SelectionService = /** @class */ (function () {
    function SelectionService() {
        this.strategy = new SimpleSelectionStrategy(this);
        this.isEnabled = true;
        this.isClickEnabled = true;
        this.isKeyboardEnabled = true;
        this.focus$ = new BehaviorSubject(null);
        this.active$ = new BehaviorSubject(null);
        this.selection$ = new BehaviorSubject([]);
        this._dataset = [];
        this._selection = new Set();
        this._strategyToDestroy = this.strategy;
    }
    Object.defineProperty(SelectionService.prototype, "dataset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dataset;
        },
        set: /**
         * @param {?} dataset
         * @return {?}
         */
        function (dataset) {
            this._dataset = dataset;
            if (this._dataset.indexOf(this._active) === -1) {
                this.setFirstItemFocusable();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._strategyToDestroy) {
            this._strategyToDestroy.destroy();
        }
    };
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     */
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.select = /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // add each selection to the set
        selections.forEach(function (selection) { return _this._selection.add(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Remove an item from the list of selected items
     */
    /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.deselect = /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        // remove each item from the set
        selections.forEach(function (selection) { return _this._selection.delete(selection); });
        // propagate the changes
        this.selectionHasMutated();
    };
    /**
     * Remove all items from the list of selected items
     */
    /**
     * Remove all items from the list of selected items
     * @return {?}
     */
    SelectionService.prototype.deselectAll = /**
     * Remove all items from the list of selected items
     * @return {?}
     */
    function () {
        // remove all items in the array
        this.deselect.apply(this, tslib_1.__spread(this._dataset));
        // clear the set in case any items have been removed from the DOM but are still selected
        this._selection.clear();
    };
    /**
     * Toggle the selected state of any specified items
     */
    /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    SelectionService.prototype.toggle = /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    function () {
        var _this = this;
        var selections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selections[_i] = arguments[_i];
        }
        selections.forEach(function (selection) { return _this.isSelected(selection) ? _this.deselect(selection) : _this.select(selection); });
    };
    /**
     * Determine whether or not a specific item is currently selected
     */
    /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.isSelected = /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this._selection.has(data);
    };
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     */
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.getSelectionState = /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.selection$.pipe(map(function () { return _this.isSelected(data); }), distinctUntilChanged());
    };
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     */
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    SelectionService.prototype.setStrategy = /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        if (this._strategyToDestroy) {
            // Destroy previous strategy if it was created internally
            this._strategyToDestroy.destroy();
            this._strategyToDestroy = null;
        }
        if (mode instanceof SelectionStrategy) {
            // Custom strategy - pass in the service instance
            this.strategy = mode;
            this.strategy.setSelectionService(this);
        }
        else {
            switch (mode.toLowerCase().trim()) {
                case 'simple':
                    this.strategy = this._strategyToDestroy = new SimpleSelectionStrategy(this);
                    break;
                case 'row':
                    this.strategy = this._strategyToDestroy = new RowSelectionStrategy(this);
                    break;
                case 'row-alt':
                    this.strategy = this._strategyToDestroy = new RowAltSelectionStrategy(this);
                    break;
                default:
                    throw new Error("The selection mode '" + mode + "' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.");
            }
        }
    };
    /**
     * Set the current active item
     */
    /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    SelectionService.prototype.activate = /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._active = data;
        this.active$.next(this._active);
    };
    /**
     * Deactive all items
     */
    /**
     * Deactive all items
     * @return {?}
     */
    SelectionService.prototype.deactivate = /**
     * Deactive all items
     * @return {?}
     */
    function () {
        this._active = null;
        this.active$.next(this._active);
    };
    /**
     * Return the next or previous sibling of the current active item.
     * @param previous If true, the previous sibling will be returned.
     */
    /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    SelectionService.prototype.getSibling = /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    function (previous) {
        if (previous === void 0) { previous = false; }
        // check if there is a current active item
        if (!this._active) {
            return;
        }
        // get the index of the current item
        var /** @type {?} */ idx = this.dataset.indexOf(this._active);
        var /** @type {?} */ target = this.dataset[previous ? idx - 1 : idx + 1];
        return target;
    };
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     */
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    SelectionService.prototype.activateSibling = /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    function (previous) {
        if (previous === void 0) { previous = false; }
        var /** @type {?} */ target = this.getSibling(previous);
        // check if the target exists
        if (target) {
            this.activate(target);
        }
        return target;
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    SelectionService.prototype.setDisabled = /**
     * @param {?} disabled
     * @return {?}
     */
    function (disabled) {
        // store the current disabled state
        this.isEnabled = !disabled;
        // clear any stateful data
        this._active = null;
        this.active$.next(this._active);
        this._selection.clear();
        // emit the selection change information
        this.selectionHasMutated();
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.selectionHasMutated = /**
     * @return {?}
     */
    function () {
        this.selection$.next(Array.from(this._selection));
    };
    /**
     * @return {?}
     */
    SelectionService.prototype.setFirstItemFocusable = /**
     * @return {?}
     */
    function () {
        if (this._dataset.length > 0) {
            this.focus$.next(this._dataset[0]);
            this._active = this._dataset[0];
        }
        else {
            this._active = null;
        }
    };
    SelectionService.decorators = [
        { type: Injectable }
    ];
    return SelectionService;
}());
export { SelectionService };
function SelectionService_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionService.prototype.strategy;
    /** @type {?} */
    SelectionService.prototype.isEnabled;
    /** @type {?} */
    SelectionService.prototype.isClickEnabled;
    /** @type {?} */
    SelectionService.prototype.isKeyboardEnabled;
    /** @type {?} */
    SelectionService.prototype.focus$;
    /** @type {?} */
    SelectionService.prototype.active$;
    /** @type {?} */
    SelectionService.prototype.selection$;
    /** @type {?} */
    SelectionService.prototype._active;
    /** @type {?} */
    SelectionService.prototype._dataset;
    /** @type {?} */
    SelectionService.prototype._selection;
    /** @type {?} */
    SelectionService.prototype._strategyToDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozt3QkFnQmpELElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDO3lCQUMxQyxJQUFJOzhCQUNDLElBQUk7aUNBQ0QsSUFBSTtzQkFFeEIsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDO3VCQUM3QixJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUM7MEJBQzNCLElBQUksZUFBZSxDQUFRLEVBQUUsQ0FBQzt3QkFHSixFQUFFOzBCQUNwQixJQUFJLEdBQUcsRUFBRTtrQ0FDa0IsSUFBSSxDQUFDLFFBQVE7O0lBdkI3RCxzQkFBSSxxQ0FBTzs7OztRQU9YO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBVEQsVUFBWSxPQUEyQjtZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUM5QjtTQUNGOzs7T0FBQTs7OztJQW9CRCxzQ0FBVzs7O0lBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztLQUNGO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsaUNBQU07Ozs7OztJQUFOO1FBQUEsaUJBT0M7UUFQTSxvQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLCtCQUFvQjs7O1FBR3pCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDOztRQUdoRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1QjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxtQ0FBUTs7Ozs7SUFBUjtRQUFBLGlCQU1DO1FBTlEsb0JBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiwrQkFBb0I7OztRQUUzQixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQzs7UUFHbkUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBVzs7OztJQUFYOztRQUVFLElBQUksQ0FBQyxRQUFRLE9BQWIsSUFBSSxtQkFBYSxJQUFJLENBQUMsUUFBUSxHQUFFOztRQUdoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3pCO0lBRUQ7O09BRUc7Ozs7OztJQUNILGlDQUFNOzs7OztJQUFOO1FBQUEsaUJBRUM7UUFGTSxvQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLCtCQUFvQjs7UUFDekIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQTlFLENBQThFLENBQUMsQ0FBQztLQUNqSDtJQUVEOztPQUVHOzs7Ozs7SUFDSCxxQ0FBVTs7Ozs7SUFBVixVQUFXLElBQVM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQWlCOzs7Ozs7SUFBakIsVUFBa0IsSUFBUztRQUEzQixpQkFFQztRQURDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQXJCLENBQXFCLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDdkY7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gsc0NBQVc7Ozs7Ozs7O0lBQVgsVUFBWSxJQUF1QztRQUVqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOztZQUU1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNoQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7O1lBR3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7U0FFekM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWxDLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1RSxLQUFLLENBQUM7Z0JBRVIsS0FBSyxLQUFLO29CQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQztnQkFFUixLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUUsS0FBSyxDQUFDO2dCQUVSO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXVCLElBQUkscUVBQWtFLENBQUMsQ0FBQzthQUNsSDtTQUNGO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsbUNBQVE7Ozs7O0lBQVIsVUFBUyxJQUFTO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqQztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHFDQUFVOzs7OztJQUFWLFVBQVcsUUFBeUI7UUFBekIseUJBQUEsRUFBQSxnQkFBeUI7O1FBR2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDO1NBQ1I7O1FBR0QscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2Y7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0gsMENBQWU7Ozs7Ozs7O0lBQWYsVUFBZ0IsUUFBeUI7UUFBekIseUJBQUEsRUFBQSxnQkFBeUI7UUFFdkMscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBR3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZCO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNmOzs7OztJQUVELHNDQUFXOzs7O0lBQVgsVUFBWSxRQUFpQjs7UUFFM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRU8sOENBQW1COzs7O1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRzVDLGdEQUFxQjs7OztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCOzs7Z0JBaE5KLFVBQVU7OzJCQVRYOztTQVVhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUm93QWx0U2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvcm93LWFsdC1zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgUm93U2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvcm93LXNlbGVjdGlvbi5zdHJhdGVneSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuaW1wb3J0IHsgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25TZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzZXQgZGF0YXNldChkYXRhc2V0OiBSZWFkb25seUFycmF5PGFueT4pIHtcbiAgICB0aGlzLl9kYXRhc2V0ID0gZGF0YXNldDtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5pbmRleE9mKHRoaXMuX2FjdGl2ZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLnNldEZpcnN0SXRlbUZvY3VzYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhc2V0KCk6IFJlYWRvbmx5QXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFzZXQ7XG4gIH1cblxuICBzdHJhdGVneTogU2VsZWN0aW9uU3RyYXRlZ3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gIGlzRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG4gIGlzQ2xpY2tFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNLZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGZvY3VzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgc2VsZWN0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcblxuICBwcml2YXRlIF9hY3RpdmU6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YXNldDogUmVhZG9ubHlBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfc3RyYXRlZ3lUb0Rlc3Ryb3k6IFNlbGVjdGlvblN0cmF0ZWd5ID0gdGhpcy5zdHJhdGVneTtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGl0ZW0gaXMgbm90IGN1cnJlbnRseSBzZWxlY3RlZCB0aGVuIGFkZCBpdFxuICAgKiB0byB0aGUgbGlzdCBvZiBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG5cbiAgICAvLyBhZGQgZWFjaCBzZWxlY3Rpb24gdG8gdGhlIHNldFxuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5fc2VsZWN0aW9uLmFkZChzZWxlY3Rpb24pKTtcblxuICAgIC8vIHByb3BhZ2F0ZSB0aGUgY2hhbmdlc1xuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0KC4uLnNlbGVjdGlvbnM6IGFueVtdKTogdm9pZCB7XG4gICAgLy8gcmVtb3ZlIGVhY2ggaXRlbSBmcm9tIHRoZSBzZXRcbiAgICBzZWxlY3Rpb25zLmZvckVhY2goc2VsZWN0aW9uID0+IHRoaXMuX3NlbGVjdGlvbi5kZWxldGUoc2VsZWN0aW9uKSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgdGhlIGNoYW5nZXNcbiAgICB0aGlzLnNlbGVjdGlvbkhhc011dGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIC8vIHJlbW92ZSBhbGwgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgdGhpcy5kZXNlbGVjdCguLi50aGlzLl9kYXRhc2V0KTtcblxuICAgIC8vIGNsZWFyIHRoZSBzZXQgaW4gY2FzZSBhbnkgaXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGJ1dCBhcmUgc3RpbGwgc2VsZWN0ZWRcbiAgICB0aGlzLl9zZWxlY3Rpb24uY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIHNlbGVjdGVkIHN0YXRlIG9mIGFueSBzcGVjaWZpZWQgaXRlbXNcbiAgICovXG4gIHRvZ2dsZSguLi5zZWxlY3Rpb25zOiBhbnlbXSk6IHZvaWQge1xuICAgIHNlbGVjdGlvbnMuZm9yRWFjaChzZWxlY3Rpb24gPT4gdGhpcy5pc1NlbGVjdGVkKHNlbGVjdGlvbikgPyB0aGlzLmRlc2VsZWN0KHNlbGVjdGlvbikgOiB0aGlzLnNlbGVjdChzZWxlY3Rpb24pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBzcGVjaWZpYyBpdGVtIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgaXNTZWxlY3RlZChkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uLmhhcyhkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gb2JzZXJ2YWJsZSBzcGVjaWZpY2FsbHkgZm9yIG5vdGlmeWluZyB0aGUgc3Vic2NyaWJlclxuICAgKiBvbmx5IHdoZW4gdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiBhIHNwZWNpZmljIG9iamVjdCBoYXMgY2hhbmdlZFxuICAgKi9cbiAgZ2V0U2VsZWN0aW9uU3RhdGUoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uJC5waXBlKG1hcCgoKSA9PiB0aGlzLmlzU2VsZWN0ZWQoZGF0YSkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgaG93IHNlbGVjdGlvbnMgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogVGhpcyBhbGxvd3MgdXMgdG8gdXNlIGFuIHN0cmF0ZWd5IHBhdHRlcm4gdG8gaGFuZGxlIHRoZSB2YXJpb3VzIGtleWJvYXJkXG4gICAqIGFuZCBtb3VzZSBpbnRlcmFjdGlvbnMgd2hpbGUga2VlcGluZyBlYWNoIG1vZGUgc2VwYXJhdGVkIGFuZFxuICAgKiBlYXNpbHkgZXh0ZW5zaWJsZSBpZiB3ZSB3YW50IHRvIGFkZCBtb3JlIG1vZGVzIGluIGZ1dHVyZSFcbiAgICovXG4gIHNldFN0cmF0ZWd5KG1vZGU6IFNlbGVjdGlvbk1vZGUgfCBTZWxlY3Rpb25TdHJhdGVneSk6IHZvaWQge1xuXG4gICAgaWYgKHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95KSB7XG4gICAgICAvLyBEZXN0cm95IHByZXZpb3VzIHN0cmF0ZWd5IGlmIGl0IHdhcyBjcmVhdGVkIGludGVybmFsbHlcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobW9kZSBpbnN0YW5jZW9mIFNlbGVjdGlvblN0cmF0ZWd5KSB7XG5cbiAgICAgIC8vIEN1c3RvbSBzdHJhdGVneSAtIHBhc3MgaW4gdGhlIHNlcnZpY2UgaW5zdGFuY2VcbiAgICAgIHRoaXMuc3RyYXRlZ3kgPSBtb2RlO1xuICAgICAgdGhpcy5zdHJhdGVneS5zZXRTZWxlY3Rpb25TZXJ2aWNlKHRoaXMpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgc3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkudHJpbSgpKSB7XG5cbiAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93JzpcbiAgICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gdGhpcy5fc3RyYXRlZ3lUb0Rlc3Ryb3kgPSBuZXcgUm93U2VsZWN0aW9uU3RyYXRlZ3kodGhpcyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncm93LWFsdCc6XG4gICAgICAgICAgdGhpcy5zdHJhdGVneSA9IHRoaXMuX3N0cmF0ZWd5VG9EZXN0cm95ID0gbmV3IFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5KHRoaXMpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0aW9uIG1vZGUgJyR7bW9kZX0nIGRvZXMgbm90IGV4aXN0LiBWYWxpZCBtb2RlcyBhcmUgJ3NpbXBsZScsICdyb3cnLCBvciAncm93LWFsdCcuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgKi9cbiAgYWN0aXZhdGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gZGF0YTtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZlIGFsbCBpdGVtc1xuICAgKi9cbiAgZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRoaXMuX2FjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG9yIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgYWN0aXZlIGl0ZW0uXG4gICAqIEBwYXJhbSBwcmV2aW91cyBJZiB0cnVlLCB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0U2libGluZyhwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcblxuICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY3VycmVudCBhY3RpdmUgaXRlbVxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBpdGVtXG4gICAgY29uc3QgaWR4ID0gdGhpcy5kYXRhc2V0LmluZGV4T2YodGhpcy5fYWN0aXZlKTtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGFzZXRbcHJldmlvdXMgPyBpZHggLSAxIDogaWR4ICsgMV07XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIHRoZSBzaWJsaW5nIG9mIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgKiBJZiBwcmV2aW91cyBpcyBzZXQgdG8gdHJ1ZSB0aGUgcHJldmlvdXMgc2libGluZyB3aWxsIGJlIGFjdGl2YXRlZFxuICAgKiByYXRoZXIgdGhhbiB0aGUgbmV4dCBzaWJsaW5nLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyByZXR1cm4gdGhlXG4gICAqIGRhdGEgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCBzaWJsaW5nXG4gICAqL1xuICBhY3RpdmF0ZVNpYmxpbmcocHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldFNpYmxpbmcocHJldmlvdXMpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKHRhcmdldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgZGlzYWJsZWQgc3RhdGVcbiAgICB0aGlzLmlzRW5hYmxlZCA9ICFkaXNhYmxlZDtcblxuICAgIC8vIGNsZWFyIGFueSBzdGF0ZWZ1bCBkYXRhXG4gICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZSQubmV4dCh0aGlzLl9hY3RpdmUpO1xuICAgIHRoaXMuX3NlbGVjdGlvbi5jbGVhcigpO1xuXG4gICAgLy8gZW1pdCB0aGUgc2VsZWN0aW9uIGNoYW5nZSBpbmZvcm1hdGlvblxuICAgIHRoaXMuc2VsZWN0aW9uSGFzTXV0YXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3Rpb25IYXNNdXRhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uJC5uZXh0KEFycmF5LmZyb20odGhpcy5fc2VsZWN0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEZpcnN0SXRlbUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZvY3VzJC5uZXh0KHRoaXMuX2RhdGFzZXRbMF0pO1xuICAgICAgdGhpcy5fYWN0aXZlID0gdGhpcy5fZGF0YXNldFswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aXZlID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW1wbGUnIHwgJ3JvdycgfCAncm93LWFsdCc7Il19