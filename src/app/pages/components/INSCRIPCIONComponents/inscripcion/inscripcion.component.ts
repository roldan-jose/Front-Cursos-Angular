import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { IInscripcionRead, IInscripcionResponse, IInscripcionReadCurso } from '../../../../models/modelsCursosApp/inscripcion.interface';
import { IPeriodoActivoResponse } from '../../../../models/modelsCursosApp/periodo-activ.interface';
import { IEstudiantesResponse } from '../../../../models/modelsCursosApp/estudiantes.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  inscripcionData: IInscripcionRead = {} as IInscripcionRead;
  periodoId: IPeriodoActivoResponse = {} as IPeriodoActivoResponse;
  estudianteID: IEstudiantesResponse = {} as IEstudiantesResponse;
  periodoCurso: IInscripcionResponse = {} as IInscripcionResponse;
  formBusqueda: FormGroup;

  constructor(private ServiceCursos: CursosService, private fb: FormBuilder) {
    this.InitForm();
   }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.leerCursos();
    this.leerIdPeriodo();
    this.leerIdEstudiante();
  }


  leerCursos(): void{
    this.subs.add(
    this.ServiceCursos.ReadInscripcion().subscribe(res => {
      this.inscripcionData = res;
    }));
  }

  leerIdPeriodo(): void{
    this.subs.add(
    this.ServiceCursos.ReadPeriodos().subscribe(res => {
      this.periodoId = res;
    }));
  }

  leerIdEstudiante(): void{
    this.subs.add(
    this.ServiceCursos.ReadEstudiantes().subscribe(res => {
      this.estudianteID = res;
    }));
  }

  Buscar(): void {
    if (this.formBusqueda.valid) {
      const busqueda: IInscripcionReadCurso = {
        idPeriodo: this.formBusqueda.get('idPeriodo')?.value,
        idEstudiante: this.formBusqueda.get('idEstudiante')?.value
      };
      this.subs.add(
      this.ServiceCursos.ReadInscripcionCurso(busqueda.idPeriodo, busqueda.idEstudiante).subscribe(response => {
        if (response <= 0) {
          Swal.fire({
            icon: 'warning',
            title: '¡ATENCIÓN!',
            text: 'No hay información adicional, intenta con otro Periodo o Estudiante',
            showConfirmButton: true,
            showCloseButton: true
          });
        }else{
          this.periodoCurso = response;
        }
      }));
    }else{
      Swal.fire(
        '¡ATENCIÓN!',
        'Por favor, Selecciona una opción',
        'warning'
      );
    }
  }

  InitForm(): void {
    this.formBusqueda = this.fb.group({
      idPeriodo: ['', [Validators.required]],
      idEstudiante: ['', [Validators.required]]
    });
  }

  isValidForm(field: string): string{
    const validF = this.formBusqueda.get(field);
    return (!validF.valid && validF.touched)
    ? 'is-invalid' : validF.touched ? 'is-valid' : '';
  }
}
