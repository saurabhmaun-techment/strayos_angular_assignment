import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from 'src/app/Models/user_details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_JSON_URL: string = 'http://localhost:4200/assets/user.json';

  constructor(private http: HttpClient) { }

  getUserProfile(){
    return this.http.get<UserDetails>(this.USER_JSON_URL);
  }

}
