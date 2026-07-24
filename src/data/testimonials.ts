/** Homeowner quotes — shared by the card grid (Home, About) and the slider
 *  (Portfolio) so the three testimonials stay identical across pages. */
export interface Testimonial {
  quote: string;
  initial: string;
  name: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our backyard was weeds and dog ruts. Now the kids are out there every evening and I'm not embarrassed when people come over. They showed up when they said they would, every single time.",
    initial: "M",
    name: "Megan & Dave Holloway",
    location: "Bend, OR",
  },
  {
    quote:
      "The new drip system dropped our July water bill by almost forty bucks, and the plants look better than ever. These folks actually know high-desert planting.",
    initial: "R",
    name: "Rick Sorenson",
    location: "Redmond, OR",
  },
  {
    quote:
      "We got three bids. Cedar & Stone was the only crew that walked the whole property and asked how we use it. The patio stays cool in August and we eat dinner out there now.",
    initial: "L",
    name: "Linda Vasquez",
    location: "Sisters, OR",
  },
];
