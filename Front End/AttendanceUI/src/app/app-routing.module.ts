import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceMarkingComponent } from './components/attendance-marking/attendance-marking.component';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { StudentsComponent } from './components/students/students.component';
import { LoginComponent } from './components/login/login.component';
import { ApplyleaveComponent } from './components/applyleave/applyleave.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { TeacherLeavestatusComponent } from './components/teacher-leavestatus/teacher-leavestatus.component';
import { RoleComponent } from './components/role/role.component';
import { AdminComponent } from './components/admin/admin.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';
// import { DashboardComponent } from './dashboard/dashboard.component'; // Import your dashboard component



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Student', component: StudentsComponent },
  { path: 'Teacher', component:TeacherDashboardComponent},
  { path: 'Admin', component:AdminComponent},
  { path: 'attendance-marking', component: AttendanceMarkingComponent },
  { path: 'attendance-summary', component: AttendanceSummaryComponent },
  { path: 'teacher-leavestatus', component: TeacherLeavestatusComponent},

  {path: 'apply-leave',component:ApplyleaveComponent},
  {path: 'leave-status',component:LeaveStatusComponent},
  { path: 'leave-status/:userId', component: LeaveStatusComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route



  {path:"admin",component:AdminComponent,children:[
    {path:"role",component:RoleComponent},
   
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
