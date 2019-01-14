import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddGroupComponent implements OnDestroy{
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router,
	  public snackBar: MatSnackBar
	) {}

	groupName: string;
	description: string;
	status: string;
	@Input() gid;
	@Output() added = new EventEmitter(); 
	@Output() clickedOutside = new EventEmitter(); 

	subscription1;
	subscription2;

	ngOnInit() {
		
	}

	close(){
		this.clickedOutside.emit();
	}

	closeModal($event){
		if($event.target.id == "myModal"){
			this.clickedOutside.emit();
		}
	}

	validateFields(){
		if(!this.groupName || !this.description || !this.status){
			this.snackBar.open('Please fill all fields', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}
		return true;
	}

	addGroup(){
		if(!this.validateFields()){
			return false;
		}
		this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
	      if(user){
	        var req = {
				group_name: this.groupName,
				description: this.description,
				status: this.status,
				created_by: user.uid
			}
			this.dataService.addGroup(req).then((adRef) => {
		            console.log(adRef);
		            this.added.emit();
		        })
		        .catch(function (error) {
		            return 'Failed';
		        });
	      }
	    });
	}

	ngOnDestroy(){
		if(this.subscription1){
			this.subscription1.unsubscribe();
		}
	}
}