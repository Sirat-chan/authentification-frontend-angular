import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
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
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      this.http.post('http://localhost:8083/api/user/update', formData, {headers}).subscribe(
        response => {
          console.log('Profile updated', response);
          alert('Profile updated successfully!');
        },
        error => {
          console.error('Error updating profile', error);
          alert('Error updating profile.');
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }

  }
}
