import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formArrayFilterbyScopePipe',
    pure: false
})
export class FormArrayFilterByScopePipe implements PipeTransform {

    transform(items: any[], searchValue: string): any[] {
        if (!items) return [];
        if (!searchValue) return items;

        searchValue = searchValue.toLowerCase();
        return items.filter(it => {
            return it.value.scope.toLowerCase() == searchValue;
        });
    }

}