import { Component, OnInit } from '@angular/core';
import {Apartment} from '../apartment'
import {UserEntity} from "../user";
import {NgForm} from "@angular/forms";
import {ApartmentService} from "../services/apartment.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

export interface JWTSession {
  authorities: String[];
  id: number;
  token: string;
  type: string;
  username: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css',
    '../../assets/bootstrap.min.css']
})
export class AdminPanelComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  statusFilter: string = '';
  errorMessage = '';
  jwtSession!: JWTSession;
  isAdmin = false;
  isManager = false;

  public blankApartment !: Apartment;
  public blankUser !: UserEntity;
  public apartments !: Apartment[];
  public editApartment !: Apartment;
  public addedApartment !: Apartment;
  public deletedApartment !: Apartment;


  public user !: UserEntity;
  constructor(private authService: AuthService, private router: Router, private apartmentService: ApartmentService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.getAllApartments();
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:write'))
      this.isManager = true;
    if (token.includes('user:create'))
      this.isAdmin = true;
  }

  onStatusChange(event: any) {
    if (this.editApartment && event.target.value === 'OK') {
      // @ts-ignore
      this.editApartment.purchaserId = null;
      this.getAllApartments();
    }
  }

  public getFilteredApartments(): Apartment[] {
    if (!this.statusFilter) {
      return this.apartments;
    }

    return this.apartments.filter(apartment => apartment.status === this.statusFilter);
  }

  public navToHome() {
    this.router.navigate(['/home']);
  }

  public getAllApartments() {
    this.apartmentService.getAllApartments().subscribe(
      (response: Apartment[]) => {
        this.apartments = response;
        this.apartments.sort(function (a, b) {
          return b.price - a.price;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    this.isSignUpFailed = false;
    this.authService.create(addForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        addForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        addForm.reset();
      }
    );
  }

  public onUpdateApartment(apartment: Apartment) : void {
    if (apartment.status === 'OK') {
      apartment.reportMessage = '';
    }
    this.apartmentService.updateApartment(apartment).subscribe(
      (response: Apartment) => {
        console.log(response);
        this.getAllApartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTitle(str: string | undefined): string {
    if (str === undefined)
      return '';
    return str.substring(0, str.indexOf('\n'));
  }

  public getBody(str: string): string {
    return str.substring(str.indexOf('\n'), str.length);
  }

  public getPosition(string: string, subString: string, index: number) {
    return string.split(subString, index).join(subString).length;
  }

  public onAddApartment(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-apartment-form').click();
    this.apartmentService.addApartment(addForm.value).subscribe(
      (response: Apartment) => {
        this.addedApartment = response;
        this.getAllApartments();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onDeleteApartment(apartmentId: number): void {
    this.apartmentService.deleteApartment(apartmentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllApartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchApartments(key: string): void {
    console.log(key);
    const results: Apartment[] = [];
    for (const apartment of this.apartments) {
      if (apartment.quarter.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || apartment.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || apartment.status.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(apartment);
      }
    }
    this.apartments = results;
    if (!key) {
      this.getAllApartments();
    }
  }

  public onOpenModal(apartment: Apartment, user: UserEntity, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addApartment') {
      button.setAttribute('data-target', '#addApartmentModal');
    }
    if (mode === 'addUser') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'editApartment') {
      this.editApartment = apartment;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'reportMessage') {
      this.editApartment = apartment;
      button.setAttribute('data-target', '#reportMessageModal');
    }
    if (mode === 'delete') {
      this.deletedApartment = apartment;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if(container) {
      container.appendChild(button);
    }
    button.click();
  };

  logout(): void {
    this.tokenStorageService.signOut();
    // window.location.reload();
    this.router.navigate(['/', 'login']);
  }
}
