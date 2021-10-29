import { Component , ViewChild} from '@angular/core';
import { SharedService } from './shared.service';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  UsersList:Array<any>
  inputUserName:any
  postdata :any
  isShown: boolean = true ;
  @ViewChild('inputName') inputName:any; 

  constructor(private Service: SharedService,
    private toaster:ToastrService) {
    this.UsersList = new Array<any>()
   }

   ngOnInit(): void {
      this.refreshUserList();
   }

  // getDataFromAPI(){
  //   this.isShown = ! this.isShown;
  //   this.Service.getUsersList().subscribe((data) =>{
  //     this.UsersList = data;
  //   }) 
  // }

  addUser(form:NgForm){
    this.postdata = 
    {
      "userName": form.value.userName,
      "userEmail": form.value.userEmail,
      "userMobile": form.value.userMobile
    }
    this.Service.postUser(this.postdata).subscribe(res => {
        this.toaster.success("Submitted successfully")
        this.inputUserName = "Hello " + form.value.userName + " !!"
        this.refreshUserList();
        form.reset();
        },
    err => 
    {
      this.toaster.error("Server not responding...","Something went wrong !!")
    });
    
  }
      
  refreshUserList(){
    this.Service.getUsersList().subscribe((data) =>{
      this.UsersList = data;
    });
  }

}
