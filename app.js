let app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Classes',
        lessons: lessons,
        cart:[]
    },
    methods: {
        addToCart(lesson){
            if(lesson.availableSpaces > 0){
                lesson.availableSpaces--;
                this.cart.push(lesson.id);
            } else {
                alert ("There is no available spaces");
            }
        },
        anySpacesLeft(lesson){
            if(lesson.availableSpaces <= 0){
                return true;
            } else {
                return false;
            }
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
        }

        
    }
})