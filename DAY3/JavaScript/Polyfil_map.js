if(!Array.prototype.myMap){
    Array.prototype.myMap = function(callback, thisArg){
        // We Check if the callback is a funtction
        if(typeof callback !== "function"){
            throw new TypeError(callback + " is not a function")
        }
        const array = this;
        let length = array.length;
        let res = new Array(length)
        for(let i=0; i<length; i++){
            if(i in array){
                res[i]=callback.call(thisArg, array[i],i, array);
            }
        }

        return res;
    }
}

const nums = [1, 2, 3, 4, 5];
const doubled = nums.myMap(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
const names = users.myMap(u => u.name);
console.log(names); // ['John', 'Jane']

const multiplier = {
    factor: 3,
    multiply: function(x){
        return x * this.factor;
    }
};

// let tripled = nums.myMap(multiplier.multiply, multiplier)
// console.log("Q1- Map Test 3 (with thisArg):", tripled)