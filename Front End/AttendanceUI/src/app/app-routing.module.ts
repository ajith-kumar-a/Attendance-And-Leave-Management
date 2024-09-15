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
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserDetailupdateComponent } from './components/user-detailupdate/user-detailupdate.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ListTeacherAttendanceComponent } from './components/list-teacher-attendance/list-teacher-attendance.component';
import { ListStudentAttendanceComponent } from './components/list-student-attendance/list-student-attendance.component';
import { StudentIdComponent } from './components/student-id/student-id.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingpageComponent },
  { path: 'Aboutus', component: AboutusComponent },
  { path: 'course', component: CourseDetailsComponent },
  { path: 'contact', component: ContactUsComponent },

  { path: 'login', component: LoginComponent },

  { 
    path: 'Student',
    component: StudentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student'] }
  },
  { 
    path: 'Teacher',
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Teacher'] }
  },
  { 
    path: 'Staff',
    component: StaffDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Staff'] }
  },
  { 
    path: 'Admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  { 
    path: 'attendance-marking', 
    component: AttendanceMarkingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin'] }
  },
  { 
    path: 'attendance-summary',
    component: AttendanceSummaryComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin'] }
  },
  { 
    path: 'teacher-leavestatus',
    component: TeacherLeavestatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Teacher', 'Admin'] }
  },
  { 
    path: 'apply-leave',
    component: ApplyleaveComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin'] }
  },
  { 
    path: 'leave-status',
    component: LeaveStatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin'] }
  },
  { 
    path: 'leave-status/:userId',
    component: LeaveStatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'Ajith',
    component: DummyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  { 
    path: 'Student-Leave-Details',
    component: StudentLeaveRequestStatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Teacher','Admin'] }
  },
  { 
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin'] }
  },

  { 
    path: 'hiiii',
    component: AllUserAttendanceDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },

  { 
    path: 'admin-ddd',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    children: [
      { 
        path: 'role',
        component: RoleComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
      }
    ]
  },

  { 
    path: 'user-registration',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard],
    data: { roles:  ['Student', 'Teacher', 'Staff', 'Admin'] }
  },
  { 
    path: 'update-user-registration',
    component: UserDetailupdateComponent,
    canActivate: [AuthGuard],
    data: { roles:  ['Student', 'Teacher', 'Staff', 'Admin'] }
  },

  { 
    path: 't-attendance',
    component: ListTeacherAttendanceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 's-attendance',
    component: ListStudentAttendanceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'student-id',
    component: StudentIdComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Student', 'Teacher', 'Staff', 'Admin']  }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
