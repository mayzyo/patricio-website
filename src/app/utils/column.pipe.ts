import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {

  transform(value: string, col: number, total: number): string {
    const cutoff = Math.floor(value.length / total);
    let start = 0;
    let end = value.length;

    if(col != 1) {
      const val = this.lastSentence(value.substring(0, (col - 1) * cutoff));
      val && (start = val);
    }

    if(col != total) {
      const val = this.lastSentence(value.substring(start, col * cutoff));
      val && (end = val);
    }

    return value.substring(start, end);
  }

  private lastSentence(value: string) {
    for(var i = value.length; i >= 0; i--) {
      if(value[i] == '.') {
        return i + 1;
      }
    }

    return false
  }
}
