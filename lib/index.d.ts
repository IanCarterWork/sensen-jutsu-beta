import type { SensenTJutsuObserverRecords, SensenTJutsuProps } from "./index.t";
declare class SensenJutsu<V extends {
    [K: string]: any;
    $context?: V;
}> {
    $staticKey: number;
    $element?: HTMLElement | null;
    $fromString?: string;
    $virtualization: Document | null;
    $transactions: V;
    $state: V;
    $refs: {
        [Re in keyof V]?: Array<SensenTJutsuObserverRecords>;
    };
    /**
     * New Construct
     */
    constructor(props: SensenTJutsuProps<V>);
    Init(props: SensenTJutsuProps<V>): this;
    UpgradeTransaction(key: keyof V): this;
    States(): this;
    PushRef(key: keyof V, record: SensenTJutsuObserverRecords): this;
    Render(): this;
}
export default SensenJutsu;
//# sourceMappingURL=index.d.ts.map