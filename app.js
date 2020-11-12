let app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Classes',
        lessons: lessons,
        cart:[],
        sortByArray:['subject','location', 'price', 'availableSpaces'],
        selectBy: 'subject',
        orderByArray: ['ascending', 'descending'],
        selectOrder: 'ascending',
        showCartPage: false,
        checkout: {
            name: '',
            number: ''
        }
    },
    methods: {
        addToCart(lesson){
            if(lesson.availableSpaces > 0){
                lesson.availableSpaces--;
                
                let added = false;
                this.cart.forEach(elem => {
                    if(elem.lesson == lesson){
                        added = true;
                        elem.noOfItem++;
                    }
                });

                if(!added){
                    this.cart.push({
                        lesson: lesson,
                        noOfItem: 1
                    });
                }
            }
        },
        anySpacesLeft(lesson){

            if(lesson.availableSpaces <= 0){
                return true;
            } else {
                return false;
            }
        },
        removeElemFromCart(id){
            this.cart[id].lesson.availableSpaces += this.cart[id].noOfItem;
            this.cart.splice(id, 1);
        }
    },
    computed:{
        noCartItems() {  
            return this.cart.length;
        },
        cartButtonVisible(){
            if(this.noCartItems <=0){
                return false;
            }else {
                return true;
            }
        },

        sortLessons() {
            let lessonsArray = this.lessons.slice(0); 
            let that = this;
            function compare(a, b) {
                if (a[that.selectBy] > b[that.selectBy]) {
                    return that.selectOrder == 'ascending' ? 1 : -1;
                }
                if (a[that.selectBy] < b[that.selectBy]) {
                    return that.selectOrder == 'ascending' ? -1 : 1;
                }
                return 0; 
            }
            return lessonsArray.sort(compare); 
        },

        getTotalPrice(){
            let total = 0;
            this.cart.forEach(elem => {
                
                total += elem.lesson.price*elem.noOfItem;   
              
            });
            return total;
        },
        validCheckout(){
            let testName= /^[a-zA-z]+$/.test(this.checkout.name);
            let testNumber= /^\d+$/.test(this.checkout.number);

            if (testName && this.checkout.name.length > 1 && testNumber){
                return true;
            }
            return false;
        }

    

        
    }
})