import { Component, OnDestroy, OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { MEstudianteCreate } from 'src/app/models/modelsCursosApp/estudianteCreate.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit, OnDestroy {
private subs: Subscription = new Subscription();

  file: File;
  photoSelected: string | ArrayBuffer;
  EstudianteShowId = this.ActivRoute.snapshot.paramMap.get('id');
  estudianteC: MEstudianteCreate = new MEstudianteCreate();

  constructor(private service: CursosService,
              private ActivRoute: ActivatedRoute) {
               }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }


  CapturarFile(event): void{
    if (event.target.files && event.target.files[0]){
      this.file = event.target.files[0];
      const reader  = new FileReader();
      reader.onload = () => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  Guardar(Nombre, Apellido, Codigo, FechaNacimiento): void{
    this.subs.add(
      this.service.CrearEstudiante(Nombre.value, Apellido.value, Codigo.value, FechaNacimiento.value, this.file).subscribe(response => {
      }));
    Swal.fire({
        icon: 'success',
        title: '¡Realizado!',
        text: `→ Estudiante ${Nombre.value} Agregado Exitosamente ←s`,
        showCloseButton: true,
        allowOutsideClick: false
      });
  }



}
