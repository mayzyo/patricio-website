import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: string | undefined | null, size: number = 60): string | undefined | null {
    return value && value.length > size ? value.slice(0, size).concat('...') : value;
  }
}
