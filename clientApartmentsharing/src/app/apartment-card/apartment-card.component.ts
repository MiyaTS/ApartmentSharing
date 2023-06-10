import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apartment} from "../apartment";
import {HttpErrorResponse} from "@angular/common/http";
import {UserEntity} from "../user";
import {ApartmentService} from "../services/apartment.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-apartment-card',
  templateUrl: './apartment-card.component.html',
  styleUrls: ['./apartment-card.component.css', '../home/home.component.css', '../../assets/bootstrap.min.css']
})
export class ApartmentCardComponent implements OnInit {
  @Input() childApartment!:Apartment;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  public user: UserEntity;
  public editApartment!: Apartment;
  public apartment!:Apartment;
  public apartments!:Apartment[];

  constructor(private apartmentService: ApartmentService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = tokenStorageService.getUser();
  }


  ngOnInit(): void {
    this.getApartments();
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

}
