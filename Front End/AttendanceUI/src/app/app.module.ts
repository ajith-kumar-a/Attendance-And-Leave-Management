import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
// import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
// import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
// import { ProfessionalInfoComponent } from './professional-info/professional-info.component';
import { AttendanceMarkingComponent } from './components/attendance-marking/attendance-marking.component';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { ViewattendanceComponent } from './components/viewattendance/viewattendance.component';
import { ApplyleaveComponent } from './components/applyleave/applyleave.component';
// import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    LoginComponent,
    
    AttendanceMarkingComponent,
    AttendanceSummaryComponent,
    ViewattendanceComponent,
    ApplyleaveComponent,
    TeacherDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
   
    // NgbNavModule,
    FormsModule,

  ],
  providers: [
    provideAnimationsAsync(),
 
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
