import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'group'
})
export class GroupPipe<T> implements PipeTransform {

  transform(value: T[], cutoff: number = 2): T[][] {
    return value && value.reduce((acc, cur, i) => {
      acc[i % cutoff].push(cur);
      return acc;
    }, Array.from({ length: cutoff }).map(() => new Array<T>()));
  }

}
