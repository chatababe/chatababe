export const navigation = [
  {
    id: 0,
    title: "Home",
    url: "/",
  },
  {
    id: 1,
    title: "Discover",
    url: "/discover",
  },
  {
    id: 2,
    title: "Private Shows",
    url: "/private",
  },
  {
    id: 4,
    title: "Following",
    url: "/following",
  },
];
export const categories = [
  {
    id: 0,
    title: "featured",
  },
  {
    id: 1,
    title: "men",
  },
  {
    id: 2,
    title: "women",
  },
  {
    id: 3,
    title: "couples",
  },
  {
    id: 4,
    title: "trans",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Basic Package",
    icon: "/free-plan.svg",
    price: 20,
    credits: 50,
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/free-plan.svg",
    price: 40,
    credits: 100,
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/free-plan.svg",
    price: 199,
    credits: 2000,
  },
];

export const locations = [
  { value: "North America", label: "United States" },
  { value: "Europe/Russia", label: "United Kingdom" },
  { value: "North America", label: "Canada" },
  { value: "Other", label: "Australia" },
  { value: "Asia", label: "India" },
  { value: "South America", label: "Brazil" },
  { value: "Europe/Russia", label: "Germany" },
  { value: "Europe/Russia", label: "France" },
  { value: "Asia", label: "Japan" },
  { value: "Asia", label: "South Korea" },
  {value:"Europe/Russia",label:"Russia"},
  {value:"Other",label:"Africa"}
].sort((a, b) => a.label.localeCompare(b.label));

export enum Preference {
  MEN = "Men",
  WOMEN = "women",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
  UNKNOWN = "Prefer not to say",
}

export const age = ["18-24", "24-32", "33-45", "45-60", "older"];

export const rooms = ["Intimate", "Mid-sized", "High-traffic"];

export const tags = [
  "asian",
  "bigboobs",
  "ebony",
  "anal",
  "mature",
  "hairy",
  "new",
  "latina",
  "squirt",
  "bbw",
  "skinny",
  "teen",
  "smalltits",
  "feet",
  "Fuckmachine",
  "bigass",
  "german",
  "deepthroat",
  "mistress",
  "pantyhose",
  "young",
  "pinay",
  "milk",
  "redhead",
  "pregnant",
  "shy",
  "bigcock",
  "c2c",
  "muscle",
  "Femboy",
  "Indian",
  "curvy",
  "smoke",
  "goth",
  "bbc",
  "French",
  "nonude",
  "lesbien",
  "natural",
  "blonde",
  "daddy",
  "british",
  "Femdom",
  "bigpussylips",
  "blowjob",
  "anal-play",
  "fingering"
];

export const regions = [
  "North America",
  "South America",
  "Asia",
  "Europe/Russia",
  "Other",
];

export const streamBasedRoutes = [
  "6 Tokens per Minute",
  "12-18 Tokens per Minute",
  "30-42 Tokens per Minute",
  "60-72 Tokens per Minute",
  "90+ Tokens per Minute",
  "Private Shows",
  "New Cams",
];

export const userBasedRoutes = [
  "Teen Cams (18+)",
  "18 to 21 cams",
  "20 to 30 cams",
  "30 to 50 cams",
  "Mature cams",
  "North American Cams",
  "South American Cams",
  "Euro Russian Cams",
  "Asian Cams",
  "Other Regions",
  "Featured Cams",
  "Female Cams",
  "Male Cams",
  "Couple Cams",
  "Trans Cams",
];
