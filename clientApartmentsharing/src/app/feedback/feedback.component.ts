import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css', './../home/home.component.css']
})
export class FeedbackComponent implements OnInit {
  isAdmin = false;
  constructor() { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:create'))
      this.isAdmin = true;
  }

}
