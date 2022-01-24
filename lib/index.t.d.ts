import SensenJutsu from ".";
export interface SensenTWindow extends Window {
    StaticSensenJutsuInstance: SensenJutsu<{}>[];
}
export declare type SensenTJutsuObserverRecords = {
    element: HTMLElement;
    matches: RegExpMatchArray[];
    isNative?: boolean;
    content?: boolean;
    attribute?: boolean;
    attributeName?: string;
    mockup?: HTMLElement;
};
export declare type SensenTJutsuProps<T extends {
    [K: string]: any;
}> = {
    fromString?: string;
    element: HTMLElement | string;
    transactions?: {
        [V in keyof T]: T[V];
    };
};
export declare type SensenTJutsuDictionary = {
    [K: string]: any;
};
//# sourceMappingURL=index.t.d.ts.map