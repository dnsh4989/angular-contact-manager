import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditContactComponent implements OnDestroy{
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router,
	  public snackBar: MatSnackBar
	) {}

	@Input() gid;
	@Input() cid;
	contacts;
	groupName;
	@Input() name;
	@Input() designation;
	@Input() email;
	@Input() age;
	@Input() phone_number;
	@Input() status;

	@Output() edited = new EventEmitter(); 
	@Output() deleted = new EventEmitter(); 

	@Output() clickedOutside = new EventEmitter(); 

	subscription1;

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

	editContact(){
		if(!this.validateFields()){
			return false;
		}
		let req = {
			contact_name: this.name,
			designation: this.designation,
			email: this.email,
			age: this.age,
			phone_number: this.phone_number,
			status: this.status
		}
		this.dataService.editContact(this.gid, this.cid, req).then(() => {
			this.edited.emit();
		});
	}

	deleteContact(){
		this.dataService.deleteContact(this.gid, this.cid).then(() => {
			this.deleted.emit();
		});
	}

	ngOnDestroy(){
		// this.subscription1.unsubscribe();
	}
}