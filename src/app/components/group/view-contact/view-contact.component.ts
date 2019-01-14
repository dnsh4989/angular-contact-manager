import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent {
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router
	) {}

	gid;
	contacts;
	groupName;
	@Input() name;
	@Input() designation;
	@Input() email;
	@Input() age;
	@Input() phone_number;
	@Input() status;

	@Output() clickedOutside = new EventEmitter(); 

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
}