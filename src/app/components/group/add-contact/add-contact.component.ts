import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddContactComponent implements OnDestroy{
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router,
	  public snackBar: MatSnackBar
	) {}

	contacts;
	groupName;
	name: string;
	designation: string;
	email: string;
	age: number;
	phone_number: number;
	status: string;
	@Input() gid;
	@Output() added = new EventEmitter(); 

	@Output() clickedOutside = new EventEmitter(); 

	// subscription1;

	ngOnInit() {
		
	}

	close(){
		this.clickedOutside.emit();
	}

	closeModal($event){
		if($event.target.id=="myModal"){
			this.clickedOutside.emit();
		}
	}

	validateFields(){
		if(!this.name || !this.designation || !this.email || !this.age || !this.phone_number || !this.status){
			this.snackBar.open('Please fill all the fields', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}else if(!this.validateEmail(this.email)){
			this.snackBar.open('Please enter a valid email', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}
		return true;
	}

	validateEmail(email){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false){
            return false;
        }
        return true;
	}

	addContact(){
		if(!this.validateFields()){
			return false;
		}
		var req = {
			contact_name: this.name,
			designation: this.designation,
			age: this.age,
			email: this.email,
			phone_number: this.phone_number,
			status: this.status
		}
		this.dataService.addContactWithGroupId(this.gid, req).then((adRef) => {
	            console.log(adRef);
	            this.added.emit();
	        })
	        .catch(function (error) {
	            return 'Failed';
	        });
	}

	ngOnDestroy(){
		// this.subscription1.unsubscribe();
	}
}