
// Function Declaration
function add(a, b){
    return a + b;
}
console.log(add(4, 2));

// Function Expression
let mult = function(a, b){
    return a * b;
}

console.log(mult(4, 2));

// Arrow Function
let div = (a,b) => {
    return a / b;
}

// regular function
let person = {
    name: "akshay",
    age: 25,
    hello: function(){
        console.log(`helll, I amm ${this.name}`)

    },

    helloArrow: () => {
         console.log(`helll, I amm ${this.name}`)

    }
}

person.hello(); // works fine
person.helloArrow(); // undefined

// Q4: What will be the output?
for (var i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 1000);
}

// Q5: Fix the above code to print 0, 1, 2

for(let i = 0; i < 3; i++){
    setTimeout(() => console.log(i), 1000)
}

for(var i = 0; i < 3; i++){
    (function(i) {
        setTimeout(() => console.log(i), 1000)
    })(i) ;
}