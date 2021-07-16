interface Matriculas{
    idPeriodo: number;
    anioPeriodo: number;
}
interface Inscripcion{
    idEstudiante: number;
    anio: number;
    codigo: string;
    descripcion: string;
}

export interface IEstudiantesResponse{
    idEstudiante: number;
    codigo: string;
    nombre: string;
    apellido: string;
    nombreApellido: string;
    fechaNacimiento: string;
    urlImagenEstudiante: string;
}

export interface IEstudiantesCreate{
    IdEstudiante: number;
    Codigo: string;
    Nombre: string;
    Apellido: string;
    NombreApellido?: string;
    FechaNacimiento: any;
    ImagenEstudianteDto?: File;
}
export interface IEstudiantesResMateria{
    idEstudiante: number;
    codigo: string;
    nombreCompleto: string;
    fechaNa: string;
    urlImagenEstudiante: string;
    matriculas: Matriculas[];
    inscripcion: Inscripcion[];
}
