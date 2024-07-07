import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthentificationService,
              private router: Router, private modalService: ModalService) {
  }

  ngOnInit(){
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin(){
    console.log(this.formLogin.value)
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authService.login(username, pwd).subscribe({
      next : (data) => {
        this.authService.loadProfile(data);
        console.log(data)
        this.router.navigateByUrl("/admin")
      },
      error: err => {
        console.log(err);
      }
    })
  }


  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

}
