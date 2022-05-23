import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideContentComponent } from './components/side-content/side-content.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';
import { ClasseComponent } from './components/classe/classe.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationComponent } from './components/publication/publication.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { ErrorComponent } from './components/error/error.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { FooterComponent } from './components/footer/footer.component';
import {MomentModule} from 'angular2-moment';
import { ErrorServerComponent } from './components/error-server/error-server.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideContentComponent,
    HomeComponent,
    StudentComponent,
    ClasseComponent,
    TeacherComponent,
    PublicationsComponent,
    PublicationComponent,
    AssignmentsComponent,
    ErrorComponent,
    OurServicesComponent,
    FooterComponent,
    ErrorServerComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
