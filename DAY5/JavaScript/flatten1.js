function deepFlatten(arr){
    let res = [];
    for(let item of arr){
        if(Array.isArray(item))
        {
            res.push(...deepFlatten(item))
        }
        else{
            res.push(item)
        }
    }
    return res
}

const nested = [1, [2, [3, [4, 5]], 6], [7, 8], 9, [[10]]];
console.log(deepFlatten(nested))

                        //OR

