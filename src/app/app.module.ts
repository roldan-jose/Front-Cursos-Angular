import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { EstudiantesComponent } from './pages/components/ESTUDIANTESComponents/estudiantes/estudiantes.component';
import { EstudianteComponent } from './pages/components/ESTUDIANTESComponents/estudiante/estudiante.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EstudianteShowComponent } from './pages/components/ESTUDIANTESComponents/estudiante-show/estudiante-show.component';
import { ObjectDataPipe } from './services/pipes/object-data.pipe';
import { EstudianteEditComponent } from './pages/components/ESTUDIANTESComponents/estudiante-edit/estudiante-edit.component';
import { SpinnerModule } from './Shared/Components/spinner/spinner.module';
import { SpinnerInterceptor } from './Shared/interceptors/spinner.interceptor';
import { CursosComponent } from './pages/components/CURSOSComponents/cursos/cursos.component';
import { CursosNuevoComponent } from './pages/components/CursosComponents/cursos-nuevo/cursos-nuevo.component';
import { CursosEditComponent } from './pages/components/CURSOSComponents/cursos-edit/cursos-edit.component';
import { MatriculasComponent } from './pages/components/MATRICULASComponents/matriculas/matriculas.component';
import { InscripcionComponent } from './pages/components/INSCRIPCIONComponents/inscripcion/inscripcion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EstudiantesComponent,
    EstudianteComponent,
    EstudianteShowComponent,
    ObjectDataPipe,
    EstudianteEditComponent,
    CursosComponent,
    CursosNuevoComponent,
    CursosEditComponent,
    MatriculasComponent,
    InscripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
