import { Component } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthentificationService, private router : Router) {
  }

  ngOnInit(){

  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
