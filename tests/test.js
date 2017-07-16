let arr = ['hi', 'this', 'is', 'an', 'interval', 'function'];
let i = 0;
var timer = setInterval(() => {
    if(arr[i]){
        console.log(arr[i]);
        i++;
    } else {
        console.log('DONE!');
        clearInterval(timer);
    }
}, 1000);