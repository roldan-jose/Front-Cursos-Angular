import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICursosResponse } from '../../../../models/modelsCursosApp/cursos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos-nuevo',
  templateUrl: './cursos-nuevo.component.html',
  styleUrls: ['./cursos-nuevo.component.css']
})
export class CursosNuevoComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  cursosN: ICursosResponse = {} as ICursosResponse;
  formCursoN: FormGroup;

  constructor(private serviceCursos: CursosService,
              private fb: FormBuilder,
              private router: Router) { }
              
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.InitForm();
  }


  Guardar(): void{
    if (this.formCursoN.valid){
      const cursosNuevo: ICursosResponse = {
        idCurso: this.formCursoN.get('id')?.value,
        codigo: this.formCursoN.get('codigo')?.value,
        descripcion: this.formCursoN.get('nombreMat')?.value,
        estado: this.formCursoN.get('estado')?.value
      }
      this.subs.add(
      this.serviceCursos.CreateCursos(cursosNuevo).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Realizado!',
          text: `→ Materia ${cursosNuevo.descripcion} Agregado Exitosamente ←`,
          showCloseButton: true,
          allowOutsideClick: false
        }).then((res) => {
          if (res.isConfirmed){
            this.router.navigate(['/cursos']);
          }
        });
      }))
    }else{
      console.log('invalid'); 
    }
  }

  InitForm(): void{
    this.formCursoN = this.fb.group({
        id: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        codigo: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        nombreMat: ['', [Validators.required, Validators.minLength(5)]],
        estado: ['']
      });
  }

  isValidForm(field: string): string{
    const validF = this.formCursoN.get(field);
    return (!validF.valid && validF.touched)
    ? 'is-invalid' : validF.touched ? 'is-valid' : '';
  }

}
