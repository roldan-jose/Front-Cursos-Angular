import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardLoginGuard } from './Guard/guard-login.guard';
import { CursosEditComponent } from './pages/components/CURSOSComponents/cursos-edit/cursos-edit.component';
import { CursosNuevoComponent } from './pages/components/CursosComponents/cursos-nuevo/cursos-nuevo.component';
import { CursosComponent } from './pages/components/CURSOSComponents/cursos/cursos.component';
import { EstudianteEditComponent } from './pages/components/ESTUDIANTESComponents/estudiante-edit/estudiante-edit.component';
import { EstudianteShowComponent } from './pages/components/ESTUDIANTESComponents/estudiante-show/estudiante-show.component';
import { EstudianteComponent } from './pages/components/ESTUDIANTESComponents/estudiante/estudiante.component';
import { EstudiantesComponent } from './pages/components/ESTUDIANTESComponents/estudiantes/estudiantes.component';
import { InscripcionComponent } from './pages/components/INSCRIPCIONComponents/inscripcion/inscripcion.component';
import { MatriculasComponent } from './pages/components/MATRICULASComponents/matriculas/matriculas.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuardLoginGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'estudiantes', component: EstudiantesComponent},
  {path: 'estudiante/:id', component: EstudianteComponent},
  {path: 'estudiante-show/:id', component: EstudianteShowComponent},
  {path: 'estudiante-edit/:id', component: EstudianteEditComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'cursos-nuevo/:id', component: CursosNuevoComponent},
  {path: 'cursos-edit/:id', component: CursosEditComponent},
  {path: 'inscripcion', component: InscripcionComponent},
  {path: 'matriculas', component: MatriculasComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
