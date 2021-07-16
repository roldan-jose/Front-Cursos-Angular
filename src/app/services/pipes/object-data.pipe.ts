import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectData'
})
export class ObjectDataPipe implements PipeTransform {

  transform(object: any = []): any {
    return Object.values(object);
  }

}
