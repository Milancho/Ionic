import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  people: Observable<any>;
  menu:any[]=[];

  constructor(private navController: NavController, private router: Router, private api: ApiService) { }

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

  openDetails(person) {
    console.log("person:", person);
    let split = person.url.split('/');
    let personId = split[split.length-2];
    this.router.navigateByUrl(`/tabs/people/${personId}`);
  }

}
