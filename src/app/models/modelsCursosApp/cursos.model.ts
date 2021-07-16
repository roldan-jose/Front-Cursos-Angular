export class CursosModelResponse {
    idCurso: number;
    codigo: string;
    descripcion: string;
    estado: boolean;

    constructor(){
        this.estado = true;
    }
}
