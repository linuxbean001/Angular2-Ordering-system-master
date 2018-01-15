export class User {
	 
	constructor(public name: string, public email: string, public password?: string, public repassword?: string, public friends: string[] = []){

	}

}
