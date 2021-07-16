import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  estudianteC: any;

  constructor(private ServiceCurso: CursosService,
              private router: Router) {}

  ngOnInit(): void {
    this.LeerEstudiantes();
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

  LeerEstudiantes(): void{
    this.subs.add(
    this.ServiceCurso.ReadEstudiantes().subscribe( res => {
      this.estudianteC = res;
    }));
  }

  ShowEstudiante(id: any): void{
    this.router.navigate(['/estudiante-show', id]);
  }

  EditEstudiante(id: any): void{
    this.router.navigate(['/estudiante-edit', id]);
  }

  EliminarEstudiante(id: any): void{
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de esta acción?',
      text: `→ Se eliminarán los datos de esta persona ←`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value){
        this.subs.add(
        this.ServiceCurso.DeleteEstudiante(id)
        .subscribe((response) => {
          if (response){
            Swal.fire('!Error¡', 'No se puede eliminar al estudiante por que tiene materias activas, por favor, elimina las materias con las que está inscrito(a)', 'info');
          }else{
            delete this.estudianteC[id];
            Swal.fire('¡Borrado Exitosamente!', '', 'success');
            this.LeerEstudiantes();
          }
        }));
      }
    });
  }

}
