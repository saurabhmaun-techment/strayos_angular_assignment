import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/Models/user_details.model';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserDetails = null;

  constructor(private userService : UserService) {
    // Make call to get user details
    this.userService.getUserProfile().subscribe(data => {
      this.userDetails = data;
     });
  }

  ngOnInit(): void {

  }

}
