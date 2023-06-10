import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserEntity} from "../user";

export interface JWTSession {
  authorities: String[];
  id: number;
  token: string;
  type: string;
  username: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',
      '../../assets/bootstrap.min.css']
})
export class RegisterComponent implements OnInit {
  user !: UserEntity;
  form: any = {
    id: null,
    username: null,
    password: null,
    email: null,
    firstName: null,
    lastName: null,
    address: null,
    imageURL: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  jwtSession!: JWTSession;
  isAdmin = false;
  isManager = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onAddUser(addForm: NgForm): void {
    this.isSignUpFailed = false;
    this.authService.register(addForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        addForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.isSuccessful = false;
        addForm.reset();
      }
    );
  }

  public onCreateUser(): void {
      const {username, password, email, firstName, lastName, address, imageURL} = this.form;
      console.log(this.form);
      this.user.username = username;
      this.user.password = password;
      this.user.email = email;
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.address = address;
      this.user.imageUrl = imageURL;
      this.user.role = 'ADMIN';
  }

  public onSubmit(): void {
    this.onCreateUser();
    console.log(this.user.username);
    this.authService.register(this.user).subscribe(
      data => {
        console.log(data);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  // public onAddUser(addForm: NgForm): void {
  //   this.isSignUpFailed = false;
  //   this.authService.register(addForm.value).subscribe(
  //     data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //       addForm.reset();
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //       addForm.reset();
  //     }
  //   );
  // }
}
