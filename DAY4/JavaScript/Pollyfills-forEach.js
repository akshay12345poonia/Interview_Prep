Array.prototype.myForEach = function(callback){
    if(typeof callback !== "function"){
        throw new TypeError(callback + "is not a function")
    }
    let arr = this;
    for(let i =0; i < arr.length; i++){
        callback(arr[i], i, arr)
    }
}

const nums = [1, 2, 3, 4, 5];
const result = [];
nums.myForEach((num, index) => {
  result.push(num * index);
});
console.log(result); // [0, 2, 6, 12, 20]
