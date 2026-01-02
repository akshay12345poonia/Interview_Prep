function flattenObject(obj, parentKey = "", res = {}){
    for(let key in obj){
        let newKey = parentKey ? `${parentKey}.${key}` : key;
        if(typeof obj[key] === "object" && obj[key] !== null){
            flattenObject(obj[key], newKey, res);
        }
        else {
            res[newKey] = obj[key];
        }
    }
    return res;
}

const obj = {
  name: 'John',
  address: {
    city: 'NYC',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  hobbies: ['reading', 'gaming']
};

console.log(flattenObject(obj))