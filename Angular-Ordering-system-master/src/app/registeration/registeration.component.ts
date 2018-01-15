import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { RegisterationService } from './registeration.service';
import { Response } from '@angular/http';
import { Router} from '@angular/router';
import { FileToBase64Service } from '../file-to-base64.service';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
  providers:[ RegisterationService ]
})
export class RegisterationComponent implements OnInit {
  submitted = false ; 
  user = {
    name:"",
    email:"",
    image:"",
    password:"",
    confirm_password:"" 
  };
  errors = [] ;
  success_message : string = "" ;
  constructor(private fileToBase64Service: FileToBase64Service, private registerationService: RegisterationService, private router: Router) {
    this.fileToBase64Service.fileToBase64Event.subscribe(
        (base64Format: any) => {this.user.image = base64Format ;console.log(this.user);}
      )
   }

  ngOnInit() {

  }
  selectImage(input: any){
    let allowed_extensions = ['image/jpeg','image/png','image/jpg'] ;
    let file = input.files[0]; 
    if(allowed_extensions.indexOf(file.type) != -1 ){
      this.fileToBase64Service.convert(file);
      this.errors = [] ;
    }
    else
      this.errors.push("Only images with png, jpeg, jpg extensions are allowed");
  }

  validateForm(): Array<string>{
    let errors = [] ;
    for (var property in this.user) {
        if (this.user.hasOwnProperty(property)) {
          if(this.user[property].trim() == ""){
            errors.push(property + " Cannot be Empty ") ;
          }
        }
    }
    return errors; 
  }

  registerUser(userObj: any){
    this.registerationService.register(JSON.stringify(userObj)).subscribe(
      (response: any) => {
        // if any errors occured view them to user
        if(!response.loggedIn){
          this.errors = response.errors;
        }else{
          // if successfully registere, redirect to login page 
          this.success_message = "Registered Successfully!\n Redirecting...";
          this.errors = [] ;
          setTimeout(() => this.router.navigate(['/login']) ,2000);
        }
      } 
      ) ; 
  }

  onSubmit(){
    this.errors = this.validateForm();
    if(this.errors.length == 0){
      let userObj = {"name": this.user.name, "email": this.user.email, "password": this.user.password, 'repassword': this.user.confirm_password, profile:this.user.image };
      this.registerUser(userObj);
    }else{
      console.log('invalid')
    }
  }

}

// Helper functions 

function emailValidator(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}
function validateEmail(email){
  if(!emailValidator(email.value)){
    email.valid = false ;
  }
}