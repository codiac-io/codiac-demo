import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, AfterContentInit } from '@angular/core';
import { List } from 'immutable';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'drag-drop-select',
  templateUrl: 'drag-drop-select.component.html',
  styleUrls: [
    'drag-drop-select.component.scss'
  ],
  encapsulation: ViewEncapsulation.Emulated,
  // providers: [DragulaService] // this will create a new instance of the dragula service per instance of this component.
})
export class DragDropSelectComponent { //implements OnInit, AfterViewInit, OnDestroy

  // // All inputs are optional (though you should probably at least provide 'availableData')
  // @Input() entitiesShortDescription: string; // pluralized description for the list of entities - will be displayed in the GUI
  // @Input() displaySelectedUsing: (entity: any) => any = (entity: any) => entity.toString(); // function that returns a value that will then be displayed for each entity
  // @Input() displayAvailableUsing: (entity: any) => any = (entity: any) => entity.toString();
  // @Input() filterSelectedUsing: (entity: any, filterBy: string) => boolean; // predicate that determines if an item will be displayed or not - if not provided the GUI will not show the filter fields
  // @Input() filterAvailableUsing: (entity: any, filterBy: string) => boolean;
  // @Input() sortSelectedUsing: (entity: any) => any; // function that returns a value that will be used to sort each entity
  // @Input() sortAvailableUsing: (entity: any) => any;
  // @Input() sortDescription: string;
  // @Input() checkUniqueSelectionUsing: (entity: any) => any; // function that returns a value that will be used to enforce a unique selection in the selected list (usually the primary key of the available object). If left null, no check will be done
  // @Input() mapPropertiesUsing: (entity: any) => any; // map properties from available object to selected object - if nothing provided, object will be shallowly cloned
  // @Input() trackChanges: boolean = false; // if set to true, changes (none, added, modified, deleted) will be tracked - the selected entities should implement ChangedInterface
  // @Input() itemsActionable: boolean = false; // if set to true, will display a button for each selected record. When clicked will emit an action event
  // @Input() multiSelectEnabled: boolean = false; // if set to true, will display a checkbox for each selected/available record & allow for actions to be performed on multiple records at a time

  // // A configuration object that set the sorting type (both use numeric values) and what property sorting values will be saved to
  // // If provided, manual sort overrides anything specified for the selected sorting
  // @Input() set manualSortOptions(args: any) {
  //   if (!args || !args.sortType || !args.sortPropertyName) {
  //     return;
  //   }
  //   if (args.sortType === 'none' || args.sortType === 'indexed' || args.sortType === 'decimal') {
  //     this.manualSortType = args.sortType;
  //   }
  //   this.manualSortPropertyName = args.sortPropertyName;
  // };

  // // Only needed when you want to track changes
  // @Input() set originalData(data: List<any>) {
  //   this.originalDataSelected = data;
  // }

  // @Input() set selectedData(data: List<any>) {
  //   this.dataSelected = data;

  //   // Get selected data to verify it is valid
  //   let selectedData = this.dataSelected;
  //   // Make sure if track changes is enabled that all objects have a 'change' property
  //   if (this.trackChanges) {
  //     selectedData.forEach(entity => {
  //       if (!entity.hasOwnProperty('change')) {
  //         entity['change'] = ChangeType.none;
  //       }
  //     });
  //     selectedData = selectedData.map(x => x).toList();
  //   }

  //   // Make sure if multi select is enabled that all objects have a 'selected' & 'key' property
  //   if (this.multiSelectEnabled) {
  //     let key = 0;
  //     selectedData.forEach(entity => {
  //       entity['selected'] = false;
  //       entity['key'] = key;
  //       key++;
  //     });
  //     selectedData = selectedData.map(x => x).toList();
  //   }

  //   // If sorting is manual, checked is sort values are valid
  //   if (this.manualSortType !== 'none' && !this.sortValuesValid(selectedData)) {
  //     this.resetSortValues(selectedData);
  //     selectedData = selectedData.map(x => x).toList();
  //   }
  //   // If sorting is manual, sort intial data set and update original data
  //   if (this.manualSortType !== 'none') {
  //     selectedData = this.sort(selectedData, (entity: any) => entity[this.manualSortPropertyName]);
  //   }

  //   this.setSelected(selectedData);
  //   // Only update the original selected data if it was the same as the current selected data list
  //   if (this.originalDataSelected === this.dataSelected) {
  //     this.originalDataSelected = selectedData;
  //   }
  // }

  // @Input() set availableData(data: List<any>) {
  //   this.dataAvailable = data;

  //   // Make sure if multi select is enabled that all objects have a 'selected' & 'key' property
  //   if (this.multiSelectEnabled) {
  //     let key = 0;
  //     this.dataAvailable.forEach(entity => {
  //       // entity['selected'] = false;
  //       // entity['key'] = key;
  //       // key++;
  //     });
  //     this.dataAvailable = this.dataAvailable.map(x => x).toList();
  //   }

  //   this.available.next(this.dataAvailable);
  // }

  // @Output() itemActioned: EventEmitter<any> = new EventEmitter(); // event emitted when item action button clicked
  // @Output() itemSelected: EventEmitter<any> = new EventEmitter(); // after successful drop, the selected item is emitted
  // @Output() itemDeleted: EventEmitter<any> = new EventEmitter(); //  event emitted when item delete button clicked
  // @Output() selectedChanged: EventEmitter<List<any>> = new EventEmitter(); // after successful drop, the new selected list is emitted

  // private selected: BehaviorSubject<List<any>> = new BehaviorSubject(List([]));
  // private available: BehaviorSubject<List<any>> = new BehaviorSubject(List([]));
  // private availableFiltered: BehaviorSubject<List<any>> = new BehaviorSubject(List([]));
  // private selectedFiltered: BehaviorSubject<List<any>> = new BehaviorSubject(List([]));
  // private sortDescendingSelected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // private sortDescendingAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // private destroy$ = new Subject();

  // public get selectedAll$(): Observable<List<any>> { // not filtered
  //   return this.selected.asObservable();
  // }


  // public get availableFiltered$(): Observable<List<any>> {
  //   return this.availableFiltered.asObservable();
  // }

  // public get selectedFiltered$(): Observable<List<any>> {
  //   return this.selectedFiltered.asObservable();
  // }

  // public get selectedHasChanges$(): Observable<boolean> {
  //   return this.selected.asObservable()
  //     .pipe(map(entities => {
  //       return this.trackChanges && entities.some(x => x.change != ChangeType.none);
  //     }));
  // }

  // public get selectedRecordsSelected$(): Observable<number> {
  //   return this.selectedFiltered.asObservable()
  //     .pipe(map(entities => {
  //       return entities.filter(x => x.selected == true).toList().count();
  //     }));
  // }

  // public get availableRecordsSelected$(): Observable<number> {
  //   return this.availableFiltered.asObservable()
  //     .pipe(map(entities => {
  //       return entities.filter(x => x.selected == true).toList().count();
  //     }));
  // }

  // public get sortDescendingSelected$(): Observable<boolean> {
  //   return this.sortDescendingSelected.asObservable();
  // }

  // public get sortDescendingAvailable$(): Observable<boolean> {
  //   return this.sortDescendingAvailable.asObservable();
  // }

  // public originalDataSelected: List<any> = List([]); // Used to determine if there are changes to the current selected list
  // public dataSelected: List<any> = List([]); // This gives the setter something to compare against so change detection doesn't go crazy
  // public dataAvailable: List<any> = List([]);
  // public emitChanges: boolean = true;
  // public manualSortType: string = 'none';
  // public manualSortPropertyName: string;

  // public filterSelectedControl = new FormControl();
  // public filterSelectedHidden: boolean = false;
  // public filterAvailableControl = new FormControl();
  // public filterAvailableHidden: boolean = false;

  // public selectAllAvailableControl = new FormControl();
  // public selectAllSelectedControl = new FormControl();


  // constructor(
  //   private dragulaService: DragulaService,
  // ) {
  //   dragulaService.drop().pipe(takeUntil(this.destroy$)).subscribe((value: any) => {
  //     console.log(value);
  //     if (value[0] && value[1] && value[2] && value[3]) {
  //       if (value[0] === 'generic-bag') {
  //         this.onDrop(value[1], value[2], value[3], value[4]);
  //       }
  //     }
  //   });
  // }

  // public ngOnInit() {
  //   this.selected
  //     .asObservable()
  //     .pipe(map(entities => {
  //       if (this.trackChanges) {
  //         return entities.filter(entity => entity.change !== ChangeType.deleted).toList();
  //       }
  //       else {
  //         return entities;
  //       }
  //     }))
  //     .pipe(combineLatest([
  //       this.filterSelectedControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()),
  //       this.sortDescendingSelected$],
  //       (d, f, s) => {
  //         if (f && f.length > 0 && this.filterSelectedUsing) {
  //           d = d.filter(entity => this.filterSelectedUsing(entity, f)).toList();
  //         }
  //         if (this.manualSortType === 'none') {
  //           d = this.sort(d.toList(), this.sortSelectedUsing, s);
  //         }
  //         return d;
  //       }
  //     ))
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(data => this.selectedFiltered.next(data));

  //   this.available
  //     .asObservable()
  //     .pipe(combineLatest([
  //       this.filterAvailableControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()),
  //       this.sortDescendingAvailable$],
  //       (d, f, s) => {
  //         if (f && f.length > 0 && this.filterAvailableUsing) {
  //           d = d.filter(entity => this.filterAvailableUsing(entity, f)).toList();
  //         }
  //         d = this.sort(d.toList(), this.sortAvailableUsing, s);
  //         return d; // sorting for available is done in the sort toggle function
  //       }
  //     ))
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(data => this.availableFiltered.next(data));

  //   this.selectedAll$.pipe(takeUntil(this.destroy$)).subscribe(data => {
  //     if (this.emitChanges) {
  //       this.selectedChanged.emit(data);
  //     }
  //   });

  //   this.filterSelectedHidden = this.filterSelectedUsing ? false : true;
  //   this.filterAvailableHidden = this.filterAvailableUsing ? false : true;

  //   this.selectAllAvailableControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
  //     if (val != undefined) {
  //       this.toggleSelectAllEntities(val, "right");
  //     }
  //   });

  //   this.selectAllSelectedControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
  //     if (val != undefined) {
  //       this.toggleSelectAllEntities(val, "left");
  //     }
  //   });

  //   // Configure drag and drop
  //   if (this.manualSortType === 'none') {
  //     this.dragulaService.createGroup('generic-bag', {
  //       copy: true,
  //       moves: (el, source) => {
  //         return this.hasClass(source, 'container-drag');
  //       },
  //       accepts: (el, target, source, sibling) => {
  //         if (target && source) {
  //           return this.hasClass(source, 'container-drag') && this.hasClass(target, 'container-drop');
  //         }
  //         return false;
  //       }
  //     });
  //   }
  //   else if (this.manualSortType === 'indexed' || this.manualSortType === 'decimal') {
  //     this.dragulaService.createGroup('generic-bag', {
  //       copy: (el, source) => {
  //         return source && this.hasClass(source, 'container-drag');
  //       },
  //       accepts: (el, target, source, sibling) => {
  //         if (target) {
  //           return this.hasClass(target, 'container-drop');
  //         }
  //         return false;
  //       }
  //     });
  //   }

  //   // this.selectedFiltered$.subscribe(x => console.log(x.toJS()));
  //   // this.selectedAll$.subscribe(x => console.log(x.toJS()));
  //   // this.selectedHasChanges$.subscribe(x => console.log(x));
  // }

  // public ngAfterViewInit() {
  //   this.filterSelectedControl.setValue(''); // Have to set the initial value of the form controls for combineLatest to emit the first value
  //   this.filterAvailableControl.setValue('');
  // }

  // public ngOnDestroy() {
  //   this.dragulaService.destroy('generic-bag');
  // }

  // private hasClass(el: any, name: string): any {
  //   return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  // }

  // private onDrop(el, target, source, sibling): void {
  //   let dropIndex = [].indexOf.call(el.parentNode.children, el);
  //   let entitiesSelected = this.selected.getValue();

  //   // Available object dropped in selected section
  //   if (this.hasClass(source, 'container-drag')) {
  //     let indexAvailable = parseInt(el.getAttribute('data-index'));
  //     let entityAvailable = this.availableFiltered.getValue().get(indexAvailable);

  //     let entitySelected;
  //     if (typeof (entityAvailable) !== "object") {
  //       entitySelected = entityAvailable;
  //     }
  //     else {
  //       entitySelected = this.mapPropertiesUsing ? this.mapPropertiesUsing(entityAvailable) : Object.assign({}, entityAvailable);
  //     }

  //     // Check if entity is already in the select list (only check if keyUniqueSelection provided)
  //     if (this.checkUniqueSelectionUsing) {
  //       let existingIndex;
  //       if (this.trackChanges) {
  //         existingIndex = entitiesSelected.filter(x => x.change !== ChangeType.deleted)
  //           .toList()
  //           .findIndex(entity => this.checkUniqueSelectionUsing(entity) === this.checkUniqueSelectionUsing(entitySelected));
  //       }
  //       else {
  //         existingIndex = entitiesSelected.findIndex(entity => this.checkUniqueSelectionUsing(entity) === this.checkUniqueSelectionUsing(entitySelected));
  //       }
  //       // If the entity does already exist...
  //       if (existingIndex !== -1) {
  //         //Remove the dropped element from the DOM and don't add the new dropped record
  //         el.parentNode.removeChild(el);
  //         return;
  //       }
  //     }

  //     // If multiselect is enabled, assign the selected entity a new key
  //     if (this.multiSelectEnabled) {
  //       let key = entitiesSelected.count() > 0 ? (Math.max(...entitiesSelected
  //         .map(x => x.key)
  //         .toArray()) + 1) : 0; // get next selected key value
  //       entitySelected.key = key;
  //     }

  //     // Some features aren't available to value types
  //     if (typeof (entityAvailable) !== "object") {
  //       // Add the new entity to the list and sort the list if a sort function was provided
  //       entitiesSelected = entitiesSelected.push(entitySelected);
  //     }
  //     else {
  //       if (this.trackChanges) {
  //         entitySelected['change'] = ChangeType.added; // will add the property if it doesn't exist
  //       }

  //       if (this.manualSortType === 'decimal' || this.manualSortType === 'indexed') {
  //         let activeEntities: List<any>;
  //         let deletedEntities: List<any>;
  //         if (this.trackChanges) {
  //           activeEntities = entitiesSelected.filter(x => x.change !== ChangeType.deleted).toList();
  //           deletedEntities = entitiesSelected.filter(x => x.change === ChangeType.deleted).toList();
  //         }
  //         else {
  //           activeEntities = entitiesSelected;
  //           deletedEntities = List([]);
  //         }

  //         if (this.manualSortType === 'decimal') {
  //           entitySelected[this.manualSortPropertyName] = this.getSortDecimalValue(null, dropIndex, activeEntities);
  //         }

  //         activeEntities = activeEntities.insert(dropIndex, entitySelected);

  //         if (this.manualSortType === 'indexed') {
  //           this.resetSortValues(activeEntities);
  //         }

  //         entitiesSelected = activeEntities.concat(deletedEntities).toList();
  //       }
  //       else {
  //         // Add the new entity to the list and sort the list if a sort function was provided
  //         entitiesSelected = entitiesSelected.push(entitySelected);
  //       }
  //     }

  //     el.parentNode.removeChild(el);
  //     this.selected.next(entitiesSelected);
  //     this.itemSelected.emit(entitySelected);
  //   }
  //   // Selected re-ordered via drag & drop
  //   else if (this.hasClass(source, 'container-drop')) {
  //     let originalIndex = parseInt(el.getAttribute('data-index'));
  //     if (originalIndex !== dropIndex) {
  //       let activeEntities: List<any>;
  //       let deletedEntities: List<any>;
  //       if (this.trackChanges) {
  //         activeEntities = entitiesSelected.filter(x => x.change !== ChangeType.deleted).toList();
  //         deletedEntities = entitiesSelected.filter(x => x.change === ChangeType.deleted).toList();
  //       }
  //       else {
  //         activeEntities = entitiesSelected;
  //         deletedEntities = List([]);
  //       }

  //       let item = activeEntities.get(originalIndex);

  //       if (this.manualSortType === 'decimal') {
  //         item[this.manualSortPropertyName] = this.getSortDecimalValue(originalIndex, dropIndex, activeEntities);

  //         if (this.trackChanges) {
  //           if (item.change !== ChangeType.added) {
  //             item.change = ChangeType.modified;
  //           }
  //         }
  //       }

  //       activeEntities = activeEntities.delete(originalIndex);
  //       activeEntities = activeEntities.insert(dropIndex, item);

  //       if (this.manualSortType === 'indexed') {
  //         this.resetSortValues(activeEntities);
  //       }

  //       entitiesSelected = activeEntities.concat(deletedEntities).toList();
  //     }
  //     else {
  //       return;
  //     }
  //     this.selected.next(entitiesSelected);
  //   }
  // }

  // private sort(entities: List<any>, sortUsing: (entity: any) => any, desc: boolean = false): List<any> {
  //   if (sortUsing) {
  //     return entities.sort((a, b) => {
  //       if (this.sortValue(sortUsing, a) > this.sortValue(sortUsing, b)) return (desc ? -1 : 1);
  //       if (this.sortValue(sortUsing, a) < this.sortValue(sortUsing, b)) return (desc ? 1 : -1);
  //       return 0;
  //     }).toList();
  //   }
  //   else {
  //     return entities;
  //   }
  // }

  // private sortValue(sortUsing, value) {
  //   value = sortUsing(value);
  //   if (isNaN(value)) {
  //     return value.toString().toLowerCase();
  //   }
  //   else {
  //     return value;
  //   }
  // }

  // private setSelected(list: List<any>) {
  //   this.emitChanges = false;
  //   this.selected.next(list);
  //   setTimeout(() => {
  //     this.emitChanges = true;
  //   }, 100);
  // }

  // public deleteEntity(entity: any) {
  //   let entities = this.selected.getValue();
  //   let entityIndex = entities.toJS().indexOf(entity);

  //   if (this.trackChanges) {
  //     if (entity.change === ChangeType.added) {
  //       entities = entities.delete(entityIndex);
  //     }
  //     else {
  //       entity.change = ChangeType.deleted;
  //       entities = entities.map(x => x).toList();
  //     }
  //   }
  //   else {
  //     entities = entities.delete(entityIndex);
  //   }

  //   this.selected.next(entities);
  //   this.itemDeleted.emit(entity);
  // }


  // // Multiselect actions
  // public deleteAllSelected() {
  //   let entities = this.selected.getValue();
  //   let selectedEntities = entities.filter(x => x.selected == true).toList();

  //   selectedEntities.forEach(x => {
  //     this.deleteEntity(x);
  //     x.selected = false;
  //   });

  //   this.selectAllSelectedControl.setValue(false, { emitEvent: false });
  // }

  // public addAllSelected() {
  //   let availableEntities = this.available.getValue();
  //   let selectedEntities = this.selected.getValue();
  //   let selectedAvailableEntities = availableEntities
  //     .filter(x => x.selected == true)
  //     .map(x => Object.assign({}, x)) // remove reference to available entities
  //     .toList();

  //   let key = selectedEntities.count() > 0 ? (Math.max(...selectedEntities
  //     .map(x => x.key)
  //     .toArray()) + 1) : 0; // get next selected key value
  //   selectedAvailableEntities.forEach(x => {
  //     if (this.isUniqueSelection(selectedEntities, x)) {
  //       selectedEntities = selectedEntities.push(x);
  //       if (this.trackChanges) {
  //         x.change = ChangeType.added;
  //       }
  //       this.itemSelected.emit(x);
  //     }
  //     x.selected = false;
  //     x.key = key;
  //     key++;
  //   });

  //   // Clear checkboxes
  //   availableEntities.forEach(x => {
  //     if (x.selected == true) {
  //       x.selected = false;
  //     }
  //   });

  //   if (selectedEntities !== this.selected.getValue()) {
  //     this.selected.next(selectedEntities);
  //   }
  //   this.selectAllAvailableControl.setValue(false, { emitEvent: false });
  // }

  // public toggleEntitySelected(entity: any, pane: string) {
  //   this.emitChanges = false;
  //   let entities = pane == "left" ? this.selected.getValue() : this.available.getValue();

  //   // Clone list so that changes made in one pane don't affect the other
  //   entities = entities.map(x => Object.assign({}, x)).toList();
  //   let selectedEntity = entities.filter(x => x.key == entity.key).first();

  //   if (selectedEntity.selected) {
  //     selectedEntity.selected = false;
  //   }
  //   else {
  //     selectedEntity.selected = true;
  //   }

  //   pane == "left" ? this.selected.next(entities) : this.available.next(entities);

  //   setTimeout(() => {
  //     this.emitChanges = true;
  //   }, 100);
  // }

  // private toggleSelectAllEntities(val: any, pane: string) {
  //   this.emitChanges = false;
  //   let filteredEntities = pane == "left" ? this.selectedFiltered.getValue() : this.availableFiltered.getValue();
  //   let filteredEntityKeys = filteredEntities.map(x => x.key).toList();

  //   let entities = pane == "left" ? this.selected.getValue() : this.available.getValue();
  //   entities = entities.map(x => Object.assign({}, x)).toList(); // clone to apply changes to correct pane

  //   entities
  //     .filter(x => filteredEntityKeys.contains(x.key))
  //     .forEach(x => {
  //       // Not sure why, but until I put in this check unselect all wasn't working
  //       if (x.selected != val) {
  //         x.selected = val
  //       }
  //     });

  //   pane == "left" ? this.selected.next(entities) : this.available.next(entities);

  //   setTimeout(() => {
  //     this.emitChanges = true;
  //   }, 100);
  // }

  // private isUniqueSelection(entitiesSelected: List<any>, entitySelected: any) {
  //   let existingIndex;
  //   if (this.trackChanges) {
  //     existingIndex = entitiesSelected.filter(x => x.change !== ChangeType.deleted)
  //       .toList()
  //       .findIndex(entity => this.checkUniqueSelectionUsing(entity) === this.checkUniqueSelectionUsing(entitySelected));
  //   }
  //   else {
  //     existingIndex = entitiesSelected.findIndex(entity => this.checkUniqueSelectionUsing(entity) === this.checkUniqueSelectionUsing(entitySelected));
  //   }

  //   // If the entity does already exist...
  //   if (existingIndex !== -1) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  // public isListEmpty(list: List<any>): boolean {
  //   if (this.trackChanges) {
  //     return !list.find(item => item.change !== ChangeType.deleted);
  //   }
  //   else {
  //     return list && list.count() === 0;
  //   }
  // }

  // public hasChanges(entity: any): boolean {
  //   if (this.trackChanges && entity.hasOwnProperty('change') && entity.change != ChangeType.none) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // public resetChanges(postSave: boolean) {
  //   let entities = this.selected.getValue();
  //   if (this.trackChanges) {
  //     if (postSave) {
  //       entities = entities.filter(x => x.change !== ChangeType.deleted).toList();
  //     }
  //     else {
  //       entities = entities.filter(x => x.change !== ChangeType.added).toList();
  //     }
  //     entities.forEach(entity => entity.change = ChangeType.none);
  //     this.selected.next(entities);
  //     this.originalDataSelected = this.selected.getValue();
  //   }
  // }

  // public selectedHasChanges() {
  //   return this.trackChanges && this.originalDataSelected !== this.selected.getValue();
  // }

  // public selectedDraggable() {
  //   return this.manualSortType !== 'none';
  // }

  // public filterSelectedToggle(): void {
  //   this.filterSelectedHidden = !this.filterSelectedHidden;
  //   if (this.filterSelectedHidden) {
  //     this.filterSelectedControl.setValue('');
  //   }
  // }

  // public filterAvailableToggle(): void {
  //   this.filterAvailableHidden = !this.filterAvailableHidden;
  //   if (this.filterAvailableHidden) {
  //     this.filterAvailableControl.setValue('');
  //   }
  // }

  // public sortDescendingSelectedToggle(): void {
  //   let descending = this.sortDescendingSelected.getValue()
  //   this.sortDescendingSelected.next(!descending);
  // }

  // public sortDescendingAvailableToggle(): void {
  //   let descending = this.sortDescendingAvailable.getValue()
  //   this.sortDescendingAvailable.next(!descending);
  // }

  // private move(array: any[], from: number, to: number) {
  //   array.splice(to, 0, array.splice(from, 1)[0]);
  // }

  // private getSortDecimalValue(originalIndex: number, dropIndex: number, list: List<any>): number {
  //   if (list.count() === 0) {
  //     return 10; // value greater than 0
  //   }
  //   else if (list.count() > 0) {
  //     if (originalIndex === dropIndex) {
  //       return list.get(originalIndex).sort;
  //     }
  //     else if (originalIndex === null) {
  //       if (dropIndex === 0) {
  //         return list.get(0).sort / 2;
  //       }
  //       else if (dropIndex === (list.count())) {
  //         return list.get(dropIndex - 1).sort + 10;
  //       }
  //       else {
  //         return (list.get(dropIndex - 1).sort + list.get(dropIndex).sort) / 2;
  //       }
  //     }
  //     else {
  //       if (originalIndex > dropIndex) {
  //         if (dropIndex === 0) {
  //           return list.get(0).sort / 2;
  //         }
  //         else {
  //           return (list.get(dropIndex - 1).sort + list.get(dropIndex).sort) / 2;
  //         }
  //       }
  //       else if (originalIndex < dropIndex) {
  //         if (dropIndex === (list.count() - 1)) {
  //           return list.get(dropIndex).sort + 10;
  //         }
  //         else {
  //           return (list.get(dropIndex).sort + list.get(dropIndex + 1).sort) / 2;
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }

  // // If any sort values are duplicated or there's a sort value <= 0, update all sort values
  // private sortValuesValid(list: List<any>): boolean {
  //   if (this.trackChanges) {
  //     list = list.filter(x => x.change !== ChangeType.deleted).toList();
  //   }
  //   let grouped = this.groupBy(list.toJS(), this.manualSortPropertyName);

  //   let duplicates = grouped.find(x => x.data.length > 1);
  //   let lessThanZero = grouped.find(x => x.type <= 0);
  //   let sortPropertyMissing = list.find(x => !x.hasOwnProperty(this.manualSortPropertyName));
  //   let notInteger = this.manualSortType === 'indexed' ? grouped.find(x => !this.isInteger(x.type)) : null; // only for indexed type

  //   return !duplicates && !lessThanZero && !sortPropertyMissing && !notInteger;
  // }

  // private isInteger(x) {
  //   return (typeof x === 'number') && (x % 1 === 0);
  // }

  // private groupBy(arr, key) {
  //   var newArr = [],
  //     types = {},
  //     i, j, cur;
  //   for (i = 0, j = arr.length; i < j; i++) {
  //     cur = arr[i];
  //     if (!(cur[key] in types)) {
  //       types[cur[key]] = { type: cur[key], data: [] };
  //       newArr.push(types[cur[key]]);
  //     }
  //     types[cur[key]].data.push(cur);
  //   }
  //   return newArr;
  // }

  // private resetSortValues(list: List<any>) {
  //   for (var i = 0; i < list.count(); i++) {
  //     let x = list.get(i);
  //     if (this.trackChanges && x.change !== ChangeType.added) {
  //       x.change = ChangeType.modified;
  //     }
  //     x[this.manualSortPropertyName] = this.manualSortType === 'indexed' ? i : (i + 1) * 10;
  //   }
  // }
}


export enum ChangeType {
  none = 0,
  added = 1,
  modified = 2,
  deleted = 3
}
