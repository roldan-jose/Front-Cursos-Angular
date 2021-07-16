import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MEstudianteCreate } from 'src/app/models/modelsCursosApp/estudianteCreate.model';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-estudiante-edit',
  templateUrl: './estudiante-edit.component.html',
  styleUrls: ['./estudiante-edit.component.css']
})
export class EstudianteEditComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  file: File;
  photoSelected: string | ArrayBuffer;
  EstudianteShowId = this.ActivRoute.snapshot.paramMap.get('id');
  DataEstuidante: MEstudianteCreate = new MEstudianteCreate();


  constructor(private service: CursosService, private ActivRoute: ActivatedRoute, private routes: Router) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.LeerEstuidante();
  }

  CapturarFile(event): void{
    if (event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
      const reader  = new FileReader();
      reader.onload = () => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  Guardar(nombre, apellido, codigo, fechaNacimiento): void{
    this.subs.add(
      // tslint:disable-next-line: max-line-length
    this.service.EditarEstudiante(this.EstudianteShowId, nombre.value, apellido.value, codigo.value, fechaNacimiento.value, this.file).subscribe(response => {
    }));
    Swal.fire({
      icon: 'success',
      title: '¡Realizado!',
      text: `→ Estudiante ${nombre.value} Modificado Con Exito ←`,
      confirmButtonText: `Continuar`,
      showCloseButton: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed){
        this.routes.navigate(['/estudiantes']);
      }
    });
  }

  LeerEstuidante(): void{
    this.subs.add(
    this.service.LeerEstudianteId(this.EstudianteShowId).subscribe(response => {
      this.DataEstuidante = response;
      }));

  }

}
