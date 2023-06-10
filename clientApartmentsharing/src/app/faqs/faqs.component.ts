import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css', '../home/home.component.css']
})
export class FaqsComponent implements OnInit {
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
