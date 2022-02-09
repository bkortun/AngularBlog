import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MyValidationService {

  constructor() { }

  GetValidationMessage(f: AbstractControl, name: string) {
    if (f.errors) {
      for (let errorName in f.errors) {
        if (errorName == 'required') {
          return name + ' alanı boş geçilemez.';
        } else if (errorName == 'email') {
          return 'Email formatı hatalı.';
        } else if (errorName == 'minlength') {
          return name + ' en az 5 karakter içermeli.';
        }
      }
    }
    return null
  }
}
