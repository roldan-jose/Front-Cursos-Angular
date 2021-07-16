import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private suscripcion: Subscription = new Subscription();

  FormRegister = this.FB.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private AuthService: AuthService,
              private FB: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void{
    this.suscripcion.unsubscribe();
  }

  get UsuarioInvalid(): any{
    return this.FormRegister.get('userName')?.invalid && this.FormRegister.get('userName')?.touched;
  }
  get EmailInvalid(): any{
    return this.FormRegister.get('email')?.invalid && this.FormRegister.get('email')?.touched;
  }
  get PassInvalid(): any{
    return this.FormRegister.get('password')?.invalid && this.FormRegister.get('password')?.touched;
  }

  OnRegister(): void{


    if (this.FormRegister.invalid){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Los campos están vacios o los datos no son congruentes',
        showConfirmButton: false,
        timer: 1800
      });
    }
    const FormValues = this.FormRegister.value;
    this.suscripcion.add(
    this.AuthService.RegisterUser(FormValues).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: '→ Registrado Correctamente ←',
        showCloseButton: true,
        allowOutsideClick: false
      }).then((res) => {
        if (res.value) {
            this.router.navigate(['login']);
        }
      });
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
