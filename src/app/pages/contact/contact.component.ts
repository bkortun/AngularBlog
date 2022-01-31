import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean;
  success: boolean;
  info: string;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
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

  get getControls(){
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      this.helperService.sendContactMail(this.contactForm.value).subscribe(
        (response) => {
          this.loading = false;
          this.success = true;
          this.contactForm.reset();
          this.info = 'Mesajınız İletildi.';
        },
        (error) => {
          this.loading = false;
          this.success = false;
          this.info = 'Bir Hata Oluştu.';
        }
      );
    } else {
    }
  }
}
