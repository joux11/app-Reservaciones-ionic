
export interface IReservacion {
    id: number;
    fecha_registro: string;
    fecha_inicio: string;
    hora_inicio: string;
    fecha_fin: string;
    hora_fin: string;
    estado: string;
    total: number;
    usuario_id: number;
    tipo_alquiler_id: number;
    nombre_tipo_alquiler?: string;
    precio?: string;
    nombreUsuario?: string;
}
