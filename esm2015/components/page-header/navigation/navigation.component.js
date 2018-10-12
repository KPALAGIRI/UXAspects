/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ResizeService } from '../../../directives/resize/index';
import { PageHeaderService } from '../page-header.service';
import { PageHeaderNavigationItemComponent } from './navigation-item/navigation-item.component';
export class PageHeaderNavigationComponent {
    /**
     * @param {?} elementRef
     * @param {?} resizeService
     * @param {?} _pageHeaderService
     */
    constructor(elementRef, resizeService, _pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.items$ = this._pageHeaderService.items$;
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        this._subscription = new Subscription();
        this._subscription.add(resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.selected$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.secondary$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateSelectedIndicator();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    updateSelectedIndicator() {
        setTimeout(() => {
            // find the selected item
            const /** @type {?} */ selected = this.menuItems.find(item => item.item.selected);
            // determine whether or not to show the indicator
            this.indicatorVisible = !!selected;
            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                const /** @type {?} */ styles = getComputedStyle(selected.elementRef.nativeElement);
                this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }
}
PageHeaderNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation',
                template: "<ux-page-header-horizontal-navigation-item\r\n    *ngFor=\"let item of items$ | async\"\r\n    [item]=\"item\">\r\n</ux-page-header-horizontal-navigation-item>\r\n\r\n<div class=\"selected-indicator\"\r\n    [style.opacity]=\"indicatorVisible ? 1 : 0\"\r\n    [style.margin-left.px]=\"indicatorX\"\r\n    [style.width.px]=\"indicatorWidth\">\r\n</div>",
                host: {
                    'role': 'menubar'
                }
            }] }
];
/** @nocollapse */
PageHeaderNavigationComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: PageHeaderService }
];
PageHeaderNavigationComponent.propDecorators = {
    menuItems: [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] }]
};
function PageHeaderNavigationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.menuItems;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.items$;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorVisible;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorX;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype.indicatorWidth;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationComponent.prototype._pageHeaderService;
}
/**
 * @record
 */
export function PageHeaderNavigationItem() { }
function PageHeaderNavigationItem_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.icon;
    /** @type {?} */
    PageHeaderNavigationItem.prototype.title;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.selected;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.routerLink;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.routerExtras;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.select;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.children;
    /** @type {?|undefined} */
    PageHeaderNavigationItem.prototype.parent;
}
/**
 * @record
 */
export function PageHeaderNavigationDropdownItem() { }
function PageHeaderNavigationDropdownItem_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationDropdownItem.prototype.title;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.selected;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.routerLink;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.routerExtras;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.select;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.children;
    /** @type {?|undefined} */
    PageHeaderNavigationDropdownItem.prototype.parent;
}
/**
 * @record
 */
export function PageHeaderSecondaryNavigationItem() { }
function PageHeaderSecondaryNavigationItem_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdlLWhlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQVNoRyxNQUFNOzs7Ozs7SUFXRixZQUFZLFVBQXNCLEVBQUUsYUFBNEIsRUFBVSxrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtzQkFQekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU07Z0NBQ3hELEtBQUs7MEJBQ1osQ0FBQzs4QkFDRyxDQUFDOzZCQUVGLElBQUksWUFBWSxFQUFFO1FBR3RDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekk7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7S0FDbEM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELHVCQUF1QjtRQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFOztZQUVaLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBR2pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDOztZQUduQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNYLHVCQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDcEU7U0FDSixDQUFDLENBQUM7S0FDTjs7O1lBaERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCwyV0FBMEM7Z0JBQzFDLElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsU0FBUztpQkFDcEI7YUFDSjs7OztZQWZrQyxVQUFVO1lBS3BDLGFBQWE7WUFDUyxpQkFBaUI7Ozt3QkFZM0MsWUFBWSxTQUFDLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbiwgUGFnZUhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9wYWdlLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXBhZ2UtaGVhZGVyLWhvcml6b250YWwtbmF2aWdhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3JvbGUnOiAnbWVudWJhcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGRyZW4oUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50KSBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQ+O1xuXG4gICAgaXRlbXMkOiBCZWhhdmlvclN1YmplY3Q8UGFnZUhlYWRlck5hdmlnYXRpb25JdGVtW10+ID0gdGhpcy5fcGFnZUhlYWRlclNlcnZpY2UuaXRlbXMkO1xuICAgIGluZGljYXRvclZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpbmRpY2F0b3JYOiBudW1iZXIgPSAwO1xuICAgIGluZGljYXRvcldpZHRoOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVzaXplU2VydmljZTogUmVzaXplU2VydmljZSwgcHJpdmF0ZSBfcGFnZUhlYWRlclNlcnZpY2U6IFBhZ2VIZWFkZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQocmVzaXplU2VydmljZS5hZGRSZXNpemVMaXN0ZW5lcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVNlbGVjdGVkSW5kaWNhdG9yLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChfcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHRoaXMudXBkYXRlU2VsZWN0ZWRJbmRpY2F0b3IuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKF9wYWdlSGVhZGVyU2VydmljZS5zZWNvbmRhcnkkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHRoaXMudXBkYXRlU2VsZWN0ZWRJbmRpY2F0b3IuYmluZCh0aGlzKSkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZEluZGljYXRvcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3RlZEluZGljYXRvcigpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMubWVudUl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLml0ZW0uc2VsZWN0ZWQpO1xuXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gc2hvdyB0aGUgaW5kaWNhdG9yXG4gICAgICAgICAgICB0aGlzLmluZGljYXRvclZpc2libGUgPSAhIXNlbGVjdGVkO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHdpZHRoIG9mIHRoZSBpbmRpY2F0b3IgdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc2VsZWN0ZWQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yWCA9IHNlbGVjdGVkLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yV2lkdGggPSBwYXJzZUludChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbSB7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgICByb3V0ZXJMaW5rPzogc3RyaW5nIHwgYW55W107XG4gICAgcm91dGVyRXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcztcbiAgICBzZWxlY3Q/OiAoaXRlbTogUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtKSA9PiB2b2lkO1xuICAgIGNoaWxkcmVuPzogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1bXTtcbiAgICBwYXJlbnQ/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgcm91dGVyTGluaz86IHN0cmluZyB8IGFueVtdO1xuICAgIHJvdXRlckV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXM7XG4gICAgc2VsZWN0PzogKGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKSA9PiB2b2lkO1xuICAgIGNoaWxkcmVuPzogUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1bXTtcbiAgICBwYXJlbnQ/OiBQYWdlSGVhZGVyTmF2aWdhdGlvbjtcbn1cblxuLy8gVGhpcyBpcyBhbiBhbGlhcyBmb3IgTUYgdXNlIGFzIFwiRHJvcGRvd25JdGVtXCIgZG9lc24ndCBtYWtlIHNlbnNlIGluIGNvbnRleHQgd2l0aCBob3cgaXQgaXMgdXNlZFxuZXhwb3J0IGludGVyZmFjZSBQYWdlSGVhZGVyU2Vjb25kYXJ5TmF2aWdhdGlvbkl0ZW0gZXh0ZW5kcyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSB7IH0iXX0=