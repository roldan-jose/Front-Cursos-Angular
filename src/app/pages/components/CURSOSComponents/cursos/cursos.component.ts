import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICursosResponse } from 'src/app/models/modelsCursosApp/cursos.interface';
import { CursosModelResponse } from 'src/app/models/modelsCursosApp/cursos.model';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  cursos$: ICursosResponse[];

  constructor(private serviceCurso: CursosService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.ShowCursos();
  }

  ShowCursos(): void{
    this.subs.add(
    this.serviceCurso.ReadCursos().subscribe((response: any) => {
      this.cursos$ = response;
    }));
  }
  EditCurso(id: any): void{
    this.router.navigate(['/cursos-edit', id]);
  }
  BorrrarCurso(id: any): void{
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de esta acción?',
      text: `→ Se eliminarán los datos del ID: ${id} ←`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33'
    }).then((response) => {
      if (response.value) {
        this.subs.add(
        this.serviceCurso.DeleteCursos(id)
        .subscribe(() => {
          Swal.fire('¡Borrado Exitosamente!', '', 'success');
          this.ShowCursos();
        }));
      }
    });
  }

}
