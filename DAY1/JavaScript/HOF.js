const employees = [
  { id: 1, name: "Alice", department: "Engineering", salary: 120000, experience: 5, rating: 4.8 },
  { id: 2, name: "Bob", department: "Engineering", salary: 95000, experience: 2, rating: 3.9 },
  { id: 3, name: "Charlie", department: "Sales", salary: 80000, experience: 4, rating: 4.5 },
  { id: 4, name: "Diana", department: "HR", salary: 70000, experience: 1, rating: 3.2 },
  { id: 5, name: "Evan", department: "Engineering", salary: 135000, experience: 7, rating: 4.9 },
  { id: 6, name: "Fiona", department: "Marketing", salary: 90000, experience: 3, rating: 4.1 },
  { id: 7, name: "George", department: "Sales", salary: 65000, experience: 1, rating: 3.5 },
  { id: 8, name: "Hannah", department: "Engineering", salary: 110000, experience: 4, rating: 4.6 },
  { id: 9, name: "Ian", department: "Marketing", salary: 105000, experience: 6, rating: 4.7 },
  { id: 10, name: "Jenny", department: "HR", salary: 72000, experience: 3, rating: 3.8 },
  { id: 11, name: "Kevin", department: "Sales", salary: 125000, experience: 8, rating: 4.2 },
  { id: 12, name: "Liam", department: "Engineering", salary: 98000, experience: 3, rating: 4.0 },
  { id: 13, name: "Mia", department: "Design", salary: 85000, experience: 2, rating: 4.3 },
  { id: 14, name: "Noah", department: "Design", salary: 115000, experience: 9, rating: 4.8 },
  { id: 15, name: "Olivia", department: "Marketing", salary: 78000, experience: 2, rating: 3.9 }
];

// 1. VIP List (Filter and Map)
const getHighPerformers = (data) => {
    return data
        .filter((emp) => emp.rating >= 4.5).map((emp) => emp.name)
};

// 2. Budget Planning (Filter and Reduce)
const getTotalSalaryByDepartment = (data, department) => {
    return data
        .filter((emp) => emp.department === department)
        .reduce((total, emp) => total + emp.salary, 0)
}

// 3. Experience Ranking (Sort with tie braker)
const rankByExperience = (data) => {
    return [...data].sort((a,b) => {
        if(b.experience === a.experience){
            return b.experience - a.experience;
        }
        return b.salary - a.salary;
    })
}

// 4. Department censsus by Reduce HOF
const getDepartmentCount = (data) => {
    return data.reduce((census, emp) => {
        census[emp.department] = (census[emp.department] || 0) + 1;
        return census;
    }, {});
};

// 5. Boss Level - Average Salary per department
const getAverageSalaryByDepartment = (data) => {
    const salaryByDept = data.reduce((acc, emp) => {
        if(!acc[emp.department]){
            acc[emp.department] = {total: 0, count: 0};
        }
        acc[emp.department].total += emp.salary;
        acc[emp.department].count += 1;
        return acc;
    }, {});
    return Object.entries(salaryByDept).reduce((result, [dept, {total, count}]) => {
        result[dept] = Math.round(total /count);
        return result;
    }, {});
};

console.log("=".repeat(60));
console.log("HR Analytics DASHBOARD - RESULTS");
console.log("=".repeat(60));

console.log("\n1 VIP LIST - High performers (RATING >= 4.5)");
console.log("  Names for Thank-You Emails:");
console.log("   ", getHighPerformers(employees));

console.log("\n2 Budget Planning - Engineering Departments Salary");
console.log("    Total Annual cost:");
console.log("  ", `$${getTotalSalaryByDepartment(employees, "Engineering").toLocaleString()}`);

console.log("\n3️⃣  EXPERIENCE RANKING - All Employees by Experience");
console.log("   (Sorted by Experience DESC, then Salary DESC)");
rankByExperience(employees).forEach((emp) => {
  console.log(`   ${emp.name.padEnd(10)} | Exp: ${emp.experience} | Salary: $${emp.salary.toLocaleString()}`);
});

console.log("\n4️⃣  DEPARTMENT CENSUS - Headcount per Department");
console.log("   Employee Distribution:");
console.log("  ", getDepartmentCount(employees));

console.log("\n5️⃣  BOSS LEVEL - Average Salary per Department");
console.log("   Department Salary Averages:");
console.log("  ", getAverageSalaryByDepartment(employees));

console.log("\n" + "=".repeat(60));