import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/models/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  @Input() publication: Publication;

  constructor() { }

  ngOnInit(): void {
  }

}
