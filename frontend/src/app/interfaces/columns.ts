export interface Servicio {
    existeNodos: any;
    existeTypSms: any;
    existeServicios: any;
    uid: string;
    nombre_servicio: string;
    descripcion_servicio: string;
    icono_servicio: string;
    color_servicio: string;
}

export interface Nodo {
    uid: string;
    nombre_tipo_nodo: string;
}

export interface TipoSms {
    uid: string;
    nombre_tipo: string;
}

export interface NodosServicesResponse {
    existeServicios: Servicio[];
    existeNodos: Nodo[];
    existeTypSms: TipoSms[];
    sms?: string; // Mensaje opcional
}

export interface botones {
    boton:{
        accion: string
        boton: string
        descripcion: string
        nodo_siguiente: string
        nombre_nodo: string
        posicion: number
        resultado: number
        uid: string
    }
    
}

