import { Component, OnInit } from '@angular/core';
import {UserEntity} from "../user";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',
  '../../assets/bootstrap.min.css']
})
export class MenuComponent implements OnInit {
  user !: UserEntity;
  isLoggedIn = false;
  username!: string;
  id!: number;
  currentlyLoginUser !: UserEntity;
  isManager = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    this.isLoggedIn = true;
    if (token.includes('user:write'))
      this.isManager = true;
    if (token.includes('user:create'))
      this.isAdmin = true;
  }

  public navToHome() {
    this.router.navigate(['/home']);
  }

  public navToLogin() {
    this.router.navigate(['/login']);
  }

  public navToRegister() {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    // window.location.reload();
    this.router.navigate(['/', 'login']);
  }

}
