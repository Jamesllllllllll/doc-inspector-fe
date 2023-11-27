export default function getRandomName() {
  const names = [
      "Liam", "Noah", "Oliver", "Ethan", "Aiden", "Gabriel", "Muhammad", "Yusuf", "Arjun", "Raj",
      "Carlos", "Alejandro", "Luca", "Mateo", "Ivan", "Dmitry", "Hiroshi", "Kenji", "Chen", "Liang",
      "Kwame", "Oluwatosin", "Ivan", "Nikolai", "Alexei", "Yuri", "Maxim", "Artem", "Sergei", "Andrei",
      "Leonardo", "Ricardo", "Miguel", "Pablo", "Enrique", "Kaito", "Haruto", "Yuto", "Sota", "Yuki",
      "Daiki", "Ryota", "Ren", "Koki", "Shun", "Takumi", "Yusei", "Sora", "Riku", "Ryusei",
      "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Amelia", "Harper", "Evelyn", "Abigail",
      "Luna", "Aurora", "Scarlett", "Aria", "Penelope", "Layla", "Chloe", "Victoria", "Madelyn", "Nora",
      "Ellie", "Hazel", "Zoey", "Riley", "Autumn", "Arianna", "Savannah", "Audrey", "Brooklyn", "Bella",
      "Claire", "Skylar", "Lucy", "Paisley", "Everly", "Addison", "Leah", "Violet", "Piper", "Gabriella",
      "Raelynn", "Sophie", "Serena", "Aubree", "Kinsley", "Ariana", "Elliana", "Aaliyah", "Cora", "Jasmine",
      "Melody", "Isla", "Isabelle", "Josephine", "Khloe", "Adalynn", "Valentina", "Ivy", "Athena", "Ruby",
      "Alex", "Jordan", "Taylor", "Charlie", "Morgan", "Riley", "Casey", "Jamie", "Avery", "Rowan",
      "Quinn", "Skyler", "Finley", "Dakota", "Reese", "Robin", "Emerson", "Blair", "Sage", "Peyton",
      "Phoenix", "Harley", "Elliot", "Frankie", "Leslie", "Cameron", "Hayden", "Jessie", "Kai", "Devin",
      "Marley", "Drew", "Sidney", "Adrian", "Jaden", "Ariel", "Shannon", "Micah", "Angel", "Kendall",
      "Teagan", "Justice", "Sam", "River", "Sawyer", "Remy", "Rory", "Jules", "Kris", "Corey"
  ];

  // Randomly select a name
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}