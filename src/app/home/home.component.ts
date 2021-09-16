import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: Todo[];

  constructor(private todoService: TodoService) {
    this.todoList = [];
  }

  ngOnInit(): void {
  }

  onTodoCreated(event) {
    this.todoList.push(event);
  }

}
