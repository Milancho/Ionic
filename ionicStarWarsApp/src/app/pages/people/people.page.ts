import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  people: Observable<any>;
  menu:any[]=[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.menu = [
      "menu 1",
      "menu 2",
      "menu 3"
    ];
    
   this.people = this.api.getPeople();
   this.people.subscribe(data => {
     console.log('People: ', data)
   })
  }

}
