import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formArrayFilterbyTargetPipe',
    pure: false
})
export class FormArrayFilterByTargetPipe implements PipeTransform {

    transform(items: any[], searchValue: string): any[] {
        if (!items) return [];
        if (!searchValue) return items;

        searchValue = searchValue.toLowerCase();
        return items.filter(it => {
            return it.value.target.toLowerCase() == searchValue;
        });
    }

}