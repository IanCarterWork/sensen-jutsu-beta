import SensenJutsu from "./index";
const vm = new SensenJutsu({
    element: '#app',
    transactions: {
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
        increment() {
            this.persons[1] = ('IanCarter Now');
            this.counter++;
            // this.message = `We count to ${ this.counter }`
            console.log('Increment', this.counter, this.persons);
        }
    },
});
console.warn('VM', vm);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2NvcmUvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxTQUFTLENBQUM7QUFHbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUM7SUFFdkIsT0FBTyxFQUFFLE1BQU07SUFFZixZQUFZLEVBQUM7UUFFVCxLQUFLLEVBQUUsZ0JBQWdCO1FBRXZCLE9BQU8sRUFBRSwyQkFBMkI7UUFFcEMsS0FBSyxFQUFFLFlBQVk7UUFFbkIsT0FBTyxFQUFFLENBQUM7UUFFVixPQUFPLEVBQUU7WUFDTCxNQUFNO1lBQ04sV0FBVztZQUNYLE9BQU87WUFDUCxPQUFPO1NBQ1Y7UUFHRCxpQ0FBaUM7UUFDakMsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsY0FBYztRQUNkLE9BQU87UUFDUCxrQkFBa0I7UUFFbEIsNENBQTRDO1FBRTVDLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsU0FBUztRQUNULGtCQUFrQjtRQUVsQixtQkFBbUI7UUFFbkIsNkNBQTZDO1FBRTdDLHNCQUFzQjtRQUN0QixRQUFRO1FBQ1IsTUFBTTtRQUVOLFNBQVM7WUFFTCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7WUFFbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWYsaURBQWlEO1lBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFBO1FBRXpELENBQUM7S0FFSjtDQUdKLENBQUMsQ0FBQTtBQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbnNlbkp1dHN1IGZyb20gXCIuL2luZGV4XCI7XG5cblxuY29uc3Qgdm0gPSBuZXcgU2Vuc2VuSnV0c3Uoe1xuXG4gICAgZWxlbWVudDogJyNhcHAnLFxuXG4gICAgdHJhbnNhY3Rpb25zOntcblxuICAgICAgICB0aXRsZTogJ0hlbGxvIGxlcyBnZW5zJyxcblxuICAgICAgICBtZXNzYWdlOiAnTG9yZW0gaXBzdW0ge3sgY291bnRlciB9fScsXG5cbiAgICAgICAgcm91dGU6ICdjb21pbmdzb29uJyxcblxuICAgICAgICBjb3VudGVyOiAwLFxuXG4gICAgICAgIHBlcnNvbnM6IFtcbiAgICAgICAgICAgICdZYW5uJyxcbiAgICAgICAgICAgICdDaHJpc3RpbmEnLFxuICAgICAgICAgICAgJ015YW5hJyxcbiAgICAgICAgICAgICdTeWFuYSdcbiAgICAgICAgXSxcbiAgICAgICAgXG5cbiAgICAgICAgLy8gcGVyc29uczogbmV3IFByb3h5PHN0cmluZ1tdPihbXG4gICAgICAgIC8vICAgICAnWWFubicsXG4gICAgICAgIC8vICAgICAnQ2hyaXN0aW5hJyxcbiAgICAgICAgLy8gICAgICdNeWFuYScsXG4gICAgICAgIC8vICAgICAnU3lhbmEnXG4gICAgICAgIC8vIF0sIHtcbiAgICAgICAgLy8gICAgIGdldCh0LHAscil7XG5cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnR0VUIFNUQVRFJywgdCwgcCwgcilcblxuICAgICAgICAvLyAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0W3BdXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0KHQscCxyKXtcblxuICAgICAgICAvLyAgICAgICAgIHRbcF0gPSByXG5cbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLndhcm4oJ1NFVCBTVEFURScsIHQsIHAsIHIpXG5cbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KSxcbiAgICAgICAgXG4gICAgICAgIGluY3JlbWVudCgpIDogdm9pZHtcblxuICAgICAgICAgICAgdGhpcy5wZXJzb25zWzFdID0gKCdJYW5DYXJ0ZXIgTm93JylcblxuICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XG5cbiAgICAgICAgICAgIC8vIHRoaXMubWVzc2FnZSA9IGBXZSBjb3VudCB0byAkeyB0aGlzLmNvdW50ZXIgfWBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luY3JlbWVudCcsIHRoaXMuY291bnRlciwgdGhpcy5wZXJzb25zIClcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG5cblxufSlcblxuY29uc29sZS53YXJuKCdWTScsIHZtKSJdfQ==