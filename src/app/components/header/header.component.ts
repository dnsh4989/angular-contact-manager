import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
	constructor(
		public afs: AngularFirestore,
    public authService: AuthService,
    public dataService: DataService,
    public router: Router
	) {}

  uid: string;
  user;
  subscription1;
  subscription2;

  ngOnInit(){
    this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
        this.subscription2 = this.dataService.getUserInfoByUid(user.uid).subscribe((data)=>{
          console.log(data);
          this.user = data[0];
        });
    });
  }

  signOut(){
    this.authService.logout().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
      console.log('An error happened.');
    });;
    this.router.navigate(['/login']);
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
