import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditGroupComponent implements OnDestroy{
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router,
	  public snackBar: MatSnackBar
	) {}

	@Input() name;
	@Input() description;
	@Input() status;
	@Input() gid;

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
		if($event.target.id == "myModal"){
			this.clickedOutside.emit();
		}
	}

	validateFields(){
		if(!this.name || !this.description || !this.status){
			this.snackBar.open('Please fill all the fields', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}
		return true;
	}

	editGroup(){
		if(!this.validateFields()){
			return false;
		}
		this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
	      if(user){
	        var req = {
				group_name: this.name,
				description: this.description,
				status: this.status,
				created_by: user.uid
			}
			this.dataService.editGroupWithGroupId(this.gid, req).then(() => {
				this.edited.emit();
			});
	      }
	    });
	}

	deleteGroup(){
		this.dataService.deleteGroupWithGroupId(this.gid).then(() => {
			this.deleted.emit();
		});
	}

	ngOnDestroy(){
		if(this.subscription1){
			this.subscription1.unsubscribe();
		}
	}
}