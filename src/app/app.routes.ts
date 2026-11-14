import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';
import { Courses } from './courses/courses';
import { Enrollments } from './enrollments/enrollments';
import { Users } from './users/users';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'students', component: Students, canActivate: [authGuard] },
  { path: 'teachers', component: Teachers, canActivate: [authGuard] },
  { path: 'courses', component: Courses, canActivate: [authGuard] },
  { path: 'enrollments', component: Enrollments, canActivate: [authGuard] },
  { path: 'users', component: Users, canActivate: [authGuard] }
];