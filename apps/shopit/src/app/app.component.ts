import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'shopit-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private userServ:UsersService){

  }
  ngOnInit(){
    this.userServ.initAppSession();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  title = 'shopit';
}
