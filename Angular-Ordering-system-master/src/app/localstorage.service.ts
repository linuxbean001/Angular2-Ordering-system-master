import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }
  public setAccessToken(token: string){
  	localStorage.setItem('access_token', token) ;
  }
  public getAccessToken(){
  	return localStorage.getItem('access_token') ;
  }
  public removeAccessToken(){
  	if(localStorage.getItem('access_token')){
  		localStorage.removeItem('access_token');
  	}
  }
  public getLoggedUserId(){
    return this.getData().id;
  }
  public setData(data: any){
  	localStorage.setItem('data',JSON.stringify(data));
  }
  public getData(){
  	return JSON.parse(localStorage.getItem('data')) ;
  }
  public removeData(){
    localStorage.removeItem('data');
  }
  public getProfilePic(){
    return "http://sample-env.ccipqw5fip.us-west-1.elasticbeanstalk.com/"+this.getData().profile ; 
  }
  public test(){
    return true ;
  }
  public getUsername(){
    return this.getData().name;
  }
  public isLoggedIn(){
    return localStorage.getItem('access_token') != null ;
  }
  public removeStoredData(){
    this.removeAccessToken();
    this.removeData();
  }
}
