import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Console } from 'console';
import { promise } from 'protractor';
import { Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICursosResponse } from '../models/modelsCursosApp/cursos.interface';
import { CursosModelResponse } from '../models/modelsCursosApp/cursos.model';
import { MEstudianteCreate } from '../models/modelsCursosApp/estudianteCreate.model';
import { IEstudiantesCreate, IEstudiantesResMateria, IEstudiantesResponse } from '../models/modelsCursosApp/estudiantes.interface';
import { EstudianteShowComponent } from '../pages/components/ESTUDIANTESComponents/estudiante-show/estudiante-show.component';
import { catchError, filter, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IMatriculaCreate } from '../models/modelsCursosApp/matricula.interface';
import { IPeriodoActivoResponse } from '../models/modelsCursosApp/periodo-activ.interface';
import { IPeriodoActive } from '../models/modelsCursosApp/activarPerido.interface';
import { IInscripcionRead, IInscripcionResponse, IInscripcionCreate } from '../models/modelsCursosApp/inscripcion.interface';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  EstudianteService: Observable<IEstudiantesCreate[]>;

  constructor(private http: HttpClient) {
   }

  // ** */  CRUD ESTUDIANTES **//

  ReadEstudiantes(): Observable<IEstudiantesResponse>{
    return this.http.get<IEstudiantesResponse>(`${environment.API_URL}/Estudiantes`);
  }
  ReadEstudianteShowId(id: string): any{
    return this.http.get<IEstudiantesResMateria>(`${environment.API_URL}/Estudiantes/matricula/${id}`);
  }
  LeerEstudianteId(id: string): Observable<IEstudiantesResponse>{
    return this.http.get<IEstudiantesResponse>(`${environment.API_URL}/Estudiantes/${id}`);
  }
  DeleteEstudiante(id: string): any{
    return this.http.delete(`${environment.API_URL}/Estudiantes/${id}`)
    .pipe(
      map(() => {

      }),
      catchError((err) => this.errores(err))
    );
  }

  CrearEstudiante(Nombre: string, Apellido: string, Codigo: string, FechaNacimiento: any, Photo: File): any{
    const estudianteData = new FormData();
    estudianteData.append('Nombre', Nombre);
    estudianteData.append('Apellido', Apellido);
    estudianteData.append('Codigo', Codigo);
    estudianteData.append('FechaNacimiento', FechaNacimiento);
    estudianteData.append('ImagenEstudianteDto', Photo);
    return this.http.post(`${environment.API_URL}/Estudiantes`, estudianteData)
    .pipe(
      map(() => {

      }),
      catchError((er) => this.handlerError(er))
    );
  }
  EditarEstudiante(id: string, nombre: string, apellido: string, codigo: string, fechaNacimiento: any, Photo: File): any{
    const estudianteData = new FormData();
    estudianteData.append('idEstudiante', id);
    estudianteData.append('nombre', nombre);
    estudianteData.append('apellido', apellido);
    estudianteData.append('codigo', codigo);
    estudianteData.append('fechaNacimiento', fechaNacimiento);
    estudianteData.append('ImagenEstudianteDto', Photo);
    return this.http.put(`${environment.API_URL}/Estudiantes/${id}`, estudianteData)
    .pipe(
      map(() => {

      }),
      catchError((er) => this.handlerError(er))
    );
  }

  // !! MONTRAR ERRORES !! //

  private errores(er): Observable<never>{
    let errorMessage = 'Se ha producido un error al cargar la información';
    if (er){
      errorMessage = `Error : → No Se Puede Eliminar Porque Tiene Materias Inscritas ←`;
    }
    Swal.fire({
      icon: 'error',
      title: '¡ ERROR !',
      text: `${errorMessage}`
    });
    return throwError(errorMessage);
  }

  private handlerError(err): Observable<never>{
    let errorMessage = 'Se ha producido un error al cargar la información';
    if (err){
      errorMessage = `Error : → ${err.error.message} ←`;
    }
    Swal.fire({
      icon: 'error',
      title: '¡ ERROR !',
      text: `${errorMessage}`
    });
    return throwError(errorMessage);
  }

  // ** */  CRUD Cursos **//


  ReadCursos(): Observable<ICursosResponse>{
    return this.http.get<ICursosResponse>(`${environment.API_URL}/Cursos`);
  }
  ReadCursosId(id: any): Observable<ICursosResponse>{
    return this.http.get<ICursosResponse>(`${environment.API_URL}/Cursos/${id}`);
  }
  CreateCursos(CursosCreate: ICursosResponse): Observable<any>{
    return this.http.post<ICursosResponse>(`${environment.API_URL}/Cursos`, CursosCreate)
    .pipe(
      map(() => {

      }),
      catchError((er) => this.handlerError(er))
    );
  }
  EditCursos(CursosEdit: ICursosResponse): Observable<ICursosResponse>{
    return this.http.put<ICursosResponse>(`${environment.API_URL}/Cursos/${CursosEdit.idCurso}`, CursosEdit);
  }
  DeleteCursos(id: string): any{
    return this.http.delete(`${environment.API_URL}/Cursos/${id}`)
    .pipe(
      map(() => {

      }),
      catchError((er) => this.handlerError(er))
    );
  }


    // ** */  CRUD MATRICULAS **//

    CreateMatricula(matricula: IMatriculaCreate): Observable<any>{
      const idperiodo = matricula.idPeriodo;
      const idestudiante = matricula.idEstudiante;
      return this.http.post<IMatriculaCreate>(`${environment.API_URL}/Matriculas/${idperiodo}/${idestudiante}`, matricula)
      .pipe(
        map(() => {

        }),
        catchError((err) => this.handlerError(err))
      );
    }

    DeleteMatricula(idPeriodo: any, idEstudiante: any): any{
      return this.http.delete(`${environment.API_URL}/Matriculas/${idPeriodo}/${idEstudiante}`)
      .pipe(
        map(() => {

        }),
        catchError((err) => this.handlerError(err))
      );
    }


     // ** */  CRUD PERIODOS **//

     ReadPeriodoActivo(): Observable<IPeriodoActivoResponse>{
       const periodo: IPeriodoActivoResponse = {} as IPeriodoActivoResponse;
       return this.http.get<IPeriodoActivoResponse>(`${environment.API_URL}/Periodos/activo`)
       .pipe(
         map((resp: any) => {
           periodo.idPeriodo = resp.idPeriodo;
           return periodo;
         })
       );
     }
     ReadPeriodos(): Observable<IPeriodoActivoResponse>{
       return this.http.get<IPeriodoActivoResponse>(`${environment.API_URL}/Periodos`);
     }
     ActivarPeriodo(idPeriodoActivar: number): any{
       return this.http.patch(`${environment.API_URL}/Periodos/activar/${idPeriodoActivar}`, idPeriodoActivar)
       .pipe(
         map(() => {

         }),
         catchError((err) => this.handlerError(err))
       );
     }

     CreatePeriodos(periodoC: IPeriodoActivoResponse): Observable<any>{
      return this.http.post<IPeriodoActivoResponse>(`${environment.API_URL}/Periodos`, periodoC)
      .pipe(
        map(() => {

        }),
        catchError((er) => this.handlerError(er))
      );
     }


     // ** */  CRUD Inscripción **//

     ReadInscripcion(): Observable<IInscripcionRead>{
       return this.http.get<IInscripcionRead>(`${environment.API_URL}/IncripcionCursos`);
     }
     ReadInscripcionCurso(idPeriodo: number, idEstudiante: number): Observable<any>{
       return this.http.get<IInscripcionResponse>(`${environment.API_URL}/IncripcionCursos/${idPeriodo}/${idEstudiante}`);
     }
     CreateInscripcion(inscribir: IInscripcionCreate): Observable<any>{
       return this.http.post<IInscripcionCreate>(`${environment.API_URL}/IncripcionCursos/${inscribir.idPeriodo}/${inscribir.idEstudiante}/${inscribir.codigo}`, inscribir)
       .pipe(
         map(() => {

         }),
         catchError((error) => this.handlerError(error))
       );
     }
     DeleteInscripcion(idPeriodo: number, idEstudiante: number, codigo: string): Observable<any> {
       return this.http.delete(`${environment.API_URL}/IncripcionCursos/${idPeriodo}/${idEstudiante}/${codigo}`)
       .pipe(
         map(() => {

         }),
         catchError((error) => this.handlerError(error))
       );
     }
}
