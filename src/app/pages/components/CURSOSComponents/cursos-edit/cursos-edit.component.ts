import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { ICursosResponse } from '../../../../models/modelsCursosApp/cursos.interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos-edit',
  templateUrl: './cursos-edit.component.html',
  styleUrls: ['./cursos-edit.component.css']
})
export class CursosEditComponent implements OnInit, OnDestroy {
    private subs: Subscription = new Subscription();
  cursosN: ICursosResponse = {} as ICursosResponse;
  formCursoN: FormGroup;
  cursoId = this.activatRoute.snapshot.paramMap.get('id');

  constructor(private serviceCursos: CursosService,
              private fb: FormBuilder,
              private activatRoute: ActivatedRoute,
              private route: Router) {
                this.InitForm();
              }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.LeerCurso();
  }

  Guardar(): void {
    const CursoEdit: ICursosResponse = {
      idCurso: this.formCursoN.get('id')?.value,
      codigo: this.formCursoN.get('codigo')?.value,
      descripcion: this.formCursoN.get('nombreMat')?.value,
      estado: this.formCursoN.get('estado')?.value
    };
    this.subs.add(
    this.serviceCursos.EditCursos(CursoEdit).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Realizado!',
        text: `→ Materia: ${CursoEdit.descripcion} Modificado Con Exito ←`,
        confirmButtonText: `Continuar`,
        showCloseButton: true,
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed){
          this.route.navigate(['/cursos']);
        }
      });
    }));
  }


  InitForm(): void{
    this.formCursoN = this.fb.group({
        id: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        codigo: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        nombreMat: ['', [Validators.required, Validators.minLength(5)]],
        estado: ['']
      });
  }



  LeerCurso(): void{
    this.subs.add(
    this.serviceCursos.ReadCursosId(this.cursoId).subscribe((response: ICursosResponse) => {
      this.cursosN = response;
      this.formCursoN.patchValue({
        id: this.cursosN.idCurso,
        codigo: this.cursosN.codigo,
        nombreMat: this.cursosN.descripcion,
        estado: this.cursosN.estado
      });
    }));
  }

  isValidForm(field: string): string{
    const validF = this.formCursoN.get(field);
    return (!validF.valid && validF.touched)
    ? 'is-invalid' : validF.touched ? 'is-valid' : '';
  }

}
