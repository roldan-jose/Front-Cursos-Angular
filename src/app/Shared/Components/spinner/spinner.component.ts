import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  // <div class="mt-3"><h1 class="display-5">¡Espere Un Momento!</h1></div>
  template: `<div class="contents" *ngIf="isLoading | async" ><div class="cont"><h4 class="display-6">¡Espere Un Momento!</h4></div><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
isLoading = this.serviceSpiner.isLoading$;

  constructor(private serviceSpiner: SpinnerService) { }
}
