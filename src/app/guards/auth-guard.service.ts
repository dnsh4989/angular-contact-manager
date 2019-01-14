import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    	private router: Router, 
    	private authService: AuthService
    ) { }

    canActivate(): Observable<boolean> | boolean{
        return this.authService.isLoggedin().pipe(
        		map(user => {
    		          if(user){
    		          	return true;
    		          }else{
    		          	this.router.navigate(['/login']);
    		          	return false;
    		          }
    		      	}
    		    )
        	)
    }
}