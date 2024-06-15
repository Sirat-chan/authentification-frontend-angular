import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {TestComponent} from "./test/test.component";
import {AuthentificationGuard} from "./guards/authentification.guard";
import {NewUserComponent} from "./new-user/new-user.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {ManageProfileComponent} from "./manage-profile/manage-profile.component";

const routes: Routes = [
  {path : '', redirectTo: '/login', pathMatch: 'full'},
  {path : 'login' , component: LoginComponent},
  {path : 'admin' , component: AdminTemplateComponent, canActivate : [AuthentificationGuard]
  , children :[
    {path : 'test' , component: TestComponent},
    {path : 'new-user' , component: NewUserComponent, canActivate : [AuthorizationGuard], data: {role:"ADMIN"}},
    {path:"notAuthorized", component : NotAuthorizedComponent},
    {path : 'manageprofile' , component: ManageProfileComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
