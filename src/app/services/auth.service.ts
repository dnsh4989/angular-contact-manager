import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {
	constructor(
		public af: AngularFireAuth
	) {
		this.af.authState.subscribe(user => { 
			console.log(user);
			if(user) {
				this.user = user;
				this.uid = user.uid;
			}
	    });
	}

	user: any;
	uid: string;

	login(email, pass){
		return this.af.auth.signInWithEmailAndPassword(email, pass);
	}

	logout(){
		return this.af.auth.signOut();
	}

	signup(email, pass){
		return this.af.auth.createUserWithEmailAndPassword(email, pass);
	}

	isLoggedin(): Observable<any>{
		return this.af.authState;
	}

}