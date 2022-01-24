import SensenJutsu from "./index";


const vm = new SensenJutsu({

    element: '#app',

    transactions:{

        title: 'Hello les gens',

        message: 'Lorem ipsum {{ counter }}',

        route: 'comingsoon',

        counter: 0,

        persons: [
            'Yann',
            'Christina',
            'Myana',
            'Syana'
        ],
        

        // persons: new Proxy<string[]>([
        //     'Yann',
        //     'Christina',
        //     'Myana',
        //     'Syana'
        // ], {
        //     get(t,p,r){

        //         console.log('GET STATE', t, p, r)

        //         //@ts-ignore
        //         return t[p]
        //     },
        //     set(t,p,r){

        //         t[p] = r

        //         console.warn('SET STATE', t, p, r)

        //         return true
        //     }
        // }),
        
        increment() : void{

            this.persons[1] = ('IanCarter Now')

            this.counter++;

            // this.message = `We count to ${ this.counter }`
            
            console.log('Increment', this.counter, this.persons )
            
        }
        
    },


})

console.warn('VM', vm)