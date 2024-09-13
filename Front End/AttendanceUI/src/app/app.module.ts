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
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
import { StudentIdComponent } from './components/student-id/student-id.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TeacherLeaveRequestStatusComponent } from './components/teacher-leave-request-status/teacher-leave-request-status.component';
import { GlobalNotificationComponent } from './components/global-notification/global-notification.component';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { ListTeachersComponent } from './components/list-teachers/list-teachers.component';
import { ListStaffComponent } from './components/list-staff/list-staff.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { ListStudentAttendanceComponent } from './components/list-student-attendance/list-student-attendance.component';
import { ListTeacherAttendanceComponent } from './components/list-teacher-attendance/list-teacher-attendance.component';
import { ListStaffAttendanceComponent } from './components/list-staff-attendance/list-staff-attendance.component';
import { ListAdminAttendanceComponent } from './components/list-admin-attendance/list-admin-attendance.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

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
    StudentIdComponent,
    TeacherLeaveRequestStatusComponent,
    GlobalNotificationComponent,
    ListStudentsComponent,
    ListTeachersComponent,
    ListStaffComponent,
    ListAdminComponent,
    ListStudentAttendanceComponent,
    ListTeacherAttendanceComponent,
    ListStaffAttendanceComponent,
    ListAdminAttendanceComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
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
