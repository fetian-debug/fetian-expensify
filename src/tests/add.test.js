const add = (a,b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}`;

test ('should add two numbers', () => {
    const result = add(4,5);
    expect(result).toBe(9)
});

test ('should generate greeting from name', () => {
    const greeting = generateGreeting('HuLK');
    expect(greeting).toBe('Hello HuLK');
});

test ('should generate greeting from no name', () => {
    const greeting = generateGreeting();
    expect(greeting).toBe('Hello Anonymous');
});