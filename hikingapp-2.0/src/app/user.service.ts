import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Storage } from '@ionic/storage'
import { first } from 'rxjs/operators' 

interface user {
	username: string,
	uid: string
}

@Injectable()
export class UserService {

	user: user

	constructor(
		private afAuth: AngularFireAuth,
		private storage: Storage
		) {

	}

	setUser(user: user) {
		this.user = user
		this.storage.set('u_data', user);
	}

	getUsername(): string {
		return this.user.username
	}


/*
	reAuth(username: string, password: string) {
		return this.afAuth.currentUser.reauthenticateWithCredential(EmailAuthProvider.credential(username , password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.updateCurrentUser.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.currentUser.updateEmail(newemail + '@codedamn.com')
	}
*/

// checks if the user is authenticated
	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}
}