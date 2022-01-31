// console.log('destructuring');

// Object destructuring
// const person = {
//     age: 26,
//     location: {
//         city: 'Banka',
//         temp: 92
//     }
// };

// // const name = person.name;
// // const age = person.age;
// const {name : firstName = 'Anonymous', age} = person;
// console.log(`${firstName} is ${age}`);

// const {city, temp: temperature} = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//     }
// };

// const {publisher : { name: publisherName = 'Self-publish'} } = book;
// console.log(publisherName);


// Array destructuring
const address = ['1299 S Juniper Street', 'Banka', 'Cameroon', '37'];
const [, city, state = 'Bafang'] = address;
console.log(`you are in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);