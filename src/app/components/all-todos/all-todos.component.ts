import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit {
  todos: any = [];
  constructor(private http: HttpClient){}

  async ngOnInit() {
    this.todos = await this.loadTodos();
    console.log(this.todos);
  }

  loadTodos() {                                  //never[] | PromiseLike<never[]> {
    const url = environment.baseUrl + '/todos/';
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Token ' + localStorage.getItem('token'))
    //wird jegtzt vom Interceptor Service gemacht
    // return lastValueFrom(this.http.get(url, {
    //   headers: headers
    // }));
    return lastValueFrom(this.http.get(url));
  }
}
