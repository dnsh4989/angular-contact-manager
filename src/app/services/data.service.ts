import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Injectable()
export class DataService {
	constructor(
		public afs: AngularFirestore,
	    public authService: AuthService,
	    public router: Router
	) {}

	groups;

	getAllGroups(){
		return this.afs.collection('/groups').valueChanges();
	}

	getGroupsByUid(uid){
		return this.afs.collection('/groups',  ref => ref.where("created_by", "==", uid))
		    .snapshotChanges().pipe(map(changes => {
		    			return changes.map(a => {
		    				const data = a.payload.doc.data();
		    				(<any>data).id = a.payload.doc.id;
		    				return data;
		    			});
		    		})
		    );
	}

	getContactsByGroupId(gid){
		return this.afs.collection('groups/' + gid + "/contacts/")
		    .snapshotChanges().pipe(map(changes => {
		    			return changes.map(a => {
		    				const data = a.payload.doc.data();
		    				(<any>data).id = a.payload.doc.id;
		    				return data;
		    			});
		    		})
		    );
	}

	getGroupByGroupId(id) {
        return this.afs.doc('groups/' + id).ref.get().then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                console.log("No such document!");
            }
        });
	}

	addContactWithGroupId(gid, contact){
		return this.afs.collection('groups/' + gid + "/contacts/").add(contact);
	}

	getUserInfoByUid(uid){
		return this.afs.collection('/users',  ref => ref.where("uid", "==", uid))
		    .snapshotChanges().pipe(map(changes => {
		    			return changes.map(a => {
		    				const data = a.payload.doc.data();
		    				(<any>data).id = a.payload.doc.id;
		    				return data;
		    			});
		    		})
		    );
	}

	addUser(user){
		return this.afs.collection('users/').add(user);
	}

	addGroup(group){
		return this.afs.collection('groups/').add(group);
	}

	editGroupWithGroupId(gid, group){
		return this.afs.doc('groups/' + gid).set(group);
	}

	deleteGroupWithGroupId(gid){
		return this.afs.doc('groups/' + gid).delete();
	}

	editContact(gid, cid, contact){
		return this.afs.doc('groups/' + gid + '/contacts/' + cid).set(contact);
	}

	deleteContact(gid, cid){
		return this.afs.doc('groups/' + gid + '/contacts/' + cid).delete();
	}
}