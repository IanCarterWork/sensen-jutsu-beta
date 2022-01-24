import type { SensenTJutsuObserverRecords, SensenTJutsuProps, SensenTWindow } from "./index.t";
import { render } from 'ejs';
import { match } from "assert";


declare let window: SensenTWindow;


const SyntaxVariablesRegExp = new RegExp('{{(.*?)}}', 'g')

const SyntaxNativeRegExp = new RegExp('{%(.*?)%}', 'g')

const SyDetr = '%sn'




/**
 * Element Attributes Observer
 */
function $DOMAttributesObserver(html: HTMLElement, callback: (record: SensenTJutsuObserverRecords) => void){

    if(html.attributes){

        const attributes = Object.values( html.attributes );

        if(attributes.length){

            attributes.map(attribute=>{

                const matches = [...attribute.value.matchAll(SyntaxVariablesRegExp)];

                matches.map((match, k)=>{ matches[k][1] = matches[k][1].trim() })

                callback({
                    element: html,
                    attribute: true,
                    attributeName: attribute.name,
                    content: false,
                    matches: matches,
                    mockup: html.cloneNode(true) as HTMLElement
                })

            })
            
        }
        
    }

    return $DOMAttributesObserver;
    
}




/**
 * Element Content Observer
 */
function $DOMContentObserver(html: HTMLElement, callback: (record: SensenTJutsuObserverRecords) => void){

    const matches = [...html.innerText.matchAll(SyntaxVariablesRegExp)];

    if(matches.length){

        matches.map((match, k)=>{ matches[k][1] = matches[k][1].trim() })

        callback({
            element: html,
            attribute: false,
            content: true,
            matches: matches,
            mockup: html.cloneNode(true) as HTMLElement
        })

    }


    return $DOMContentObserver;

}




/**
 * Element Observer
 */
function $DOMObserver(html: HTMLElement, callback: (record: SensenTJutsuObserverRecords) => void){

    const children: HTMLElement[] = Object.values(html.children) as HTMLElement[]


    if(children.length){

        children.map(e=>{

            $DOMAttributesObserver(e, callback)

            $JSObserver(e, callback)

            $DOMObserver(e, callback)
            
        })

    }

    else{

        $DOMContentObserver(html, callback)

    }

    return $DOMObserver;

}




/**
 * Observe JS Code in Element 
 */
 function $JSObserver(html: HTMLElement, callback: (record: SensenTJutsuObserverRecords) => void){


    const matches = [...html.innerText.matchAll(SyntaxNativeRegExp)];

    if(matches.length){

        matches.map((match, k)=>{ matches[k][1] = matches[k][1].trim() })

        callback({
            element: html,
            isNative: true,
            matches: matches,
            mockup: html.cloneNode(true) as HTMLElement
        })

    }

    return $DOMContentObserver;

}




/**
 * Find Transaction expressions in JS Expression
 */
function $JSFindTransactions<V>(html: HTMLElement, transactions: V, callback: (record: SensenTJutsuObserverRecords) => void){

    if(transactions){

        const $transactions = Object.entries(transactions);

        if($transactions.length){

            $transactions.map(entry=>{

                const matches = [...StabilizeContent(html.innerHTML).matchAll(new RegExp(`${ entry[0] }`, 'g'))];

                if(matches.length){

                    // console.warn('$JSFindTransactions', entry, matches)
            
                    callback({
                        element: html,
                        isNative: true,
                        content: true,
                        matches: matches,
                        mockup: html.cloneNode(true) as HTMLElement
                    })
                }
                

            })
            
        }
        
    }
    

    return $JSFindTransactions;

}




/**
 * Fragment rendering from String
 */
function FragmentRender(input: string, dictionary: { [K: string] : any  } ){
    return render(`${ input }`, dictionary, {
        delimiter: `${ SyDetr }`,
        client: true
    })
}







/**
 * Parse Node of Component
 */
function ParseNodeState<V>(component: SensenJutsu<V>, node: HTMLElement){

    $DOMObserver(node, (record)=>{

        if(record.matches.length){

            // @ts-ignore
            record.element.$context = component.$state;
            

            if(!record.isNative){

                record.matches.map(match=>{

                    const key = match[1] as keyof V;

                    if(key in component.$transactions){

                        component.PushRef(key, record)

                        component.UpgradeTransaction(key)


                    }

                    // else{

                    //     console.log('Not supported', key, record, window.StaticSensenJutsuInstance[ component.$staticKey ] )
                        
                    // }

                })

            }

            
        }

    })
    
}






/**
 *  Parse Recorded
 */
function ParseRecord<V>(component: SensenJutsu<V>, record: SensenTJutsuObserverRecords, match: RegExpMatchArray){

    if(record.content){
                
        record.element.innerHTML = FragmentRender((
            (record.mockup?.innerHTML||'')
                .replace(new RegExp(match[0]), `<${SyDetr}=${ match[1] }${SyDetr}>` )
        ),  component.$transactions || {} as V)

    }

    if(record.attribute){

        if(record.attributeName ){

            record.element.setAttribute(record.attributeName, FragmentRender((
                (record.mockup?.getAttribute(record.attributeName) || '').replace(new RegExp(match[0]), `<${SyDetr}=${ match[1] }${SyDetr}>` )
            ),  component.$transactions || {} as V) )

        }
        
    }

    return ParseRecord;
    
}







function StabilizeContent(content: string) : string{
    return (content||'').replace(/&gt;/g, `>`).replace(/&lt;/g, `<`)
}







class SensenJutsu<V extends { [K: string] : any, $context?: V }>{


    $staticKey: number = 0;

    $element?: HTMLElement | null = document.body;

    $fromString?: string;

    $virtualization: Document | null = null;

    $transactions: V = {} as V;

    $state: V = {} as V;

    $refs: { [Re in keyof V] ?: Array<SensenTJutsuObserverRecords> } = {};

    // #$props : SensenTJutsuProps<V> = {} as SensenTJutsuProps<V>
    

    /**
     * New Construct
     */
    constructor(props: SensenTJutsuProps<V>){

        // this.props = props;

        this.Init(props).States().Render();

    }

    Init(props: SensenTJutsuProps<V>){

        // this.#$props = props;

        this.$element = (props.element instanceof HTMLElement) 
            
            ? props.element 
            
            : (
                
                typeof props.element == 'string' 
                
                    ? document.querySelector(`${ props.element }`) 
                    
                    : null
                    
            )

        this.$transactions = props.transactions || {} as V;

        this.$state = Object.assign({}, this.$transactions)


        window.StaticSensenJutsuInstance = window.StaticSensenJutsuInstance || []
        
        this.$staticKey = window.StaticSensenJutsuInstance.length;

        window.StaticSensenJutsuInstance[ this.$staticKey ] = this


        return this;

    }





    UpgradeTransaction(key : keyof V){


        if(key in this.$refs){

            const records = this.$refs[ key ];

            records?.map(record=>{
                  
                if(record){
        
                    record.matches.map(match=>{

                        if(!record.isNative){

                            ParseRecord<V>(this, record, match);

                        }

                        else{

                            if(record.content){

                                const computed = FragmentRender(StabilizeContent(record.mockup?.innerHTML||''), this.$transactions);

                                record.element.innerHTML = computed

                                $DOMObserver(record.element, (rec)=>{

                                    if(rec.matches.length){

                                        Object.values(rec.matches).map(mat=>{

                                            this.PushRef(mat[1], rec)

                                            ParseRecord<V>(this, rec, mat);

                                        })
                                        
                                    }


                                })
                                

                            }
                            
                        }
            
                    })
            
                }
        
      
            })
    
            
        }
        
        return this;
        
    }





    States(){

        if(this.$state){

            const $_states = Object.entries(this.$state);

            

            /**
             * States
             */
            if($_states.length){

                const self = this;

    
                /**
                 * Pre-Build States
                 */
                $_states.map(e=>{

                    if(typeof e[1] == 'string'){
                        
                        const name = e[0] as keyof V;

                        const finder = [...e[1].matchAll(SyntaxVariablesRegExp)]

                        if(finder.length){

                            finder.map(found=>{

                                found[1] = found[1].trim()

                                this.$transactions[ name ] = e[1].replace(new RegExp(`${ found[0] }`), this.$state[ found[1] ]);
                                
                            })
                            
                        }


                    }
                    
                })

                
                
                
                /**
                 * Build States
                 */
                
                const $states = Object.entries(this.$state);
    
                $states.map(e=>{

                    const name = e[0] as keyof V;


                    /**
                     * Objects
                     */
                    if(typeof e[1] == 'object'){


                        /**
                         * Is Array
                         */

                        if(Array.isArray(e[1])){

                            this.$state[ name ] = new Proxy<typeof e[1]>(e[1], {
    
                                set(target, prop, receive){

                                    if(typeof target[prop] == 'function'){

                                        (()=>{
                                            console.warn('SET MOVE With Function', prop)
                                            return target[prop]
                                        }).apply(target, typeof receive == 'object' ? receive : [receive])
                                        
                                    }

                                    else{
                                        
                                        target[prop] = receive

                                    }
    
                                    self.$transactions[ name ] = target
                        
                                    self.UpgradeTransaction( name )
    
                                    return true;
    
                                }
                                
                            })

                            this.$transactions[ name ] = this.$state[ name ]

                            this.$state[ name ][0] = ('Teston')


                        }


                        else{

                            console.warn('State of Object', e)
                            
                        }

                    }

                    else{

                        Object.defineProperty(this.$state, `${ name }`, {

                            get: function(){ return self.$transactions[ name ]; },
    
                            set: function(value){
    
                                self.$transactions[ name ] = value
                                
                                self.UpgradeTransaction( name )
                                
                            },
                        })
    
                    }


                })
                
            }
            
        }


        return this;
        
    }
    


    PushRef(key: keyof V, record: SensenTJutsuObserverRecords){

        this.$refs[ key ] = this.$refs[ key ] || [];

        this.$refs[ key ]?.push(record)

        return this;
        
    }
    



    

    

    Render(){


        if(this.$element instanceof HTMLElement){

            this.$virtualization = (new DOMParser()).parseFromString(this.$element.innerHTML, 'text/html')


            /**
             * Traitement des expressions Native
             */

             $DOMObserver(this.$virtualization.body, (record)=>{

                if(record.matches.length){

                    // @ts-ignore
                    record.element.$context = this.$state;

                    if(record.isNative){

                        if(record.matches){

                            record.matches.map(match=>{

                                record.element.innerHTML = (StabilizeContent(record.element.innerHTML||'').replace(match[0], `<${SyDetr}${ match[1] }${SyDetr}>`))

                            })

                            $JSFindTransactions<V>(record.element, this.$transactions, (rec)=>{

                                if(rec.isNative){

                                    if(rec.matches.length){

                                        rec.matches.map(mat=>{

                                            this.PushRef(mat[0] as keyof V, rec)
                                            
                                        })

                                    }
                                    
                                }

                            })

                            try{

                                record.element.innerHTML = `${ FragmentRender(StabilizeContent(record.element.innerHTML||''), this.$transactions) }`
    
                            }catch(e){
    
                                console.log('Error detected', e)
                                
                            }
                            
                        }


                    }
                    
                }

            });



            /**
             * Traitement des transactions
             */

            ParseNodeState<V>(this, this.$virtualization.body)


            /**
             * Mise à jour
             */
            this.$element.innerHTML = '';

            const children = Object.values( this.$virtualization.body.children );

            if(children.length){

                children.map(child => {

                    this.$element?.appendChild(child);
                    
                })
                
            }
                
        }


        return this;
        
    }

}






export default SensenJutsu

