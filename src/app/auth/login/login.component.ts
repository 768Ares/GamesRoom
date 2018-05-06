import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  info: string;
  xAndO: boolean;

  constructor(public authService: AuthService, private route: ActivatedRoute) {
    // this.authService.getXAndOObs().subscribe(data => {
    //   this.xAndO = data;
    // });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['name'] === 'OAndXComponent') {
        this.info = 'Aby mieć dostęp do gry Kolko i krzyzyk musisz się zalogować';
        // this.xAndO = true;
        this.authService.changeXAndOObs(true);
      } else {
        this.info = null;
        // this.xAndO = false;
        this.authService.changeXAndOObs(false);
      }
    });
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }

  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
  }

}
