import { Injectable, EventEmitter} from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { ApiRouterService } from '../api-router.service';
import 'rxjs/Rx';
import { HeadersClass } from '../headers';
@Injectable()
export class GroupsService extends HeadersClass{
  refreshGroups = new EventEmitter<number>();
  constructor(private http: Http, private apiRouter: ApiRouterService) {
    super() ;
  }

  getGroups(){
  	return this.http.get(this.apiRouter.getGroupsRoute(), this.options)
            .map(
                (response: Response) => response.json()

              ) ;
  }

  addGroup(group: any){
    let groupObj = JSON.stringify(group) ;
    console.log(groupObj)
    return this.http.post(this.apiRouter.getGroupsRoute(),groupObj, this.options)
            .map(
                (response: Response) => response.json()
              );
  }

  deleteGroup(id: number){
  	return this.http.delete(this.apiRouter.getGroupsRoute()+"/"+id, this.options)
            .map(
                (response: Response) => response.json()
              );
  }

  updateGroup(id: number, name: string, members: Array<Object>){
  	return ;
  }
  getGroup(id: any){
    return this.http.get(this.apiRouter.getGroupsRoute()+"/"+id, this.options)
            .map(
                (response: Response) => response.json()

              ) ;
  }
}
