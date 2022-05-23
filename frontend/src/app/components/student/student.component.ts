import { Component, OnInit } from '@angular/core';
import {StudentService} from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})

export class StudentComponent implements OnInit {
  public student: Student;
  public classes: Array<Classe>;
  public url: string;

  constructor(
    private router: Router,
    private serv: StudentService
  ) {
    this.url = Global.url;
    this.classes = [];
  }

  ngOnInit(): void {
    this.serv.getProfile().subscribe(
      response => {
        if (response.status === 'done'){
          const {name, photo, group, career, skill, work, semestre} = response;
          this.student = new Student(name, skill, career, photo, work, semestre, group);
        }else{
          console.log('Estudiante no existe');
        }
      },
      error => {
        this.router.navigate(['/home']);
        localStorage.removeItem('login');
      }
      );
    this.serv.getClasses().subscribe(
      response => {
        if (response.status === 'done'){
          let index = 0;
          for (const it of response.classes){
            this.classes.push(new Classe(it._id, it.name, it.unit, it.group, it.photo, it.progress, it.teacher,
              response.homework[index]));
            index++;
          }
        }else{
          console.log('Estudiante no existe');
          this.router.navigate(['/not-found']);
        }
      },
      error => {
        this.router.navigate(['/home']);
        localStorage.removeItem('login');
      }
      );

  }

}
