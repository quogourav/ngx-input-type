import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { InputTypeDirective } from './input-type.directive';

@NgModule({
    declarations: [InputTypeDirective],
    imports: [
      CommonModule
    ],
    exports: [InputTypeDirective]
  })
  export class NgxInputTypeModule { }