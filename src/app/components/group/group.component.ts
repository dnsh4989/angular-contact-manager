import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnDestroy{
	constructor(
	  private route: ActivatedRoute,
	  public authService: AuthService,
	  public dataService: DataService,
	  public router: Router
	) {}

	gid;
	contacts;
	contacts2;
	groupName;
	contactName;
	email;
	age;
	phone_number;
	status;
	description;
	designation;
	showAddModal: boolean = false;
	showEditModal: boolean = false;
	showViewModal: boolean = false;
	showModal: boolean = false;
	currentContactId: string;
	searchKey: string;
	pageCount: number = 5;
	count: number = 5;
	pageIndex: number = 1;
	currentPages:any[] = [];

	pageWiseContacts = [];
	currentContacts = [];

	subscription1;

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			console.log(params['id']);
			this.gid = params['id'];

			this.getContacts();
			this.getGroupData();
		});

		(<any>document.getElementsByClassName('mainBox')[0]).style['background-image'] = "none";
	}

	search(){
		this.contacts = [];
		for(var i=0; i<this.contacts2.length; i++){
		  if(this.contacts2[i].contact_name.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase())){
		    this.contacts.push(this.contacts2[i]);
		    this.paginate(1);
		  }
		}
	}

	setCount(){
	    if(this.count<1 || this.count>20){
	      return false;
	    }
	    this.pageCount = this.count;
	    this.paginate(1);
	  }

	paginate(ind){
	    var noOfPages;
	    if(this.contacts.length%this.pageCount == 0){
	      noOfPages = this.contacts.length/this.pageCount;
	    }else{
	      noOfPages = Math.floor(this.contacts.length/this.pageCount)+1;
	    }

	    if(ind<1 || ind>noOfPages){
	      return false;
	    }

	    this.pageIndex = ind;

	    console.log(noOfPages);

	    this.pageWiseContacts = [];
	    for(var i=0; i<noOfPages; i++){
	      this.pageWiseContacts.push([]);
	      for(var j=0; j<this.pageCount; j++){
	        if(this.contacts[(i)*this.pageCount+j]){
	          this.pageWiseContacts[i].push(this.contacts[(i)*this.pageCount+j]);
	        }
	      }
	    }

	    console.log(this.pageWiseContacts);

	    this.currentPages = [];

	    for(var i=0; i<this.pageWiseContacts.length; i++){
	      this.currentPages.push(i+1);
	      if(this.pageIndex == i+1){
	        this.currentContacts = this.pageWiseContacts[i];
	      }
	    }

	    console.log(this.currentContacts);

	  }

	getContacts(){
		this.subscription1 = this.dataService.getContactsByGroupId(this.gid).subscribe((data) => {
	      console.log(data);
	      this.contacts = data;
	      this.contacts2 = data;
	      this.paginate(1);
	    });
	}

	getGroupData(){
		this.dataService.getGroupByGroupId(this.gid).then((data) => {
	      console.log(data);
	      this.groupName = data.group_name;
	      this.description = data.description;
	    });
	}

	addContact(){
		this.showModal = true;
		this.showAddModal =true;
	}

	editContact(contact){
		this.showModal = true;
		this.showEditModal =true;
		this.contactName = contact.contact_name;
		this.designation = contact.designation;
		this.email = contact.email;
		this.age = contact.age;
		this.phone_number = contact.phone_number;
		this.status = contact.status;
		this.currentContactId = contact.id;
	}

	viewContact(contact){
		this.showModal = true;
		this.showViewModal =true;
		this.contactName = contact.contact_name;
		this.designation = contact.designation;
		this.email = contact.email;
		this.age = contact.age;
		this.phone_number = contact.phone_number;
		this.status = contact.status;
	}

	closeModal(){
		this.showAddModal = false;
		this.showEditModal = false;
		this.showViewModal = false;
		this.showModal = false;
	}

	contactAdded(){
		this.closeModal();
	}

	contactEdited(){
		this.closeModal();
	}

	contactDeleted(){
		this.closeModal();
	}

	ngOnDestroy(){
		if(this.subscription1){
			this.subscription1.unsubscribe();
		}
	}
}