import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(username:string, password:string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body));
  }

  public addTask(title:string) {
    const url = environment.baseUrl + 'todos/';
    const body = {
      "title": title
    }
    return lastValueFrom(this.http.post(url, body));

  }

  public updateTask(title:string, description:string, checked:boolean, todo_id:string) {
    const url = environment.baseUrl + 'todos/' + todo_id + '/';
    const body = {
      "title": title,
      "description": description,
      "checked": checked,
      "todo_id": todo_id
    }
    return lastValueFrom(this.http.put(url, body));

  }
}
