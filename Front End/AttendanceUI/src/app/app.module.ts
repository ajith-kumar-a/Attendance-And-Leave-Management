import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { AttendanceMarkingComponent } from './components/attendance-marking/attendance-marking.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentsComponent,
    AttendanceMarkingComponent,
    AttendanceSummaryComponent,
    TeacherDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbNavModule,
    FormsModule,
    CommonModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
