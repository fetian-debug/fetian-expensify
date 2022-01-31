

const address =['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147']
//const address =[]

//const [ street, city, state, zip ] = address
const [, city, state = 'Default State'] = address

console.log(`You are in ${city} ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [itemName, , mediumPrice] = item

console.log(`A medium ${itemName} costs ${mediumPrice}`)