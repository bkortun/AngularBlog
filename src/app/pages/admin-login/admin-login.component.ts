import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { stringify } from "@angular/compiler/src/util";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"]
})
export class AdminLoginComponent implements OnInit {
  loginForm:FormGroup
  loading:boolean
  success:boolean
  info:string
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm= new FormGroup({
      email: new FormControl('email',Validators.required),
      password:new FormControl('password',Validators.required)
    });
  }
  onSubmit(){
    if (this.loginForm.valid) {
      this.loading=true;
      this.authService.login(this.loginForm.value).subscribe(response=>{
        this.success=true
        this.router.navigateByUrl("/admin")
      },(error) => {
        this.success = false;
        this.info = 'Bir hata meydana geldi, sayfayı yenileyin.';
        console.log(error);
      })
    }
    else{
      alert("Email veya şife yanlış");
    }
  }
  // login(email: string, password: string) {
  //   this.authService.login(email, password).subscribe(result => {
  //     if (result.status == true) {
  //       localStorage.setItem("email", email);
  //       localStorage.setItem("password", password);
  //       this.router.navigate(["/admin"]);
  //     } else {
  //       alert("Email veya şife yanlış");
  //     }
  //   });
  // }
}
