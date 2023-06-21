import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserEntity} from "../user";
import {TokenStorageService} from "../services/token-storage.service";
import {UserDTO} from "../userDTO";
import {Apartment} from "../apartment";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../assets/bootstrap.min.css']
})
export class ProfileComponent implements OnInit {
  user!: UserEntity;
  userDTO !: UserDTO;
  isEditingProfile = false;
  editedUserDTO!: UserDTO;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.getUserDTO();
  }

  public getUserDTO() {
    this.userService.getUserEntityById(this.user.id).subscribe(
      (response: UserDTO) => {
        this.userDTO = response;
        this.editedUserDTO = { ...this.userDTO };
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editProfile(): void {
    this.isEditingProfile = true;
  }

  public saveProfileChanges(): void {
    this.isEditingProfile = false;
  }

  public cancelProfileEdit(): void {
    this.isEditingProfile = false;
  }
}
