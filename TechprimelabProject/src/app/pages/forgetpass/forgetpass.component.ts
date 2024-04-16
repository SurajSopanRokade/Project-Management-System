import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet,
    RouterLink, ReactiveFormsModule,HttpClientModule],
  providers:[SessionService],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent implements OnInit {
  userlist:any[]=[];
  userForm!:FormGroup;
  isFormSubmitted:boolean = false;
  userData:any;
  user: User | undefined; 


   queryValue:string|any;

constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute, private snackBar: MatSnackBar, private sessionservice:SessionService){}


onSubmit(){
console.log(this.userForm.valid)
debugger
console.log(this.userForm.value)

}

ngOnInit(): void {
  this.userForm=this.fb.group({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  })
  this.route.paramMap.subscribe(x=>{
    this.queryValue=x.get('userId');
  })
  if (this.queryValue != '') {
    this.snackBar.open(this.queryValue, 'Close', {
      duration: 3000 
    });
  }

}

get email(){
  return this.userForm.get('email')
}
get password(){
  return this.userForm.get('password')
}

getUserByEmail(): void {
  const { email } = this.userForm.value
  this.sessionservice.findByEmail(email).subscribe(
    (data: any) => {
      this.user = data;
      console.log('User Data:', this.user); 
    },
    (error) => {
      console.error('Error fetching user:', error);
    }
  );
}



updateUser() {
  this.getUserByEmail();
  this.userData = this.userForm.value;
  
  if (this.user) {
    this.user.password = this.userData.password;
  
    if (!this.isFormSubmitted) {
      this.sessionservice.updateUser(this.user).subscribe(
        updatedUser => {
          console.log('User updated successfully:', updatedUser);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}



}
