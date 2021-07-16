export interface IInscripcionRead{
    idEstudiante: number;
    idPeriodo: number;
    idMateria: number;
    codigo: string;
    nombreMat: string;
}
export interface IInscripcionResponse{
    codigo: string;
    descripcion: string;
    fecha: string;
}
export interface IInscripcionCreate{
    idPeriodo: number;
    idEstudiante: number;
    codigo: string;
}
export interface IInscripcionReadCurso{
    idEstudiante: number;
    idPeriodo: number;
}