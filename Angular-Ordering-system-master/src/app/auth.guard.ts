import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Rx'
import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate{
	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean{
		let locastorageService: LocalstorageService = new LocalstorageService() ;
		if(locastorageService.isLoggedIn()){
			this.router.navigate(['/home']);
		    // abort current navigation
			
			return false ;
		}else{
		    return true;
		}
	}
}