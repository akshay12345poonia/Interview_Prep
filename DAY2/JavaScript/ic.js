let people =[{ name: "Alice", age: 25 }, { name: "Bob", age: 17 }, { name: "Charlie", age: 30 }]
 
let men = people.filter(age => age.age >= 18)
console.log(men)

console.log("5" - 2) //number
console.log("5" + 2)

console.log(Number("5"))


console.log(0 == false) //true
console.log(0 === false) //false

isNaN() //convert value fist

isNaN("hello") //true
Number.isNaN("hello") //false

console.log({} + []);