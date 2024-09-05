import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';
>>>>>>> 809ee864d77928b4dfce40a80e33bcefd9e20f78

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
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
<<<<<<< HEAD
    TeacherDashboardComponent,
    PersonalInfoComponent,
    ProfessionalInfoComponent,
    AttendanceMarkingComponent,
    AttendanceSummaryComponent
=======
>>>>>>> 809ee864d77928b4dfce40a80e33bcefd9e20f78
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
=======
    CommonModule
>>>>>>> 809ee864d77928b4dfce40a80e33bcefd9e20f78
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
