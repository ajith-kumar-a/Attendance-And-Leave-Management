import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Combine FormsModule and ReactiveFormsModule imports
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { NgChartsModule } from 'ng2-charts'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AttendanceMarkingComponent } from './components/attendance-marking/attendance-marking.component';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { ViewattendanceComponent } from './components/viewattendance/viewattendance.component';
import { ApplyleaveComponent } from './components/applyleave/applyleave.component';
import { TeacherLeavestatusComponent } from './components/teacher-leavestatus/teacher-leavestatus.component';
import { RoleComponent } from './components/role/role.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoleShowComponent } from './components/role-show/role-show.component';
import { LeaveStatusComponent } from './components/leave-status/leave-status.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AllUsersDetailsComponent } from './components/all-users-details/all-users-details.component';
import { AllUserAttendanceDetailsComponent } from './components/all-user-attendance-details/all-user-attendance-details.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { StudentLeaveRequestStatusComponent } from './components/student-leave-request-status/student-leave-request-status.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TeacherLeaveRequestStatusComponent } from './components/teacher-leave-request-status/teacher-leave-request-status.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    LoginComponent,
    TeacherDashboardComponent,
    AttendanceMarkingComponent,
    ViewattendanceComponent,
    ApplyleaveComponent,
    TeacherLeavestatusComponent,
    RoleComponent,
    AdminComponent,
    RoleShowComponent,
    LeaveStatusComponent,
    LandingpageComponent,
    AboutusComponent,
    CourseDetailsComponent,
    ContactUsComponent,
    AllUsersDetailsComponent,
    AllUserAttendanceDetailsComponent,
    DummyComponent,
    StudentLeaveRequestStatusComponent,
    TeacherLeaveRequestStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    // NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
