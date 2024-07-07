import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent {
  profileForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  token: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthentificationService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profileImage: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }




  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.profileForm.get('name')?.value);
      formData.append('email', this.profileForm.get('email')?.value);
      formData.append('password', this.profileForm.get('password')?.value);
      if (this.selectedFile) {
        formData.append('profileImage', this.selectedFile);
      }

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post('http://localhost:8083/api/user/update', formData, { headers, observe: 'response', responseType: 'text' }).subscribe(
        response => {
          console.log('Profile updated', response);
          if (response.status === 200) {
            const responseBody = response.body as string;
            try {
              // Check if responseBody is JSON
              const parsedData = JSON.parse(responseBody);
              console.log('Parsed response:', parsedData);
              alert('Profile updated successfully!');
            } catch (e) {
              // If not JSON, treat it as plain text
              console.warn('Response is not JSON:', responseBody);
              alert(responseBody);  // Show the plain text response
            }
          } else {
            console.error('Unexpected response status', response);
            alert('Unexpected response status.');
          }
        },
        error => {
          console.error('Error updating profile', error);
          if (error.status === 200) {
            console.warn('Received 200 response but entered error block', error);
            alert('Profile updated successfully!');
          } else {
            alert('Error updating profile.');
          }
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }


}
