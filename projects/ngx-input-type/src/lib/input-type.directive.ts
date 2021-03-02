import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngxInputType]'
})
export class InputTypeDirective {
  @Input('ngxInputType') inputType: 'NumberOnly' | 'AlphaNumeric' | 'AlphabetOnly';
  @Input() spaceAllowed = false;
  @Input() specialCharacters = '';

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    if (this.getPattern(event).test(event.key)) { return; }

    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode == 37 && event.key.indexOf("%") < 0) 
        || (charCode == 39 && event.key.indexOf("'") < 0) 
        || (charCode == 46 && event.key.indexOf(".") < 0)) {
      return;
    }
    // allow backspace, esc, arrow left, arrow right
    if ([8, 9, 27].indexOf(event.keyCode) !== -1) {
      return;
    }

    event.preventDefault();    
  }

  private getPattern(event: any) {    
    const numberPattern = '0-9';
    const alphabetPattern = 'a-zA-Z';
    let expression: string = '[';
    if (this.inputType === 'NumberOnly') {
        expression += numberPattern;
    }
    if (this.inputType === 'AlphabetOnly') {
        expression += alphabetPattern;
    }
    if (this.inputType === 'AlphaNumeric') {
      expression += numberPattern;
      expression += alphabetPattern;
    }
    if(event.target.selectionStart > 0 && this.spaceAllowed) {
      // Setup our pattern to allow alpha, spaces and dashes
      expression += '\\s';
    }
    if (this.specialCharacters) {
        expression += this.specialCharacters;
    }
    expression += ']+';
    return new RegExp(expression);
  }
}
