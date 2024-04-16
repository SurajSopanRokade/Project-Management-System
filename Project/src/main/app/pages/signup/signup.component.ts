import { Component, OnInit, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectServiceService } from '../../services/project-service.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterOutlet, RouterLink,
            ReactiveFormsModule,HttpClientModule],
  providers:[ProjectServiceService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  userlist:any[]=[];
  userForm!:FormGroup;
  isFormSubmitted:boolean = false;


   queryValue:string|any;

constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute, private projectservice:ProjectServiceService,private snackBar: MatSnackBar){}


onSubmit(){
console.log(this.userForm.valid)
debugger
console.log(this.userForm.value)

}

ngOnInit(): void {
  this.userForm=this.fb.group({

   
  
    username: new FormControl('',[Validators.required]),
    contact: new FormControl('',[Validators.required, Validators.minLength(10)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    address:new FormControl('',Validators.required) 
  })
  this.route.paramMap.subscribe(x=>{
    this.queryValue=x.get('userId');
  })
  if (this.queryValue != '') {
    this.snackBar.open(this.queryValue, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }

  this.getAllUser()
}


get userId(){
  return this.userForm.get('userId')
}
get username(){
  return this.userForm.get('username')
}
get contact(){
  return this.userForm.get('contact')
}

get email(){
  return this.userForm.get('email')
}
get password(){
  return this.userForm.get('password')
}
get address(){
  return this.userForm.get('address')
}

get userRole(){
  return this.userForm.get('userRole')
}


  saveuser() {
    let userData  = this.userForm.value;
    if (!this.isFormSubmitted) {
      this.projectservice.postRequest("user/saveUser",userData ).subscribe(result => {
       
        this.snackBar.open('Registration successful. Please login.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success'] 
        });
        
        this.userForm.reset();
      
        this.router.navigate(['/login']);
      });
    }
  }


  getAllUser(){
    this.projectservice.getRequest("user/getAllUsers").subscribe(result=>{
      this.userlist=result;
      console.log(this.userlist);
    })
  
  }

  editUser(u:any){
    this.isFormSubmitted=true;
    this.userForm.setValue({
      username:u.username,
      contact:u.contact,
      email:u.email,
      password:u.password,
      address:u.address,
      userRole:u.userRole
    });
  }

  // deleteUser(id:number){
  //   let response=confirm('Do you want to delete '+id +' ?');
  //   if(response==true){
  //     console.log("pid:"+id);
  //   this.signupservice.deleteUser(id).subscribe(result=>{
  //     this.getAllUser();
  //   })
  // }
  // }
  // onSubmit(): void {
  //   if (this.signupForm.valid) {
  //     this.userService.signup(this.signupForm.value).subscribe(
  //       (response: any) => {
  //         console.log('User registered successfully:', response);
  //         // Redirect the user to another page or show a success message
  //       },
  //       (error: { status: number; }) => {
  //         console.error('Error registering user:', error);
  //         if (error.status === 409) {
  //           this.errorMessage = 'User with this email or contact already exists.';
  //         } else {
  //           this.errorMessage = 'An unexpected error occurred. Please try again later.';
  //         }
  //       }
  //     );
  //   }
  // }


}




 // username:["",Validators.required],
    // address:["",Validators.required],
    // contact:["",Validators.required, Validators.minLength(10),],
    // email:["",Validators.required, Validators.email,],
    // password:["",Validators.required, Validators.minLength(6),]

      // constructor(){
//   this.userForm = new FormGroup({
//     username: new FormControl('',[Validators.required]),
//     contact: new FormControl('',[Validators.required, Validators.minLength(10)]),
//     email: new FormControl('',[Validators.required,Validators.email]),
//     password: new FormControl('',[Validators.required,Validators.minLength(6)]),
//     address:new FormControl('',Validators.required) 
//   })
// }