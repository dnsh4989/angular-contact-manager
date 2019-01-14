import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
	constructor(
		public afs: AngularFirestore,
    public authService: AuthService,
    public dataService: DataService,
    public router: Router,
    public snackBar: MatSnackBar
	) {}

  groups: any;
  groups2: any;
  uid: string;
  user;
  showModal: boolean = false;
  showAddGroup: boolean = false;
  showEditGroup: boolean = false;
  currentGroup;
  searchKey: string;
  pageCount: number = 5;
  count: number = 5;
  pageIndex: number = 1;
  currentPages:any[] = [];

  pageWiseGroups = [];
  currentGroups = [];

  subscription1;
  subscription2;
  subscription3;

  ngOnInit(){
    this.getGroupsData();

  	this.subscription1 = this.dataService.getAllGroups().subscribe((data)=>{
      console.log(data);
    });
    
    (<any>document.getElementsByClassName('mainBox')[0]).style['background-image'] = "none";
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
    if(this.groups.length%this.pageCount == 0){
      noOfPages = this.groups.length/this.pageCount;
    }else{
      noOfPages = Math.floor(this.groups.length/this.pageCount)+1;
    }

    if(ind<1 || ind>noOfPages){
      return false;
    }

    this.pageIndex = ind;

    console.log(noOfPages);

    this.pageWiseGroups = [];
    for(var i=0; i<noOfPages; i++){
      this.pageWiseGroups.push([]);
      for(var j=0; j<this.pageCount; j++){
        if(this.groups[(i)*this.pageCount+j]){
          this.pageWiseGroups[i].push(this.groups[(i)*this.pageCount+j]);
        }
      }
    }

    console.log(this.pageWiseGroups);

    this.currentPages = [];

    for(var i=0; i<this.pageWiseGroups.length; i++){
      this.currentPages.push(i+1);
      if(this.pageIndex == i+1){
        this.currentGroups = this.pageWiseGroups[i];
      }
    }

    console.log(this.currentGroups);

  }

  search(){
    this.groups = [];
    for(var i=0; i<this.groups2.length; i++){
      if(this.groups2[i].group_name.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase())){
        this.groups.push(this.groups2[i]);
        this.paginate(1);
      }
    }
  }

  getGroupsData(){
    this.subscription2 = this.authService.isLoggedin().subscribe((user) => {
      if(user){
        this.uid = user.uid;
      }
      this.subscription3 = this.dataService.getGroupsByUid(this.uid).subscribe((data) => {
        console.log(data);
        this.groups = data;
        this.groups2 = data;

        this.paginate(1);
      });
    });
  }

  goToGroup(gid){
    console.log(gid);
    this.router.navigate(["/group/"+gid]);
  }

  addGroup(){
    this.showModal = true;
    this.showAddGroup = true;
  }

  closeModal(){
      this.showModal = false;
      this.showAddGroup = false;
      this.showEditGroup = false;
  }

  editGroup(group){
    this.currentGroup = group;
    this.showModal = true;
    this.showEditGroup = true;
  }

  groupEdited(){
    this.closeModal();
  }

  groupDeleted(){
    this.closeModal();
  }

  groupAdded(){
    this.closeModal();
  }

  ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();  
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();  
    }
    if(this.subscription3){
      this.subscription3.unsubscribe();  
    }
  }
}
