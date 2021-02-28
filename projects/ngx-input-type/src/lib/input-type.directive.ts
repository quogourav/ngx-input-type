import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ngxInputType]'
})
export class InputTypeDirective {
  @Input('ngxInputType') inputType: 'NumberOnly' | 'AlphaNumeric' | 'AlphabetOnly';
  @Input() spaceAllowed = false;

  constructor(private _el: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (!this.isNull(this.inputType)) {
      if (charCode == KeyCodeConstants.SpaceKey && (this._el.nativeElement.value == '' || event.target.selectionStart === 0)) {
        return false;
      }
      
      if (this.inputType === 'NumberOnly') {
        return this.isNumeric(charCode, event);
      }

      if (this.inputType === 'AlphabetOnly') {
        return this.isAlphabet(charCode);
      }

      if (this.inputType === 'AlphaNumeric') {
        return (this.isAlphabet(charCode) || this.isNumeric(charCode, event));
      }
      
      if (this._el.nativeElement.hasAttribute('maxLength')) {
        if (event.ctrlKey) { // To handle Validation on Paste Later
          return true;
        }
        if ((charCode != KeyCodeConstants.TabKey && charCode != KeyCodeConstants.BackSpace && charCode != KeyCodeConstants.DeleteKey)) {
          if ((event.target.value).length >= this._el.nativeElement.getAttribute('maxLength')) {
            return false;
          }
        }
      }
      return true;
    }
  }
  private isNumeric(charCode: any, event: any) {
    //For left-right navigation key and for delete key fix at firefox (37 is for % and left arrow, 39 is for ' and right arrow and 46 is for delete key and .)
    if ((charCode == KeyCodeConstants.LeftArrow && event.key.indexOf("%") < 0) 
        || (charCode == KeyCodeConstants.RightArrow && event.key.indexOf("'") < 0) 
        || (charCode == KeyCodeConstants.DeleteKey && event.key.indexOf(".") < 0)) {
      return true;
    }
    else if (!isNaN(parseInt(event.key)) || (event.key == ' ' && this.spaceAllowed)) {
      return true;
    }
    else if (charCode > KeyCodeConstants.ModeChange && 
      (charCode < KeyCodeConstants.NumericZero 
        || charCode > KeyCodeConstants.NumericNine)) {
      return false;
    }
    return true;
  }

  private isNull(value: any): boolean {
    if (value === undefined || value === null || value === "") {
      return true;
    }
    return false;
  }

  private isAlphabet(charCode: any) {
      if (charCode > KeyCodeConstants.ModeChange && (charCode < KeyCodeConstants.AlphabetA || charCode > KeyCodeConstants.AlphabetZ)
          && (charCode < KeyCodeConstants.NumPad1 || charCode > KeyCodeConstants.F11)) {
          return false;
      }
      return true;
  }
}

class KeyCodeConstants {
 
  public static readonly TabKey: number = 9;
  public static readonly EnterKey: number = 13;
  public static readonly ShiftKey: number = 16;
  public static readonly ModeChange: number = 31; // Linux Only
  public static readonly SpaceKey: number = 32;
  public static readonly LeftArrow: number = 37;
  public static readonly RightArrow: number = 39;
  public static readonly DeleteKey: number = 46;
  public static readonly NumericZero: number = 48;
  public static readonly NumericNine: number = 57;
  public static readonly GreaterThanKey = 60;
  public static readonly LessThanKey = 62;
  public static readonly AlphabetA: number = 65;
  public static readonly AlphabetZ: number = 90;
  public static readonly NumPad1: number = 97;
  public static readonly F11: number = 122;
  public static readonly BackSpace: number = 8;
}