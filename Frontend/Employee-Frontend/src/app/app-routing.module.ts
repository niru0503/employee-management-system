import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'employees', component: EmployeeListComponent, canActivate:[AuthGuard]},
  {path: 'create-employee', component: CreateEmployeeComponent, canActivate:[AuthGuard]},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate:[AuthGuard]},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo:'dashboard',pathMatch:'full'},
  {path: '**', redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
