const employees = [
  { id: 1, name: 'John', dept: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane', dept: 'Engineering', salary: 95000 },
  { id: 3, name: 'Bob', dept: 'Marketing', salary: 65000 },
  { id: 4, name: 'Alice', dept: 'Engineering', salary: 88000 },
  { id: 5, name: 'Charlie', dept: 'Marketing', salary: 72000 },
  { id: 6, name: 'Diana', dept: 'HR', salary: 70000 }
];

let res = employees.reduce((acc, {name, dept, salary}) =>{
    if(!acc[dept]){

        acc[dept] = {employees: [], totalSalary: 0, totalCount:0};
    }    
        acc[dept].employees.push(name);
        acc[dept].totalSalary += salary;
        acc[dept].totalCount += 1;
        return acc;
    
}, {});

for(let dept in res){
    res[dept].averageSalary = +(res[dept].totalSalary / res[dept].totalCount).toFixed(2);
    delete res[dept].totalSalary
}
console.log(res)
