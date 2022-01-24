import SensenJutsu from "."




export interface SensenTWindow extends Window {

    StaticSensenJutsuInstance : SensenJutsu<{}>[]

}



export type SensenTJutsuObserverRecords = {

    element: HTMLElement;

    matches: RegExpMatchArray[],
    
    isNative?: boolean;

    content?: boolean;
    
    attribute?: boolean;

    attributeName?: string;

    mockup?: HTMLElement,

}



export type SensenTJutsuProps<T extends { [K: string] : any }> = {
    
    fromString?: string;

    element: HTMLElement | string;

    transactions?: { [V in keyof T] : T[V] };
    
}


export type SensenTJutsuDictionary = {
    
    [K: string] : any
    
}
