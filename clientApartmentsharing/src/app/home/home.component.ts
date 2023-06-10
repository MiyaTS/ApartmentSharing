import { Component, OnInit } from '@angular/core';
import {Apartment} from "../apartment";
import {HttpErrorResponse} from "@angular/common/http";
import {ApartmentService} from "../services/apartment.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  apartments!: Apartment[];
  rentForm!: FormGroup;
  Object = Object;

  quarter = [
    'Шевченківський',
    'Личаківський',
    'Галицький',
    'Сихівський',
    'Франківський',
    'Залізничний'
  ];

  constructor(private apartmentService: ApartmentService, private userService: UserService, private tokenStorageService: TokenStorageService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.rentForm = this.formBuilder.group({
      rooms: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      price: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      quarter: ['', Validators.required]});
    this.getApartments();
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:write'))
      this.isAdmin = true;
  }

  numberValidator(control: FormControl) {
    const isNumber = !isNaN(control.value);
    return isNumber ? null : { numberInvalid: true };}

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
  onSubmit() {
    if (this.rentForm.invalid) {
      alert('Будь ласка, заповніть всі поля форми правильно');
      return;
    }
  }

}
