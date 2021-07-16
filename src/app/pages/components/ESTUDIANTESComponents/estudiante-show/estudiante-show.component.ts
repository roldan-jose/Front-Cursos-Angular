import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Subscription } from 'rxjs';
import { IEstudiantesResMateria } from '../../../../models/modelsCursosApp/estudiantes.interface';
import { IMatriculaCreate } from 'src/app/models/modelsCursosApp/matricula.interface';
import { IPeriodoActivoResponse } from '../../../../models/modelsCursosApp/periodo-activ.interface';
import Swal from 'sweetalert2';
import { IInscripcionCreate } from 'src/app/models/modelsCursosApp/inscripcion.interface';
import { IInscripcionRead } from '../../../../models/modelsCursosApp/inscripcion.interface';
import { ICursosResponse } from 'src/app/models/modelsCursosApp/cursos.interface';

@Component({
  selector: 'app-estudiante-show',
  templateUrl: './estudiante-show.component.html',
  styleUrls: ['./estudiante-show.component.css']
})
export class EstudianteShowComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal;
  private subs: Subscription = new Subscription();

  constructor(private ServiceCurso: CursosService,
              private ActivRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              ){
                this.InitFormEstudianteShow();
                this.InitFormMatricula();
                this.PeriodoActv();
                this.InitFormPeriodoNuevo();
                this.InitFormInscribir();
   }

  estudianteShow: IEstudiantesResMateria = {} as IEstudiantesResMateria;
  formEstudiantShow: FormGroup;
  formMatEstudiant: FormGroup;
  formNuevoPeriodo: FormGroup;
  formInscripcion: FormGroup;
  estudianteMat: any = [];
  estudianteInsc: any = [];
  matriculas: IMatriculaCreate = {} as IMatriculaCreate;
  periodoActv: IPeriodoActivoResponse = {} as IPeriodoActivoResponse;
  periodos: IPeriodoActivoResponse = {} as IPeriodoActivoResponse;
  inscribir: IInscripcionCreate | ICursosResponse = {} as IInscripcionCreate;
  EstudianteShowId = this.ActivRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.SendForm();
    this.SendMat();
    this.SendIns();
    this.ReadPeriodos();
    this.ReadInscribir();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  SendForm(): void{
    this.subs.add(
      this.ServiceCurso.ReadEstudianteShowId(this.EstudianteShowId).subscribe( res => {
        this.estudianteShow = res;
        this.formEstudiantShow.patchValue({
          id: this.estudianteShow.idEstudiante,
          nombreCom: this.estudianteShow.nombreCompleto,
          codigo: this.estudianteShow.codigo,
          fechaNa: this.estudianteShow.fechaNa
        });
      }));
  }

  InitFormEstudianteShow(): void{
    this.formEstudiantShow = this.fb.group({
      id: [''],
      nombreCom: [''],
      codigo: [''],
      fechaNa: ['']
    });
  }

  SendMat(): void{
    this.subs.add(
    this.ServiceCurso.ReadEstudianteShowId(this.EstudianteShowId).subscribe(resp => {
      this.estudianteMat = resp.inscripcion;
    }));
  }
  SendIns(): void{
    this.subs.add(
    this.ServiceCurso.ReadEstudianteShowId(this.EstudianteShowId).subscribe(resp => {
      this.estudianteInsc = resp.matriculas;
    }));
  }

  PeriodoActv(): any{
    this.subs.add(
    this.ServiceCurso.ReadPeriodoActivo().subscribe(res => {
      this.periodoActv = res;
      this.formMatEstudiant.patchValue({
        idEstudiante: this.estudianteShow.idEstudiante,
        idPeriodo: this.periodoActv.idPeriodo
      });
    }));
  }

  guardar(): void{
    this.PeriodoActv();
    const Matricular: IMatriculaCreate = {
      idEstudiante: this.formMatEstudiant.get('idEstudiante')?.value,
      idPeriodo: this.formMatEstudiant.get('idPeriodo')?.value
    };
    this.subs.add(
    this.ServiceCurso.CreateMatricula(Matricular).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Realizado!',
        text: `→ ID: ${Matricular.idEstudiante} Matriculado Exitosamente ←`,
        showCloseButton: true,
        allowOutsideClick: false
      });
      this.SendIns();
      this.SendMat();
    }));
  }

  InitFormMatricula(): void{
    this.formMatEstudiant = this.fb.group({
      idEstudiante: ['', [Validators.required, Validators.minLength(1)]],
      idPeriodo: ['', [Validators.required]]
    });
  }


  EliminarInsc(idPeriodo: any, idEstudiante: any): void{
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de esta acción?',
      text: `→ Se eliminará la matricula del ID : ${idEstudiante} con periodo '${idPeriodo}' ←`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.subs.add(
        this.ServiceCurso.DeleteMatricula(idPeriodo, idEstudiante)
        .subscribe(() => {
          this.SendIns();
          this.SendMat();
          Swal.fire('¡Borrado Exitosamente!', '', 'success');
        }));
      }
    });
  }

  ReadPeriodos(): void{
    this.subs.add(
    this.ServiceCurso.ReadPeriodos().subscribe(response => {
      this.periodos = response;
    }));
  }
  modalClose(): void {
    this.closeModal.nativeElement.click();
  }

  Matricular(): void{
    this.PeriodoActv();
    this.ReadPeriodos();
  }

  activarPeriodo(formu: NgForm): void{
    this.subs.add(
    this.ServiceCurso.ActivarPeriodo(this.periodos.idPeriodo).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Realizado!',
        text: `→ Periodo: '${this.periodos.idPeriodo}' ACTIVADO Exitosamente ←`,
        showCloseButton: true,
        allowOutsideClick: false
      });
    }));
  }

  GuardarNuevoPeriodo(): void{
    if (this.formNuevoPeriodo.valid) {
      const NuevoPeriodo: IPeriodoActivoResponse = {
        idPeriodo: this.formNuevoPeriodo.get('IdPeriodo')?.value,
        anio: this.formNuevoPeriodo.get('Anio')?.value,
        estado: this.formNuevoPeriodo.get('Estado').value
      };
      this.subs.add(
      this.ServiceCurso.CreatePeriodos(NuevoPeriodo).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Realizado!',
          text: `→ Periodo: '${NuevoPeriodo.idPeriodo}' Agregado Exitosamente ←`,
          showCloseButton: true,
          allowOutsideClick: false
        });
      }));
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Error de Validación',
        text: `→ El campo 'Estado' está vacio, por favor Activa o Desactiva el campo. ←`,
        showCloseButton: true,
        allowOutsideClick: false
      });
    }
  }

  InitFormPeriodoNuevo(): void{
    this.formNuevoPeriodo = this.fb.group({
      IdPeriodo: ['', [Validators.required]],
      Anio: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      Estado: ['', [Validators.required]]
    });
  }

  ReadInscribir(): void{
    this.subs.add(
    this.ServiceCurso.ReadCursos().subscribe(response => {
      this.inscribir = response;
      this.formInscripcion.patchValue({
        idEst: this.estudianteShow.idEstudiante
      });
    }));
  }

  InscribirNuevo(): void{
    if (this.formInscripcion.valid){
      const Inscripcion: IInscripcionCreate = {
        idPeriodo: this.formInscripcion.get('idPe')?.value,
        idEstudiante: this.formInscripcion.get('idEst')?.value,
        codigo: this.formInscripcion.get('codigoMat')?.value
      };
      this.subs.add(
      this.ServiceCurso.CreateInscripcion(Inscripcion).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Realizado!',
          text: `→ ID: '${Inscripcion.idPeriodo}' Inscrito Exitosamente en el curso ${Inscripcion.codigo} ←`,
          showCloseButton: true,
          allowOutsideClick: false
        });
        this.SendMat();
      }));
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Error de Validación',
        text: `→ Por favor completa los campos. ←`,
        showCloseButton: true,
        allowOutsideClick: false
      });
    }
  }

  EliminarInscripcion(idPeriodo: number, idEstudiante: number, codigo: string): void{
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de esta acción?',
      text: `→ Se Eliminará la Inscripción del Estudiante con ID : ${idEstudiante} en la Materia con Código: '${codigo}' ←`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.subs.add(
        this.ServiceCurso.DeleteInscripcion(idPeriodo, idEstudiante, codigo)
        .subscribe(() => {
          Swal.fire('¡Borrado Exitosamente!', '', 'success');
          this.SendIns();
          this.SendMat();
        }
        ));
      }
    });
  }

  InitFormInscribir(): void{
    this.formInscripcion = this.fb.group({
      idPe: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      idEst: ['', [Validators.required, Validators.minLength(1)]],
      codigoMat: ['', [Validators.required]]
    });
  }


  isValidForm(field: string): string{
    const validF = this.formMatEstudiant.get(field);
    return (!validF.valid && validF.touched)
    ? 'is-invalid' : validF.touched ? 'is-valid' : '';
  }

  isValidFormNPeriodo(input: string): string{
    const validInput = this.formNuevoPeriodo.get(input);
    return (!validInput.valid && validInput.touched)
    ? 'is-invalid' : validInput.touched ? 'is-valid' : '';
  }

  isValidFormInscripcion(campo: string): string{
    const validCampo = this.formInscripcion.get(campo);
    return (!validCampo.valid && validCampo.touched)
    ? 'is-invalid' : validCampo.touched ? 'is-valid' : '';
  }

}
