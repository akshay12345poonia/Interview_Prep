function multiLevelSort(employees){
    return employees.sort((a, b) => {
        const deptComp = a.dept.localeCompare(b.dept)
        if(deptComp !== 0) return deptComp;

        if(b.salary !== a.salary){
            return b.salary - a.salary;
        }
        return a.name.localeCompare(b.name)
    })
}

const employees = [
  { name: 'John', dept: 'Engineering', salary: 80000 },
  { name: 'Alice', dept: 'Engineering', salary: 95000 },
  { name: 'Bob', dept: 'Marketing', salary: 95000 },
  { name: 'Charlie', dept: 'Engineering', salary: 95000 },
  { name: 'Diana', dept: 'Marketing', salary: 95000 },
  { name: 'Eve', dept: 'HR', salary: 70000 }
];

console.log(multiLevelSort(employees))