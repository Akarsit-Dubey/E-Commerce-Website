export interface FAQCategory {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const FAQ_DATA: FAQCategory[] = [
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "Where does NOVA ship, and how much does it cost?",
        answer: "We offer complimentary standard shipping worldwide on all orders over $150. For orders under $150, domestic US standard delivery is $12 (3-5 business days), and international express delivery is $25 (4-7 business days).",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer: "We begin preparing orders rapidly to guarantee quick dispatch. If you need to make changes or cancel, please contact client services within 60 minutes of placing your order.",
      },
      {
        question: "How can I track my package?",
        answer: "As soon as your shipment is processed by our fulfillment center, you will receive a confirmation email with a direct tracking link and live carrier status.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is NOVA's return policy?",
        answer: "We offer hassle-free 30-day returns on all unworn, unwashed items in their original packaging with designer tags intact. Footwear must include the original shoe box and dust bags in pristine condition.",
      },
      {
        question: "How do I initiate a return or exchange?",
        answer: "Visit our Returns portal or navigate to your Account Orders page. Select the items you wish to send back, generate a prepaid shipping label, and drop off the package at any authorized carrier depot.",
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed to the original payment method within 3 to 5 business days after our quality assurance team inspects the returned piece.",
      },
    ],
  },
  {
    category: "Materials & Craftsmanship",
    items: [
      {
        question: "Where are NOVA products manufactured?",
        answer: "We partner exclusively with multi-generational specialist ateliers across Italy, Portugal, Scotland, Japan, and Inner Mongolia. Every partner complies with fair-wage and sustainable environmental criteria.",
      },
      {
        question: "How should I care for my cashmere and virgin wool items?",
        answer: "We recommend airing knitwear after wear and spot cleaning when necessary. For laundering, either gentle professional dry cleaning or hand-washing in tepid water with a wool-specific cleanser is recommended. Always dry flat in shade.",
      },
      {
        question: "Is NOVA packaging recyclable?",
        answer: "100% of our secondary packaging, garment envelopes, boxes, and protective tissue are crafted from FSC-certified post-consumer recycled paper and printed with non-toxic vegetable ink.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    items: [
      {
        question: "How do NOVA garments fit?",
        answer: "Our tailoring balances relaxed contemporary cuts with precise silhouette structure. We recommend ordering your true standard size for an effortless drape, or sizing down if you prefer a slim profile.",
      },
      {
        question: "Do you offer tailored alterations?",
        answer: "Our wide-leg trousers come with a generous 4cm blind-hem allowance to enable effortless alteration by your local tailor.",
      },
    ],
  },
];
