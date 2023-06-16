import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit {
  todos: any = [];
  checked: boolean = false;
  title: string = '';
  description: string = '';
  constructor(private http: HttpClient, private as: AuthService, private route: Router) { }

  async ngOnInit() {
    this.todos = await this.loadTodos();
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
  async addTask() {
    try {
      let resp: any = await this.as.addTask(this.title);
      this.route.navigateByUrl('/todos')
    } catch (e) {
      alert('Task nicht gesendet!')
      console.error(e);

    }
  }

  showDetail(todo_Id:string){
    this.route.navigateByUrl('/todos/'+todo_Id)
  }

}
