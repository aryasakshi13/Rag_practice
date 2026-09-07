export interface EvaluationQuestion {
  id: number;
  question: string;
  expectedAnswer: string;
  category: "relevant" | "out-of-document";
}

export const evaluationQuestions: EvaluationQuestion[] = [
  {
    id: 1,
    question: "What is Dharma according to Bhagavad Gita?",
    expectedAnswer:
      "Dharma refers to one's duty and righteous responsibility, which should be performed according to one's position and nature without selfish attachment to the results.",
    category: "relevant",
  },

  {
    id: 2,
    question: "What does Bhagavad Gita say about the soul?",
    expectedAnswer:
      "The soul is eternal and is not destroyed when the physical body dies.",
    category: "relevant",
  },

  {
    id: 3,
    question: "What does Krishna teach Arjuna about performing his duty?",
    expectedAnswer:
      "Krishna teaches Arjuna to perform his prescribed duty without attachment to the results of his actions.",
    category: "relevant",
  },

  {
    id: 4,
    question: "What is karma according to Bhagavad Gita?",
    expectedAnswer:
      "Karma refers to action, particularly prescribed action and its consequences. Krishna explains different forms of action, inaction, and forbidden action.",
    category: "relevant",
  },

  {
    id: 5,
    question: "What is yoga according to Krishna?",
    expectedAnswer:
      "Yoga is a spiritual discipline or process of connecting with and realizing the Supreme, including paths such as karma-yoga, jnana-yoga and bhakti-yoga.",
    category: "relevant",
  },

  {
    id: 6,
    question: "Why should Arjuna perform his duty?",
    expectedAnswer:
      "Arjuna should perform his prescribed duty because performing one's duty without attachment is better than avoiding action and helps one progress spiritually.",
    category: "relevant",
  },

  {
    id: 7,
    question: "What happens to the soul after death?",
    expectedAnswer:
      "The soul does not die with the body. It continues its existence and transmigrates according to karma.",
    category: "relevant",
  },

  {
    id: 8,
    question: "What is the difference between the body and the soul?",
    expectedAnswer:
      "The body is temporary and subject to change and destruction, while the soul is eternal and is not destroyed when the body dies.",
    category: "relevant",
  },

  {
    id: 9,
    question: "Why does Krishna tell Arjuna not to fear death?",
    expectedAnswer:
      "Because the soul is eternal and cannot be destroyed by the death of the physical body.",
    category: "relevant",
  },

  {
    id: 10,
    question:
      "What does Krishna say about attachment to the results of actions?",
    expectedAnswer:
      "One should perform one's duty without attachment to the results of one's actions.",
    category: "relevant",
  },

  {
    id: 11,
    question: "What is the capital of France?",
    expectedAnswer:
      "This information is not contained in the Bhagavad Gita.",
    category: "out-of-document",
  },

  {
    id: 12,
    question: "Who invented the telephone?",
    expectedAnswer:
      "This information is not contained in the Bhagavad Gita.",
    category: "out-of-document",
  },

  {
    id: 13,
    question: "What is Python?",
    expectedAnswer:
      "This information is not contained in the Bhagavad Gita.",
    category: "out-of-document",
  },

  {
    id: 14,
    question: "What is the population of India?",
    expectedAnswer:
      "This information is not contained in the Bhagavad Gita.",
    category: "out-of-document",
  },

  {
    id: 15,
    question: "Who is the current president of the United States?",
    expectedAnswer:
      "This information is not contained in the Bhagavad Gita.",
    category: "out-of-document",
  },
];