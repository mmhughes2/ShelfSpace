const base = import.meta.env.BASE_URL;

export const homeTestimonials = [
  {
    quote: "ShelfSpace completely changed how I read.",
    text: "I used to lose track of my TBR list. Now everything is organized beautifully in one place.",
    author: "Avery R., Atlanta, GA",
  },
  {
    quote: "The progress tracking keeps me motivated.",
    text: "Seeing my reading streak and completion stats actually makes me excited to open my book every night.",
    author: "Jasmine P., Charlotte, NC",
  },
  {
    quote: "I finally found my book people.",
    text: "The virtual book clubs feel personal, fun, and super easy to join. I've made real friends here.",
    author: "Maya T., New York, NY",
  },
];

export const shelfBooks = [
  {
    title: "Honey & Spice",
    author: "Bolu Babalola",
    image: `${base}assets/myshelf/book-honey-spice.jpg`,
  },
  {
    title: "The Bluest Eye",
    author: "Toni Morrison",
    image: `${base}assets/myshelf/book-bluest-eye.jpg`,
  },
  {
    title: "The Blood of Emmett Till",
    author: "Timothy B. Tyson",
    image: `${base}assets/myshelf/book-emmett-till.jpg`,
  },
];

export const exploreBooks = [
  {
    id: 1,
    title: "Honey & Spice",
    author: "Bolu Babalola",
    genre: "Contemporary Romance",
    rating: 4.7,
    section: "popular",
    tagline:
      "Sharp chemistry, campus chaos, and a very addictive fake-dating setup.",
    image: `${base}assets/myshelf/book-honey-spice.jpg`,
  },
  {
    id: 2,
    title: "The Bluest Eye",
    author: "Toni Morrison",
    genre: "Literary Fiction",
    rating: 4.9,
    section: "popular",
    tagline:
      "A powerful classic that stays with readers long after the last page.",
    image: `${base}assets/myshelf/book-bluest-eye.jpg`,
  },
  {
    id: 3,
    title: "The Blood of Emmett Till",
    author: "Timothy B. Tyson",
    genre: "History",
    rating: 4.8,
    section: "popular",
    tagline:
      "A gripping look at one of the most important stories in American history.",
    image: `${base}assets/myshelf/book-emmett-till.jpg`,
  },
  {
    id: 4,
    title: "The Let Them Theory",
    author: "Mel Robbins",
    genre: "Self Growth",
    rating: 4.6,
    section: "popular",
    tagline:
      "A motivating mindset reset focused on peace, control, and everyday growth.",
    image: `${base}assets/myshelf/current-book.jpg`,
  },
  {
    id: 5,
    title: "Children of Blood and Bone",
    author: "Tomi Adeyemi",
    genre: "Fantasy",
    rating: 4.8,
    section: "chosen",
    tagline:
      "Magic, rebellion, and unforgettable stakes in a high-energy fantasy world.",
    image: `${base}assets/profile/book1.png`,
  },
  {
    id: 6,
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    genre: "Epic Fantasy",
    rating: 4.7,
    section: "chosen",
    tagline:
      "A sweeping dragon-filled fantasy with rich worldbuilding and huge emotional payoff.",
    image: `${base}assets/profile/book2.jpg`,
  },
  {
    id: 7,
    title: "Honey & Spice Revisit",
    author: "Bolu Babalola",
    genre: "Book Club Favorite",
    rating: 4.5,
    section: "chosen",
    tagline:
      "A warm, stylish reread for anyone craving clever dialogue and romantic tension.",
    image: `${base}assets/myshelf/book-honey-spice.jpg`,
  },
  {
    id: 8,
    title: "The Bluest Eye Spotlight",
    author: "Toni Morrison",
    genre: "Critical Read",
    rating: 5,
    section: "chosen",
    tagline:
      "A deeply reflective pick for readers looking for layered discussion and analysis.",
    image: `${base}assets/myshelf/book-bluest-eye.jpg`,
  },
];

export const friends = [
  {
    name: "Victoria Anderson",
    handle: "@FictionFlirt",
    image: `${base}assets/profile/friend1.png`,
  },
  {
    name: "Michael Taylor",
    handle: "@PlotTwistKing",
    image: `${base}assets/profile/friend2.png`,
  },
  {
    name: "Fernando Suarez",
    handle: "@CoffeeandChapters",
    image: `${base}assets/profile/friend3.png`,
  },
];
