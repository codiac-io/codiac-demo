import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(value) : Object {
    return Object.keys(value).map(o => { return {index: Object.keys(value).indexOf(o), name: value[o]}});
  }
}