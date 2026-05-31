import { Component, Input, OnInit } from '@angular/core';
import { Itood } from 'src/app/model/todo';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
@Input() todoArr!:Itood[];
  constructor() { }

  ngOnInit(): void {
  }

}
