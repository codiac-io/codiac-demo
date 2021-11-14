import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formArrayFilterPipe'
})
export class FormArrayFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();
        return items.filter(it => {
            let found = false;
            for (const key in it.value) {
                if (it.value[key].toLowerCase().includes(searchText)) found = true;
            }
            return found;
        });
    }

}