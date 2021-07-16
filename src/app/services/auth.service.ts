import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser, IUserResponse } from '../models/user.interface';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserRegister, IUserResponseRegister } from '../models/register.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



const helper = new JwtHelperService();

// const optionsHttp = {
//   headers: new HttpHeaders({
//     'Contend-Type': 'application/json'
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private route: Router) {
    this.readToken();
    this.getToken();
   }

   get IsLoggeg(): Observable<boolean>{
     return this.loggedIn.asObservable();
   }

  Login(authData: IUser): Observable<IUserResponse | void> {
    return this.http.post<IUserResponse>(`${environment.API_URL}/Authentication/Login`, authData)
    .pipe(
      map( (response: IUserResponse) => {
        // Guardar Token
        this.saveToken(response.token);
        this.loggedIn.next(true);
        return response;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  RegisterUser(RegisterData: IUserRegister): Observable<any>{
    return this.http.post<IUserResponseRegister>(`${environment.API_URL}/Authentication/Register`, RegisterData)
    .pipe(
      map(() => {

      }),
      catchError((err) => this.Errors(err))
    );
  }


  Logout(): void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.route.navigate(['/login']);
  }

  private readToken(): void{
    const UserToken = localStorage.getItem('token');
    const IsExpired = helper.isTokenExpired(UserToken);
    console.log('Token Expirado: ', IsExpired);
    this.loggedIn.next(true);
    if (IsExpired)
    {
      this.Logout();
    }else{
      this.loggedIn.next(true);
    }
  }

  getToken(): any{
    return localStorage.getItem('token');
  }

  private saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  private handlerError(err): Observable<never>{
    let errorMessage = 'Se ha producido un error al cargar la información';
    if (err){
      errorMessage = `Error Code: ${err.message}`;
    }
    Swal.fire({
      icon: 'error',
      title: '¡ERORR!',
      text: `→ Error al iniciar sesión, verifica Usuario y/o Contraseña. ←`
    });
    return throwError(errorMessage);
  }

  private Errors(err): Observable<never>{
    let errorMessage = 'Se ha producido un error al cargar la información';
    if (err){
      errorMessage = `Error: ${err.error.errors}`;
    }
    Swal.fire({
      icon: 'error',
      title: '¡ERORR!',
      text: `→ ${errorMessage} ←`
    });
    return throwError(errorMessage);
  }
}
