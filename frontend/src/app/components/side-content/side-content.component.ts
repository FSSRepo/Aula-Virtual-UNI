import { Component, OnInit, Input} from '@angular/core';
import { Classe } from 'src/app/models/classe';
import * as $ from 'jquery';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})

export class SideContentComponent implements OnInit {
  @Input() isStudent: boolean;
  @Input() isTeacher: boolean;
  @Input() isClasse: boolean;
  @Input() hasHomework: boolean;
  @Input() classe: Classe;
  @Input() student: Student;
  @Input() teacher: Teacher;
  public url: string;

  constructor() {
    this.hasHomework = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
