import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../service/auth.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    valCheck: string[] = ['remember'];
    username!: string;
    password!: string;
    data: any;
    submitted: boolean = false;

    ngOnInit() {
        // this.form = this.formBuilder.group({
        //     username: ['', Validators.required],
        //     password: ['', Validators.required],
        // });
    }
    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {}
    onSubmit(): void {
        this.submitted=true;
        if (this.username?.trim()) {
        this.authService.login(this.username, this.password).subscribe(
          token => console.log('Logged in successfully'),
          error => console.log('Failed to log in', error)
        );
        console.log(this.authService.isAuthenticated())
        }
      }
}
