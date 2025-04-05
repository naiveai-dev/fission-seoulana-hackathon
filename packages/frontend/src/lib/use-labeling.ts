import { create } from 'zustand';

export const labelingQuestions = [
  {
    id: 'TX482-95JK',
    userQuery: 'What are the benefits of implementing AI in healthcare?',
    responseFragment:
      'AI systems can assist in early disease detection through pattern recognition in medical images and patient data, potentially identifying conditions before they become symptomatic. This allows for earlier interventions which typically result in better patient outcomes.',
    groundTruth: true,
  },
  {
    id: 'TX482-96LM',
    userQuery: 'How does machine learning differ from traditional programming?',
    responseFragment:
      'In traditional programming, developers explicitly code rules for the computer to follow. Machine learning, however, allows systems to learn patterns from data and make predictions without being explicitly programmed for specific tasks.',
    groundTruth: true,
  },
  {
    id: 'TX482-97NP',
    userQuery: 'What are the ethical concerns of autonomous vehicles?',
    responseFragment:
      'Autonomous vehicles raise questions about decision-making in unavoidable accident scenarios, where the AI must choose between different harmful outcomes, potentially prioritizing some lives over others.',
    groundTruth: true,
  },
  {
    id: 'TX482-98QR',
    userQuery: 'How can blockchain improve supply chain management?',
    responseFragment:
      'Blockchain provides an immutable record of transactions across the supply chain, enabling transparent tracking of products from origin to consumer, reducing fraud and improving verification of ethical sourcing claims.',
    groundTruth: true,
  },
  {
    id: 'TX482-99ST',
    userQuery: 'What is quantum computing and how does it work?',
    responseFragment:
      'Quantum computing leverages quantum bits or qubits that can exist in multiple states simultaneously, unlike classical bits. This property, known as superposition, allows quantum computers to process certain types of problems exponentially faster than classical computers.',
    groundTruth: true,
  },
  {
    id: 'TX482-100UV',
    userQuery: 'How is natural language processing improving?',
    responseFragment:
      'Recent advances in transformer models have significantly improved natural language understanding, enabling systems to better grasp context, nuance, and semantic relationships in human language.',
    groundTruth: true,
  },
  {
    id: 'TX482-101WX',
    userQuery: 'What are the environmental impacts of cryptocurrency mining?',
    responseFragment:
      'Bitcoin mining alone consumes more electricity than many countries, contributing to carbon emissions when powered by fossil fuels. This has raised concerns about the sustainability of proof-of-work cryptocurrencies.',
    groundTruth: true,
  },
  {
    id: 'TX482-102YZ',
    userQuery: 'How is AI changing the job market?',
    responseFragment:
      'AI automation is eliminating certain routine tasks while creating new roles focused on AI development and oversight. This shift requires workforce adaptation and reskilling in many industries.',
    groundTruth: true,
  },
  {
    id: 'TX482-103AB',
    userQuery: 'What are the privacy concerns with smart home devices?',
    responseFragment:
      "Smart home devices continuously collect data about user habits and preferences, raising questions about how this information is stored, who has access to it, and how it might be used for purposes beyond the device's primary function.",
    groundTruth: true,
  },
  {
    id: 'TX482-104CD',
    userQuery: 'How does facial recognition technology work?',
    responseFragment:
      'Facial recognition systems analyze facial features to create a digital signature, which is then compared against a database of known faces to identify individuals, often using deep learning algorithms to improve accuracy.',
    groundTruth: true,
  },
];

interface UseLabelingStore {
  labelingMode: boolean;
  setLabelingMode: (labelingMode: boolean) => void;

  status: {
    questionIndex: number;
    correctCount: number;
  };
}

export const useLabeling = create<UseLabelingStore>((set) => ({
  labelingMode: true,
  setLabelingMode: (labelingMode: boolean) => {
    return set({ labelingMode });
  },

  status: {
    questionIndex: 0,
    correctCount: 0,
  },
}));
