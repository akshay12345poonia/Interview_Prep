Array.prototype.myReduce=function(callback, initialValue){
    if(typeof callback !== "function"){
        throw new TypeError(callback + "is not a function");
    }
    let arr = this;
    let acc;
    let startIndex;
    if(arguments.length > 1){
        acc = initialValue;
        startIndex = 0

    }
    else 
    {
        if(arr.length === 0){
            throw new TypeError("Reduce of empty array with no initial value")
        }
        acc = arr[0]
        startIndex = 1
    }
    for(let i = startIndex; i < arr.length; i++){
        acc = callback(acc, arr[i], i, arr);
    }
    return acc;
}

const nums = [1, 2, 3, 4, 5];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'banana' }
];
const grouped = items.myReduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item.name);
  return acc;
}, {});
console.log(grouped);
