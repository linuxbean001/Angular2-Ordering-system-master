import { Injectable } from '@angular/core';
import { ApiRouterService } from '../api-router.service';
import { Http, Response ,Headers, RequestOptions} from '@angular/http';
import { LocalstorageService } from '../localstorage.service';
import { HeadersClass } from '../headers';
@Injectable()
export class FriendsService extends HeadersClass {

  constructor(private http: Http, private apiRouter: ApiRouterService) {
    super();
  }
  
  getFriends(){
    return this.http.get(this.apiRouter.getFriendsRoute(), this.options)
            .map(
                (response: Response) => response.json() 
              );
  }
  
  addFriend(friend: any){
    return this.http.put(this.apiRouter.getFriendsRoute()+"/"+friend,{}, this.options)
            .map(
                (response: Response) => response.json() 
              );
  }
  removeFriend(friend: any){
    console.log(this.apiRouter.getFriendsRoute()+"/"+friend);
        return this.http.delete(this.apiRouter.getFriendsRoute()+"/"+friend, this.options)
            .map(
                (response: Response) => response.json() 
              );
  }
  
}
