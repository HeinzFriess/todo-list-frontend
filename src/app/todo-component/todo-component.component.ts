import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.scss']
})
export class TodoComponentComponent implements OnInit {
  id: string = '';
  private sub: any;
  todo: any = [];
  checked: boolean = false;
  title: string = '';
  description: string = '';
  constructor(private http: HttpClient, private as: AuthService, private route: ActivatedRoute, private router: Router) { 

  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
   });
    this.todo = await this.loadTodo(this.id);
    const obj = this.todo[0];
    this.title =obj.title;
    this.description = obj.description;
    this.checked = obj.checked;
  }

  
  loadTodo(todo_Id:string){
    const url = environment.baseUrl + 'todos/' + todo_Id + '/';
    return lastValueFrom(this.http.get(url));
  }

  async updateTask() {
    try {
      let resp: any = await this.as.updateTask(this.title, this.description, this.checked, this.id);
      console.log(resp);
      this.router.navigateByUrl('/todos');
    } catch (e) {
      alert('Task nicht gesendet!')
      console.error(e);

    }
  }

  async deleteTask() {
    try {
      let resp: any = await this.as.deleteTask(this.id);
      this.router.navigateByUrl('/todos');
    } catch (e) {
      alert('Task nicht gelöscht!')
      console.error(e);

    }
  }

  return() {
    this.router.navigateByUrl('/todos');
  }
}
