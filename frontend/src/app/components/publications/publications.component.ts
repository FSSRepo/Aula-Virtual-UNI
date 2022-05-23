import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers:[ClasseService]
})
export class PublicationsComponent implements OnInit {
  @Input() classe: string;
  public publics: Array<Publication>;

  constructor(
    private clser: ClasseService
  ) { 
    this.publics = [];
  }

  ngOnInit(): void {
    this.clser.getPublicationsById(this.classe).subscribe(
      response => {
        if(response.status === 'done'){
          var index = 0;
          for(const it of response.publications){
            const pub = new Publication(
                it._id, it.title, it.summary, response.assignt[index], 
                it.created, this.classe, it.publisher, it.imgs_res,it.likes,
                it.comments,it.type_publisher);
            index++;
            this.publics.push(pub);
          }
        }
      },
      error => {

    })
  }

}
