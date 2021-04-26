import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../environments/environment';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-frontend';

  items: Todo[] = [];
  form = new FormGroup({});

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Todo[]>(`${environment.apiUrl}todos/`).subscribe((items) => {
      this.items = items;
    });

    this.form = new FormGroup({
      todoValue: new FormControl('', Validators.required),
    });
  }

  addTodo(): void {
    const toSend = { value: this.form.value.todoValue };

    this.http
      .post(`${environment.apiUrl}todos/`, toSend)
      .subscribe(() => console.log('added'));

    this.form.reset();
  }

  markAsDone(item: Todo): void {
    item.done = true;
    this.http
      .put(`${environment.apiUrl}todos/${item.id}`, item)
      .subscribe(() => console.log('updated'));
  }
}
