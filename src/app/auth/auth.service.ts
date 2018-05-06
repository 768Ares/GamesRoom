import { Injectable } from '@angular/core';
import { User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: User;
  private xAndO: boolean;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (this.xAndO) {
          this.router.navigate(['/noughts_and_crosses']);
        } else {
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  signup(email: string, password: string) {
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    this.angularFire.auth.signOut();
  }

  changeXAndOObs(flag: boolean) {
    this.xAndO = flag;
  }
}
