import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LocalstorageService } from   '../localstorage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = ""; 
  form: any;
  error = false;
  constructor(private loginService: LoginService, private localstrg: LocalstorageService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: any){
  	if(this.email.length != 0 && this.validateEmail(this.email) && this.password.length != 0){
      this.loginService.login(this.email, this.password).subscribe(
          (response: any) => {
            console.log(response);  
            this.error = response.loggedIn 
            if(response.loggedIn){
              this.localstrg.setAccessToken(response.access_token);
              console.log(response.access_token)
              this.localstrg.setData(response.data);
              this.router.navigate(['/friends'])
            }else{
              this.error = true;
            }

          }

        );
    }
  }

  loginFacebook(){
    console.log('login facebook', );

  }

  loginGoogle(){
    console.log('login facebook', );

  }

  emailValidator(email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(email);
  }

  validateEmail(email){
    if(!this.emailValidator(email)){
      console.log('false');
      return false ;
    }else{
      console.log('true');
      return true;
    }
  }


}

