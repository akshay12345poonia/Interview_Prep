let people =[{ name: "Alice", age: 25 }, { name: "Bob", age: 17 }, { name: "Charlie", age: 30 }]
 
let men = people.filter(age => age.age >= 18)
console.log(men)