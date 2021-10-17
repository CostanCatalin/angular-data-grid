import { Person } from "./person.model";

const firstNames = [
  "Smith",
  "Brown",
  "Miller",
  "Johnson",
  "Jones",
  "Davis",
  "Williams",
  "Wilson",
  "Clark",
  "Taylor",
  "Mary",
  "Sarah",
  "Elizabeth",
  "Martha",
  "Margaret",
  "Nancy",
  "Ann",
  "Jane",
  "Eliza",
  "Catherine"
];
const lastNames = [
  "Smith",
  "Brown",
  "Davis",
  "Jones",
  "Johnson",
  "Clark",
  "Williams",
  "Miller",
  "Wilson"
];

function getRandomPerson(id: number) {
  return {
    id: id,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    age: Math.floor(Math.random() * 70) + 10
  }
}

export const PEOPLE: Person[] = [...Array(100)].map((_, i) => {
  return getRandomPerson(i);
});
