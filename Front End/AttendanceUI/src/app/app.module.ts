import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfessionalInfoComponent } from './professional-info/professional-info.component';
import { AttendanceMarkingComponent } from './attendance-marking/attendance-marking.component';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherDashboardComponent,
    PersonalInfoComponent,
    ProfessionalInfoComponent,
    AttendanceMarkingComponent,
    AttendanceSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
