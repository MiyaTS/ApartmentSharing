import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Apartment} from "../apartment";
import {HttpErrorResponse} from "@angular/common/http";
import {ApartmentService} from "../services/apartment.service";
import {UserEntity} from "../user";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";


@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css', '../home/home.component.css', '../../assets/bootstrap.min.css']
})
export class ApartmentListComponent implements OnInit {
  rooms !: string | null;
  price !: string | null;
  quarter !: string | null;
  apartmentsList !: Apartment[];
  user: UserEntity;
  editApartment!: Apartment;


  constructor(private route: ActivatedRoute,
              private router: Router, private apartmentService: ApartmentService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = tokenStorageService.getUser();
    this.route.queryParamMap
      .subscribe(params => {
        this.rooms = params.get('rooms');
        this.price = params.get('price');
        this.quarter = params.get('quarter');
      });
    this.getApartments();
  }

  ngOnInit(): void {

  }

  public onOpenModal(apartment: Apartment) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#updateReport');
    this.editApartment = apartment;
    if(container) {
      container.appendChild(button);
    }
    button.click();
  }

  public onUpdateApartment(apartment: Apartment) : void {
    this.apartmentService.updateApartment(apartment).subscribe(
      (response: Apartment) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onUpdateReport(message: string) {
    this.editApartment.reportMessage = "\n\nUser: @" + this.user.username
      + " are writing about the apartment: #" + this.editApartment.quarter + ' ' + this.editApartment.location +  "\n\n" + message.valueOf();
    this.editApartment.status = "RENTED";
    this.editApartment.purchaserId = this.user.id;
    if (this.editApartment.id != null) {
      this.onUpdateApartment(this.editApartment);
    }
  }

  public getApartments(): void {
    if (this.rooms === null && this.price === null && this.quarter === null) {
      this.apartmentService.getAllApartments().subscribe(
        (response: Apartment[]) => {
          this.apartmentsList = response;
          this.apartmentsList.sort(function (a, b) {
            return b.price - a.price;
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.apartmentService.getApartmentsByCriteria(this.rooms, this.price, this.quarter).subscribe(
        (response: Apartment[]) => {
          this.apartmentsList = response;
          this.apartmentsList.sort(function (a, b) {
            return b.price - a.price;
          });
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          alert('Будь ласка, заповніть всі поля форми правильно');

        }
      );
    }
  }

}
