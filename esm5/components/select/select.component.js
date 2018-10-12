/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, delay, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TagInputComponent } from '../tag-input/index';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
var /** @type {?} */ uniqueId = 0;
export var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = /** @class */ (function () {
    function SelectComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = "ux-select-" + ++uniqueId;
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = function (_) { };
        this._value$ = new BehaviorSubject(null);
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._onDestroy = new Subject();
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "input", {
        get: /**
         * @return {?}
         */
        function () {
            return this._input$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._input$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropdownOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dropdownOpen = value;
            this.dropdownOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(function (value) {
            _this.valueChange.emit(value);
            _this.propagateChange(value);
        });
        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(function (value) {
            _this.inputChange.emit(value);
        });
        // Changes to the input field
        this._input$.pipe(takeUntil(this._onDestroy), filter(function (value) { return _this.allowNull; }), filter(function (value) { return !_this.multiple && value !== _this.getDisplay(_this.value); })).subscribe(function (value) { return _this.value = null; });
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(function (input) { return !_this.multiple && input === _this.getDisplay(_this.value) ? '' : input; }), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        this.filter$.pipe(takeUntil(this._onDestroy), filter(function (value) { return value && value.length > 0; })).subscribe(function () { return _this.dropdownOpen = true; });
        // Update the single-select input when the model changes
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(), delay(0), filter(function (value) { return value !== null && !_this.multiple; })).subscribe(function (value) {
            _this.input = _this.getDisplay(value);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["multiple"] && !changes["multiple"].firstChange && changes["multiple"].currentValue !== changes["multiple"].previousValue) {
            this.input = '';
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onfocus = /**
     * @return {?}
     */
    function () {
        if (this.singleInput) {
            this.singleInput.nativeElement.focus();
        }
        else if (this.tagInput) {
            this.tagInput.focus();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj !== undefined && obj !== this.value) {
            this.value = obj;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputClickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectInputText();
        this.dropdownOpen = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputBlurHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // If a click on the typeahead is in progress, just refocus the input.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.singleTypeahead && this.singleTypeahead.clicking) {
            this.singleInput.nativeElement.focus();
            return;
        }
        // Close dropdown and reset text input if focus is lost
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.dropdownOpen = false;
                if (!_this.multiple) {
                    _this.input = _this.getDisplay(_this.value);
                }
            }
        }, 200);
    };
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     */
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputKeyHandler = /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);
        switch (event.key) {
            case 'Enter':
                if (this._dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                }
                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.singleOptionSelected = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    };
    /**
     * Returns the display value of the given option.
     */
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getDisplay = /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.selectInputText = /**
     * @return {?}
     */
    function () {
        this.singleInput.nativeElement.select();
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select',
                    template: "<ux-tag-input *ngIf=\"multiple\"\r\n    #tagInput=\"ux-tag-input\"\r\n    [id]=\"id + '-input'\"\r\n    [(tags)]=\"value\"\r\n    [(input)]=\"input\"\r\n    [addOnPaste]=\"false\"\r\n    [disabled]=\"disabled\"\r\n    [display]=\"display\"\r\n    [freeInput]=\"false\"\r\n    [placeholder]=\"placeholder\"\r\n    [showTypeaheadOnClick]=\"true\">\r\n\r\n    <ux-typeahead #multipleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [disabledOptions]=\"value\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"true\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\">\r\n    </ux-typeahead>\r\n\r\n</ux-tag-input>\r\n\r\n<div *ngIf=\"!multiple\"\r\n    class=\"inner-addon right-addon\"\r\n    [class.disabled]=\"disabled\"\r\n    role=\"combobox\"\r\n    [attr.aria-expanded]=\"dropdownOpen\"\r\n    aria-haspopup=\"listbox\">\r\n\r\n    <i class=\"hpe-icon\"\r\n        [class.hpe-down]=\"dropDirection === 'down'\"\r\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\r\n\r\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\r\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\r\n        aria-autocomplete=\"list\"\r\n        [attr.aria-controls]=\"singleTypeahead.id\"\r\n        aria-multiline=\"false\"\r\n        [(ngModel)]=\"input\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        (click)=\"inputClickHandler($event)\"\r\n        (blur)=\"inputBlurHandler($event)\"\r\n        (keydown)=\"inputKeyHandler($event)\">\r\n\r\n    <ux-typeahead #singleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"false\"\r\n        [openOnFilterChange]=\"false\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\"\r\n        (optionSelected)=\"singleOptionSelected($event)\"\r\n        (highlightedElementChange)=\"highlightedElement = $event\">\r\n    </ux-typeahead>\r\n\r\n</div>\r\n",
                    providers: [SELECT_VALUE_ACCESSOR],
                    host: {
                        'tabindex': '0'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: TypeaheadKeyService }
    ]; };
    SelectComponent.propDecorators = {
        id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
        value: [{ type: Input }],
        input: [{ type: Input }],
        dropdownOpen: [{ type: Input }],
        options: [{ type: Input }],
        display: [{ type: Input }],
        key: [{ type: Input }],
        allowNull: [{ type: Input }],
        disabled: [{ type: Input }],
        dropDirection: [{ type: Input }],
        maxHeight: [{ type: Input }],
        multiple: [{ type: Input }],
        pageSize: [{ type: Input }],
        placeholder: [{ type: Input }],
        loadingTemplate: [{ type: Input }],
        noOptionsTemplate: [{ type: Input }],
        optionTemplate: [{ type: Input }],
        valueChange: [{ type: Output }],
        inputChange: [{ type: Output }],
        dropdownOpenChange: [{ type: Output }],
        singleInput: [{ type: ViewChild, args: ['singleInput',] }],
        tagInput: [{ type: ViewChild, args: ['tagInput',] }],
        multipleTypeahead: [{ type: ViewChild, args: ['multipleTypeahead',] }],
        singleTypeahead: [{ type: ViewChild, args: ['singleTypeahead',] }],
        onfocus: [{ type: HostListener, args: ['focus',] }]
    };
    return SelectComponent;
}());
export { SelectComponent };
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectComponent.prototype.id;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.display;
    /** @type {?} */
    SelectComponent.prototype.key;
    /** @type {?} */
    SelectComponent.prototype.allowNull;
    /** @type {?} */
    SelectComponent.prototype.disabled;
    /** @type {?} */
    SelectComponent.prototype.dropDirection;
    /** @type {?} */
    SelectComponent.prototype.maxHeight;
    /** @type {?} */
    SelectComponent.prototype.multiple;
    /** @type {?} */
    SelectComponent.prototype.pageSize;
    /** @type {?} */
    SelectComponent.prototype.placeholder;
    /** @type {?} */
    SelectComponent.prototype.loadingTemplate;
    /** @type {?} */
    SelectComponent.prototype.noOptionsTemplate;
    /** @type {?} */
    SelectComponent.prototype.optionTemplate;
    /** @type {?} */
    SelectComponent.prototype.valueChange;
    /** @type {?} */
    SelectComponent.prototype.inputChange;
    /** @type {?} */
    SelectComponent.prototype.dropdownOpenChange;
    /** @type {?} */
    SelectComponent.prototype.singleInput;
    /** @type {?} */
    SelectComponent.prototype.tagInput;
    /** @type {?} */
    SelectComponent.prototype.multipleTypeahead;
    /** @type {?} */
    SelectComponent.prototype.singleTypeahead;
    /** @type {?} */
    SelectComponent.prototype.highlightedElement;
    /** @type {?} */
    SelectComponent.prototype.filter$;
    /** @type {?} */
    SelectComponent.prototype.propagateChange;
    /** @type {?} */
    SelectComponent.prototype._value$;
    /** @type {?} */
    SelectComponent.prototype._input$;
    /** @type {?} */
    SelectComponent.prototype._dropdownOpen;
    /** @type {?} */
    SelectComponent.prototype._onDestroy;
    /** @type {?} */
    SelectComponent.prototype._element;
    /** @type {?} */
    SelectComponent.prototype._document;
    /** @type {?} */
    SelectComponent.prototype._typeaheadKeyService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbkcscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQixNQUFNLENBQUMscUJBQU0scUJBQXFCLEdBQW1CO0lBQ2pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBd0VFLHlCQUNZLFVBQ2tCLFNBQWMsRUFDaEM7UUFGQSxhQUFRLEdBQVIs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LEtBQUs7d0JBUUwsS0FBSzsrQkFRTCxLQUFLOzBCQVNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7a0NBRUwsS0FBSztvQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBRUwsTUFBTTs4QkFDTixNQUFNO3FDQUNOLE1BQU07OEJBRU4sU0FBUyxTQUFDLGFBQWE7MkJBQ3ZCLFNBQVMsU0FBQyxVQUFVO29DQUNwQixTQUFTLFNBQUMsbUJBQW1CO2tDQUM3QixTQUFTLFNBQUMsaUJBQWlCOzBCQXFFM0IsWUFBWSxTQUFDLE9BQU87OzBCQW5KekI7O1NBMkJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFN0YXRpY1Byb3ZpZGVyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkZWxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UsIFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBTdGF0aWNQcm92aWRlciA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC1zZWxlY3QtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBpbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXQkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dCQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkcm9wZG93bk9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9kcm9wZG93bk9wZW4gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBkcm9wZG93bk9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duT3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYWxsb3dOdWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlSW5wdXQnKSBzaW5nbGVJbnB1dDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3RhZ0lucHV0JykgdGFnSW5wdXQ6IFRhZ0lucHV0Q29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnbXVsdGlwbGVUeXBlYWhlYWQnKSBtdWx0aXBsZVR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlVHlwZWFoZWFkJykgc2luZ2xlVHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcblxyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGZpbHRlciQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICAgIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICBwcml2YXRlIF9pbnB1dCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG4gICAgcHJpdmF0ZSBfZHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIF90eXBlYWhlYWRLZXlTZXJ2aWNlOiBUeXBlYWhlYWRLZXlTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgLy8gRW1pdCBjaGFuZ2UgZXZlbnRzXHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5wdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZXMgdG8gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgdGhpcy5faW5wdXQkLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdGhpcy5hbGxvd051bGwpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gIXRoaXMubXVsdGlwbGUgJiYgdmFsdWUgIT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnZhbHVlID0gbnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCBmaWx0ZXIgZnJvbSBpbnB1dFxyXG4gICAgICAgIHRoaXMuZmlsdGVyJCA9IHRoaXMuX2lucHV0JC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoaW5wdXQgPT4gIXRoaXMubXVsdGlwbGUgJiYgaW5wdXQgPT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSA/ICcnIDogaW5wdXQpLFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIHdoZW4gZmlsdGVyIGlzIG5vbmVtcHR5LlxyXG4gICAgICAgIHRoaXMuZmlsdGVyJC5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzaW5nbGUtc2VsZWN0IGlucHV0IHdoZW4gdGhlIG1vZGVsIGNoYW5nZXNcclxuICAgICAgICB0aGlzLl92YWx1ZSQucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXHJcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgIGRlbGF5KDApLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09IG51bGwgJiYgIXRoaXMubXVsdGlwbGUpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5nZXREaXNwbGF5KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMubXVsdGlwbGUgJiYgIWNoYW5nZXMubXVsdGlwbGUuZmlyc3RDaGFuZ2UgJiYgY2hhbmdlcy5tdWx0aXBsZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMubXVsdGlwbGUucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gICAgb25mb2N1cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaW5nbGVJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFnSW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdJbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dFRleHQoKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRCbHVySGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgYSBjbGljayBvbiB0aGUgdHlwZWFoZWFkIGlzIGluIHByb2dyZXNzLCBqdXN0IHJlZm9jdXMgdGhlIGlucHV0LlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZVR5cGVhaGVhZCAmJiB0aGlzLnNpbmdsZVR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgZHJvcGRvd24gYW5kIHJlc2V0IHRleHQgaW5wdXQgaWYgZm9jdXMgaXMgbG9zdFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2V5IGhhbmRsZXIgZm9yIHNpbmdsZSBzZWxlY3Qgb25seS4gTXVsdGlwbGUgc2VsZWN0IGtleSBoYW5kbGluZyBpcyBpbiBUYWdJbnB1dENvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgaW5wdXRLZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFN0YW5kYXJkIGtleXMgZm9yIHR5cGVhaGVhZCAodXAvZG93bi9lc2MpXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMuc2luZ2xlVHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Ryb3Bkb3duT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGFzIHRoZSB2YWx1ZSBhbmQgY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zaW5nbGVUeXBlYWhlYWQuaGlnaGxpZ2h0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGlucHV0IGZpZWxkLiBJZiBkcm9wZG93biBpc24ndCBvcGVuIHRoZW4gcmVzZXQgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2luZ2xlT3B0aW9uU2VsZWN0ZWQoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50Lm9wdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQub3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG9wdGlvbiA9PT0gbnVsbCB8fCBvcHRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0SW5wdXRUZXh0KCkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3QoKTtcclxuICAgIH1cclxufSJdfQ==