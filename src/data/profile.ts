/**
 * Everything the page says, in one place. Components only arrange it.
 *
 * Facts here are checked against the old site, the résumé and harfstudios.fun.
 * Do not add numbers or claims that cannot be pointed to.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Role {
  title: string;
  start: string;
  end: string;
}

/** A line of text, optionally with one phrase in it linked. */
export type Line = string | { text: string; link: Link };

export interface Job {
  company: string;
  /** The name in Urdu, shown beside it. */
  urdu?: string;
  href: string;
  summary: string;
  /** A name in the summary to link, such as a co-founder. */
  mention?: Link;
  links?: Link[];
  roles: Role[];
  highlights: Line[];
}

export interface Project {
  name: string;
  /** What it is, in a few words. */
  tagline: string;
  description: string;
  stack: string[];
  links: Link[];
  year?: string;
}

export interface Article {
  title: string;
  href: string;
  where: string;
  note: string;
}

export interface Credit {
  title: string;
  detail: string;
  href?: string;
}

export const hero = {
  lede: "I build backend systems at Groww, and I co-founded Harf Studios to make Urdu fun for everyone.",
};

export const credo = {
  lead: "I’m an engineer who loves to build: not just systems that scale, but",
  quote: "ideas that question norms and tools that quietly empower.",
  body: [
    "What I care about most is where code meets compassion. I’m drawn to how technology shapes the way people think and feel, how it might support mental health, and how it can make learning fairer for everyone.",
    "Lately a lot of that has gone into Urdu. I found it through Nusrat and the Sabris and never quite left, and Harf is my way of holding that door open for other people.",
  ],
  close:
    "Above all, I believe engineering should be inclusive by design: thoughtful, humane, and built to serve those most often left out.",
};

export const work: Job[] = [
  {
    company: "Harf Studios",
    urdu: "حرف",
    href: "https://harfstudios.fun",
    summary:
      "Harf means letter, the one every word starts with. Vaniya Adeeb and I started it in 2026 to make Urdu fun for everyone, and to give people a better way in than a textbook or a strict class.",
    mention: {
      label: "Vaniya Adeeb",
      href: "https://www.instagram.com/vaniyaadeeb/",
    },
    roles: [{ title: "Co-founder", start: "2026", end: "now" }],
    highlights: [
      "An Instagram page that about seventy thousand people follow, with carousels on Urdu words, poetry, films and more.",
      "Song lyrics read properly, line by line, in Urdu, Devanagari and Roman script.",
      {
        text: "Our first book, Dars, Volume One: Urdu from the letters up.",
        link: {
          label: "Dars, Volume One",
          href: "https://harfstudios.fun/books/dars-volume-one",
        },
      },
      "I look after the engineering, from the website to the shop that ships the book.",
    ],
    links: [
      { label: "harfstudios.fun", href: "https://harfstudios.fun" },
      { label: "Instagram", href: "https://www.instagram.com/harf.studios/" },
    ],
  },
  {
    company: "Groww",
    href: "https://groww.in",
    summary:
      "I work on the Customer Engagement Platform, which Groww’s teams use to reach users over email, push, WhatsApp, the feed, stories and Journeys. I own several parts of it end to end, across generic, personalised and journey campaigns.",
    roles: [
      {
        title: "Software Development Engineer 2",
        start: "Apr 2025",
        end: "now",
      },
      {
        title: "Software Development Engineer 1",
        start: "Jun 2023",
        end: "Apr 2025",
      },
      {
        title: "Software Development Intern",
        start: "Jan 2022",
        end: "Jun 2023",
      },
    ],
    highlights: [
      "Cut the Journeys micro-batch window from an hour to five minutes.",
      "Led the design of a multi-tenant architecture, so teams and business lines run their own campaigns on shared, governed building blocks.",
      "Made personalised campaigns cheaper by deduplicating CDP attributes over Iceberg, removing redundant Spark joins, and tuned Apache Pinot to use far less memory and CPU.",
      "Moved segments and channel analytics from batch to real time, with frequency capping, Trino failover and indexed event search.",
      "Built real-time stock alerts for Feed and Stories, the Autochartist integration, and portfolio-aware MF Prime recommendations that go out the moment a user acts.",
      "Earlier, worked on an insurance product that was never released, including its payment workflows on Temporal.",
    ],
  },
  {
    company: "Trademarkia",
    href: "https://trademarkia.com",
    summary:
      "A short consulting stint on legal data: a pipeline and search API for trademarks, an asynchronous scraper for geolocation data, and alerts for legal events over email, SMS and push.",
    roles: [
      { title: "Software Consultant", start: "Feb 2021", end: "May 2021" },
    ],
    highlights: [],
  },
];

export const projects: Project[] = [
  {
    name: "Hatch",
    tagline: "Schedule an email for years from now",
    description:
      "Tell Hatch to send an email an hour from now or years from now, and it gets sent, even if a server crashes along the way. Failed sends are retried automatically. It’s six small services in Go, built to show how a system like this stays reliable.",
    stack: ["Go", "Kafka", "PostgreSQL", "Redis", "Kubernetes"],
    links: [
      {
        label: "Design",
        href: "https://ruby-spectacles-2bc.notion.site/Hatch-34123f950a298115a7cec9d05a4d99f4",
      },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/hatch" },
    ],
  },
  {
    name: "Hermes",
    tagline: "Live quizzes for a room full of people",
    description:
      "Run a live quiz or poll for a classroom, a team or a trivia night. The questions go up on the big screen, everyone answers from their phone, and the scores update as they play. Afterwards, you can see which question beat the room.",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "RabbitMQ", "Next.js"],
    links: [
      { label: "Live", href: "https://hermes.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/hermes" },
    ],
  },
  {
    name: "Namastay",
    tagline: "Plan your first trip to India by swiping",
    description:
      "Swipe through places, food and experiences, keep what you like, and Namastay turns it into a day-by-day trip, with honest guides to 68 places. It’s free, and written in F# from the server to the browser.",
    stack: ["F#", "ASP.NET Core", "Fable", "React", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://namastay.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/namastay" },
    ],
  },
  {
    name: "Iris",
    tagline: "How are any two Wikipedia pages connected?",
    description:
      "Give it two Wikipedia pages, say Banana and Shah Rukh Khan, and it finds a chain of links from one to the other. You watch it search from both ends at once, and each step shows the sentence that makes the connection.",
    stack: ["Python", "Flask", "Celery", "Redis", "D3.js"],
    links: [
      { label: "Live", href: "https://iris.hishaam.dev" },
      { label: "Code", href: "https://github.com/GDGVIT/iris" },
    ],
  },
  {
    name: "Placeholder",
    tagline: "A short link for anything you paste",
    description:
      "Paste a link, some code or a note and get a short link to share. Code opens with proper colours, and you can see how many people visited. I built it to show how this holds up under load: on one laptop, it served 19,500 redirects a second.",
    stack: ["Kotlin", "Ktor", "Kobweb", "PostgreSQL", "Redis", "Kafka"],
    links: [
      { label: "Live", href: "https://placeholder.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/placeholder" },
    ],
  },
  {
    name: "Nexia",
    tagline: "A slambook for the people in your life",
    description:
      "Save the little things about friends and family that you’d otherwise forget: favourite songs, food quirks, old memories. Later, just ask something like “who hates mushrooms?”, and it answers from your own notes.",
    stack: ["Next.js", "Hono", "pgvector", "Vercel AI SDK"],
    links: [
      { label: "Live", href: "https://nexia.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/nexia" },
    ],
  },
  {
    name: "Stochastick",
    tagline: "Flappy Bird on real stock charts",
    description:
      "Flappy Bird, except the level is a real stock chart. Pick an Indian stock and a timeframe, and every candle becomes a pair of pipes to fly through. When you crash, it shows you the real date that got you.",
    stack: ["Svelte", "TypeScript", "WebGL", "Vite"],
    links: [
      { label: "Live", href: "https://stochastick.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/stochastick" },
    ],
  },
  {
    name: "java2go",
    tagline: "Learn Go if you already know Java",
    description:
      "A guide to Go for people who already know Java. Each of the 31 sections starts from the Java you know, shows the Go version beside it, and explains why Go does it differently.",
    stack: ["Go", "Java"],
    links: [
      { label: "Live", href: "https://java2go.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/java2go" },
    ],
  },
  {
    name: "Jury Duty",
    tagline: "Label one dataset as a team",
    description:
      "When several people need to label the same dataset, Jury Duty hands out items without collisions, then saves every label so you can check how far they agree.",
    stack: ["SvelteKit", "Supabase", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://juryduty.hishaam.dev" },
      { label: "Code", href: "https://github.com/mdhishaamakhtar/jury-duty" },
    ],
  },
];

export const research = {
  title: "Real-Time Captioning of Sign Language Gestures in Video Meetings",
  authors: ["Sharanya Mukherjee", "Md Hishaam Akhtar", "Dr. R. Kannadasan"],
  venue: "Presented at ICCMDE 2021",
  arxiv: {
    id: "arXiv:2507.14543",
    href: "https://doi.org/10.48550/arXiv.2507.14543",
  },
  summary:
    "A browser extension that turns American Sign Language into live captions everyone in a video call can read. A local model, fine-tuned from MobileNetV2 on the WLASL dataset, streams its guesses over a WebSocket to the extension, which draws the subtitles. It reached 63% word-level accuracy with an ordinary webcam: no gloves, no depth sensor.",
};

export const writing: Article[] = [
  {
    title:
      "What Revisiting a College Project Taught Me About Growth as an Engineer",
    href: "https://medium.com/@mdhishaamakhtar/what-revisiting-a-college-project-taught-me-about-growth-as-an-engineer-8302b385f5f2",
    where: "Medium",
    note: "Going back to old code and finding that the bigger change was in how I think.",
  },
  {
    title: "Building a Data Lake on Google Cloud Platform",
    href: "https://tech.groww.in/building-a-data-lake-on-google-cloud-platform-98634fa3d66f",
    where: "Groww Engineering",
    note: "How we set up Groww’s data lake on GCP, and why it’s shaped the way it is.",
  },
  {
    title: "Which Backend Stack Should You Learn?",
    href: "https://medium.com/gdg-vit/which-backend-stack-should-you-learn-e4935dfe81bd",
    where: "GDG VIT",
    note: "A friendly way to choose your first backend stack.",
  },
];

export const recognition: Credit[] = [
  {
    title: "Hackcraft at Groww, People’s Choice",
    detail:
      "Live translation for Groww’s support chat, so people can ask for help in their own language.",
  },
  {
    title: "Access Denied 2.0, winner",
    detail: "Sociocredz, built in a 24-hour sprint.",
  },
  {
    title: "VIT Hack, finalist",
    detail: "A healthcare assistant for Flippr’s sponsored track.",
  },
  {
    title: "Udemy instructor",
    detail:
      "A hands-on Node.js course that more than 15,000 people have taken.",
  },
];

export const community = {
  title: "Backend developer, GDSC VIT",
  when: "Apr 2020 to Dec 2022",
  href: "https://dscvit.com",
  detail:
    "Core team at Google Developer Student Clubs, VIT. I built backends for Hermes, Iris, Akina and Keats, co-organised WomenTechies and DevJams, co-hosted DevTalks 2021, and helped build the club’s own recruitment platform during the pandemic.",
};

export const education = {
  school: "Vellore Institute of Technology",
  degree: "B.Tech, Computer Science and Engineering",
  year: "2023",
  grade: "CGPA 9.01 / 10",
};

export const credentials: Credit[] = [
  {
    title: "Machine Learning Specialization",
    detail: "DeepLearning.AI, 2025",
    href: "https://www.coursera.org/account/accomplishments/certificate/WHJ7O1554H4T",
  },
  {
    title: "Architecting with Google Compute Engine",
    detail: "Google Cloud, 2020",
    href: "https://www.coursera.org/account/accomplishments/certificate/ACGXKP2GFKHE",
  },
  {
    title: "Graph Search, Shortest Paths & Data Structures",
    detail: "Stanford Online, 2020",
    href: "https://www.coursera.org/account/accomplishments/certificate/WM3D7QGSCBGU",
  },
  {
    title: "Divide & Conquer, Sorting & Randomized Algorithms",
    detail: "Stanford Online, 2020",
    href: "https://www.coursera.org/account/accomplishments/certificate/FT2N7RKQMSWN",
  },
  {
    title: "IELTS Academic, band 8.5",
    detail: "2025 · Listening 9, Reading 9, Writing 7.5, Speaking 8",
    href: "https://drive.google.com/file/d/1WlR7qXTAP8WDSj-0tZfEupfyH8asuzB5/view?usp=sharing",
  },
];
