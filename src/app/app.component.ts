import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/map';



export interface Event {
  type?: string;
  entity?: number;
  update?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subs: Subscription;
  events: Event[] = [
    { type: 'create', entity: 4 },
    { type: 'create', update: 3 },
    { type: 'create', entity: 3, update: 6 },
    { type: 'update', entity: 2 },
    { type: 'update', update: 5 },
    { type: 'update', entity: 2, update: 5 },
    { type: 'delete', entity: 1 },
    { type: 'delete', update: 1 },
    { type: 'delete', entity: 1, update: 5 }
  ];
   item: Event[] = [];
  event$ = from(this.events);
  ngOnInit() {
    this.subs = this.event$
      .pipe(filter(evt => evt.update === 5))
      .map( ({ type }) => type )
      .subscribe(
        x => {
          console.log(this.item = x);
        },
        () => {
          console.log('Error Getting Event');
        },
        () => {
          console.log('I have got all the items');
        }
      );
  }
}
