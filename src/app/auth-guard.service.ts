import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate
} from '@angular/router';

import {select, Store} from "@ngrx/store";
import {IUserState} from "./store/user.reducer";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private user = null;

  constructor(private store: Store<IUserState>,
              private router: Router) {
    this.store.pipe(select('user')).subscribe(user => {
      this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if (this.user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
