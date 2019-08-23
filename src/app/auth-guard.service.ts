import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate
} from '@angular/router';

import {select, Store} from "@ngrx/store";
import {getAccount, IClientState} from "./store/login.reducer";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private account = null;

  constructor(private store: Store<IClientState>,
              private router: Router) {
    this.store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if (this.account) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
