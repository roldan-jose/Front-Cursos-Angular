import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscrip: Subscription = new Subscription();

  FormLogIn = this.FB.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private AuthService: AuthService,
              private FB: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.subscrip.forEach(sub => sub.unsubscribe());
    this.subscrip.unsubscribe();
  }

  get UsuarioInvalid(): any{
    return this.FormLogIn.get('email')?.invalid && this.FormLogIn.get('email')?.touched;
  }

  get PassInvalid(): any{
    return this.FormLogIn.get('password')?.invalid && this.FormLogIn.get('password')?.touched;
  }


  OnLogIn(): void{

    if (this.FormLogIn.invalid){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Los campos están vacios o los datos no son congruentes',
        showConfirmButton: false,
        timer: 1800
      });
    }

    const FormValue = this.FormLogIn.value;
    this.subscrip.add(
    this.AuthService.Login(FormValue).subscribe(response => {
      if (response){
        this.router.navigate(['/home']);
      }
    }));
  }

  RedesSocialesProxim(): void{
    Swal.fire({
      icon: 'info',
      title: '¡PROXIMAMENTE!',
      text: 'Inicio de sesión con redes sociales proximamente.',
      showConfirmButton: false,
      timer: 1500
    });
  }


}
