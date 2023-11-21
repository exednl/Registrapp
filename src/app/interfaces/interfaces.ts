export interface RespuestaFeriados {
    status: string;
    data: Data[];

}


export interface Data {
    date: string;
    title: string;
    type: string;
    inalienable: string;
    extra: string;

    
}
