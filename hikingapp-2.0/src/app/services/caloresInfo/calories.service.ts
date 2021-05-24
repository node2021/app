import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'
import { UserService } from "../user/user.service"

@Injectable()
export class CaloriesService {
    constructor(
		private db : AngularFireDatabase,
        private firestore: AngularFirestore,
        private user: UserService
		) {

	}
    setData(addData){
        let userRef = this.db.object(`caloriesInfo/${this.user.getUID()}`);
        userRef.set(addData);
    }
    compareId(loginId):Promise<any>{    //read data in firebase database and compare userId.
        return new Promise((data) => {
        let userRef = this.db.database.ref();
        // console.log(userRef)
        userRef.child("caloriesInfo").child(loginId).get().then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
              data(snapshot.val());                     // if userId stored before, return datas{age:"*",weight:"*" ...etc}
            }else{
                data("Not")                             //if didn't stored, return "Not":String
            }
          })
        })
    }
}