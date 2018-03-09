import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: string[], character: string): string {
    if (!Array.isArray(input)) return input;
    return input.join(character);
  }
}
