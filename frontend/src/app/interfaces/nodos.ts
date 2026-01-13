interface Boton {
    boton: string;
    accion?: string;
    resultado?: number;
    nombre_siguiente_nodo?: string;
    nodo_siguiente?: string;
    descripcion?: string

}

interface Encabezado {
    type: string; // Tipo de encabezado
    link: string; // Enlace de la imagen
}

interface Body {
    tituloLista: string; // Título de la lista
    textoCuerpoLista: string; // Texto del cuerpo de la lista
}

export interface Nodo {
    uid: string;
    nombre_nodo: string;
    encabezado: Encabezado[]; // Array de encabezados
    body: Body[]; // Array de cuerpos
    botones: Boton[]; // Array de botones
}