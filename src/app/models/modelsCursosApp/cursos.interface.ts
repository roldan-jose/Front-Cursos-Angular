export class ICursosResponse {
    idCurso: number;
    codigo: string;
    descripcion: string;
    estado: boolean;

    constructor(){
        this.estado = true;
    }
}
