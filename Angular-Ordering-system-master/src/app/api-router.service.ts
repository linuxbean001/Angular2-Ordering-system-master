import { Injectable } from '@angular/core';

@Injectable()
export class ApiRouterService {
  private auth = {
		registeration: "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/auth/register",
		login: "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/auth/login"
	}
  private users = "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/user"
  private groups = "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/group";
  private orders = "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/order";
  constructor() { }

  private friends = "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/friends";
  private notifications = "http://Sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/notification"
	public getRegisterationRoute(){
		return this.auth.registeration ;
	}
	public getLoginRoute(){
		return this.auth.login;
	}

	public getGroupsRoute(){
		return this.groups;
	}

	public getFriendsRoute(){
		return this.friends;
	}
	public getUsersRoute(){
		return this.users;
	}
	public getOrdersRoute(){
		return this.orders;
	}
  public getNotificationsRoute(){
    return this.notifications;
  }
}
