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
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { StudentLeaveRequestStatusComponent } from './components/student-leave-request-status/student-leave-request-status.component';
import { AllUserAttendanceDetailsComponent } from './components/all-user-attendance-details/all-user-attendance-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
// import { DashboardComponent } from './dashboard/dashboard.component'; // Import your dashboard component

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Student', component: StudentsComponent },
  { path: 'Admin', component:AdminComponent},
  { path: 'attendance-marking', component: AttendanceMarkingComponent },
  { path: 'attendance-summary', component: AttendanceSummaryComponent },
  { path: 'teacher-leavestatus', component: TeacherLeavestatusComponent},
  { path: '', component: LandingpageComponent},
  { path: 'Aboutus', component: AboutusComponent},
  { path: 'course', component: CourseDetailsComponent},
  { path: 'contact', component: ContactUsComponent},
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // Default route
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  {path: 'apply-leave',component:ApplyleaveComponent},
  {path: 'leave-status',component:LeaveStatusComponent},
  { path: 'leave-status/:userId', component: LeaveStatusComponent },
  // { path: 'Ajith', component: DummyComponent },
  // { path: 'a', component: DummyComponent},

  {path:'Student-Leave-Details',component:StudentLeaveRequestStatusComponent},
  {path:'notifications',component:NotificationsComponent},

  { path: 'Teacher', component:TeacherDashboardComponent,children :[
    {path:'Student-Leave-Details',component:StudentLeaveRequestStatusComponent}
  ]},

  {path:'hiiii',component:AllUserAttendanceDetailsComponent},


  {path:"admin",component:AdminComponent,children:[
    {path:"role",component:RoleComponent},
   
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
