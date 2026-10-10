import {
  DESCRIPTION,
  GROWW,
  HARF,
  LINKS,
  OG_IMAGE,
  PERSON,
  SITE_URL,
  TITLE,
} from "../consts";
import { education, research } from "../data/profile";

const id = (fragment: string) => `${SITE_URL}/#${fragment}`;

/**
 * One connected JSON-LD graph for the home page: a ProfilePage about a Person,
 * who works for Groww, founded Harf, studied at VIT and wrote a paper. Linking
 * the nodes by @id is what lets search engines treat them as one entity
 * rather than five loose facts.
 */
export function profileGraph(portraitUrl: string) {
  const image = new URL(OG_IMAGE.path, SITE_URL).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: `${SITE_URL}/`,
        name: PERSON.name,
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": id("person") },
      },
      {
        "@type": "ProfilePage",
        "@id": id("profile"),
        url: `${SITE_URL}/`,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": id("website") },
        mainEntity: { "@id": id("person") },
        primaryImageOfPage: { "@type": "ImageObject", url: image },
        dateModified: new Date().toISOString(),
      },
      {
        "@type": "Person",
        "@id": id("person"),
        name: PERSON.name,
        alternateName: [PERSON.shortName, "Hishaam", PERSON.urdu],
        givenName: PERSON.givenName,
        familyName: PERSON.familyName,
        url: `${SITE_URL}/`,
        image: portraitUrl,
        email: `mailto:${PERSON.email}`,
        jobTitle: PERSON.jobTitle,
        description: DESCRIPTION,
        homeLocation: { "@type": "Place", name: `${PERSON.basedIn}, India` },
        worksFor: { "@id": id("groww") },
        founder: { "@id": id("harf") },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.school,
          sameAs: "https://vit.ac.in",
        },
        knowsAbout: [
          "Backend engineering",
          "Distributed systems",
          "Real-time data streaming",
          "Apache Kafka",
          "Apache Pinot",
          "Customer engagement platforms",
          "Go",
          "Java",
          "Urdu",
        ],
        sameAs: [LINKS.github, LINKS.linkedin, LINKS.medium],
      },
      {
        "@type": "Organization",
        "@id": id("groww"),
        name: GROWW.name,
        url: GROWW.url,
      },
      {
        "@type": "Organization",
        "@id": id("harf"),
        name: HARF.name,
        alternateName: "Harf",
        url: HARF.url,
        slogan: "Making Urdu fun for everyone",
        foundingDate: HARF.founded,
        founder: [
          { "@id": id("person") },
          {
            "@type": "Person",
            name: HARF.cofounder,
            sameAs: HARF.cofounderUrl,
          },
        ],
        sameAs: [HARF.instagram, HARF.youtube],
      },
      {
        "@type": "ScholarlyArticle",
        "@id": id("research"),
        headline: research.title,
        url: research.arxiv.href,
        author: research.authors.map((name) =>
          name === PERSON.name
            ? { "@id": id("person") }
            : { "@type": "Person", name },
        ),
        identifier: research.arxiv.id,
      },
    ],
  };
}
