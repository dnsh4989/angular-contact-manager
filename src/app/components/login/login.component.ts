import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy{
	error: any;
    constructor(
    	public router: Router,
    	public authService: AuthService,
    	public snackBar: MatSnackBar
    ){}

	email: string;
	pass: string;

	user;

	subscription1;
	subscription2;

	ngOnInit(){
		this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
			console.log('User from isLogedIn:');
			console.log(user);
			if(user){
				this.router.navigate(['/home']);
			}
		});
	}

	logIn(){
		if(!this.validateFields()){
			return false;
		}
		this.subscription2 = this.authService.isLoggedin().subscribe((user) => {
			if(!user){
				this.authService.login(this.email, this.pass).then(
					(success) => {
						console.log(success);
						this.router.navigate(['/home']);
					}).catch(
					(err) => {
						console.log(err);
					})
			}else{
				console.log('user already logged in..');
			}
		});
	}

	validateFields(){
		if(!this.email){
			this.snackBar.open('Enter a valid email', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}else if(!this.pass){
			this.snackBar.open('Enter a valid password', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}else if(!this.email.includes("@inmar.com")){
			this.snackBar.open('Enter your inmar email', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}
		return true;
	}

	ngOnDestroy(){
		if(this.subscription1){
	      this.subscription1.unsubscribe();
	    }
	    if(this.subscription2){
	      this.subscription2.unsubscribe();
	    }
	}
}
