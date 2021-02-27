import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value?: string, size: number = 60): string | undefined {
    return value && value.length > 60 ? value.slice(0, size).concat('...') : value;
  }
}
