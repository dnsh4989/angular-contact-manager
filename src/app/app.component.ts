import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	public afs: AngularFirestore;
	constructor(
		afs: AngularFirestore
	) {
        this.afs = afs;
    }

    ngOnInit(){
    	console.log("App works..");
    }
}
