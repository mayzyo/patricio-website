import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'group'
})
export class GroupPipe<T> implements PipeTransform {

  transform(value: T[], cutoff: number = 2): T[][] {
    return value.reduce((acc, cur, i) => {
      if(i % cutoff == 0) {
        acc.push(new Array<T>());
      }
      acc[acc.length - 1].push(cur);
      return acc;
    }, new Array<T[]>());
  }

}
