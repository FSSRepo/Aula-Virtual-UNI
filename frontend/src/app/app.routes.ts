import {ModuleWithProviders } from '@angular/core';
import {Routes, Route, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {StudentComponent} from './components/student/student.component';
import {ClasseComponent} from './components/classe/classe.component';
import {TeacherComponent} from './components/teacher/teacher.component';
import {ErrorComponent} from './components/error/error.component';
import {ErrorServerComponent } from './components/error-server/error-server.component';
const appRoutes: Routes = [
     {path: '', component: HomeComponent},
     {path: 'home', component: HomeComponent },
     {path: 'student', component: StudentComponent},
     {path: 'class/:id', component: ClasseComponent},
     {path: 'teacher', component: TeacherComponent},
     {path: 'error-server', component: ErrorServerComponent},
     {path: '**', component: ErrorComponent }
     
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
