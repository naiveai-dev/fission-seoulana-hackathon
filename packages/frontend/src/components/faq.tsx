export default function FAQ() {
  return (
    <div className="min-h-svh">
      {list.map((item, index) => (
        <div
          key={index}
          className="p-4 border-b border-b-black last:border-b-0"
        >
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2">{item.content}</p>
          {item.learnMore && (
            <a
              href={item.learnMore}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-blue-500 underline"
            >
              Learn more
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

const list = [
  {
    title: 'What is difference between Fission ID and others?',
    content:
      'Fission ID stands out by transforming every AI contribution into dynamic on-chain reputation through advanced off-chain multi-agent validation and interim privacy measures. It’s a self-sovereign, merit-based identity that uniquely powers trustless DAO governance and verifiable human insights.',
    learnMore: '',
  },
  {
    title: 'What is Futarchy?',
    content:
      'Futarchy is a governance model proposed by economist Robin Hanson in which “we would vote on values, but bet on beliefs.” In other words, the community agrees on a set of values or goals (e.g. a metric of success), and then uses prediction markets to decide which policies will best achieve those goals.',
    learnMore: 'https://mason.gmu.edu/~rhanson/futarchy.html',
  },
  {
    title: 'Isn’t it same with prediction market like Polymarket or Polyquest?',
    content:
      'Futarchy uses prediction market outcomes purposefully: the result directly triggers the enactment of the policy predicted to best achieve agreed-upon goals, aiming to demonstrably improve decision-making quality. In contrast, outcomes in general prediction markets primarily serve as informational forecasts or settle bets, lacking this direct, action-oriented link to governance.',
    learnMore: '',
  },
  {
    title: 'Why are you using “pre-FHE era” term?',
    content:
      'The pre-FHE era acknowledges current practical performance limits of FHE(Fully Homomorphic Encryption), like slow bootstrapping. During this time, we utilize alternative privacy technologies for immediate needs, while proactively preparing systems to rapidly adopt FHE once key optimizations make it viable for broader real-world use, thus bridging the gap to near-future advancements.',
    learnMore: '',
  },
  {
    title: 'I heard DeSci before but what is DeSAI?',
    content:
      'DeSci makes research open, collaborative, and accessible to everyone. DeSAI takes this further by integrating AI tools, accelerating research speed, improving data quality, and amplifying collective intelligence.',
    learnMore: 'https://docs.fission.lol/blog/desai-vision',
  },
  {
    title: 'But all of these are useless unless there’s no use case, huh?',
    content:
      'Exactly—real-world use cases already exist. Recent AI breakthroughs, like Aardvark Weather, drastically cut forecasting costs, computing power, and time, making advanced weather prediction accessible worldwide. Similarly, Fission is collaborating with several Web2 enterprises, starting with a $1B market cap leader—ranked 4th in Korea’s pharmaceutical sector, renowned for Korean Ginseng expertise. Stay tuned after our Solana Superteam Korea hackathon for exciting updates!',
    learnMore: 'https://docs.fission.lol/blog/desai-vision',
  },
  {
    title: 'OK.. Any thoughts about MCP?',
    content:
      "We believe MCP isn't just a protocol—it's the universal bridge enabling AI agents to seamlessly interact across diverse tools and decentralized applications. By combining MCP's interoperability with Web3's permissionless innovation, we envision a new wave of autonomous agents and specialized DApps, unlocking entirely new frontiers for blockchain-based AI capabilities.",
    learnMore: 'https://docs.fission.lol/blog/mcp',
  },
  {
    title: 'What do you think about AI Agent with robotics?',
    content:
      "Fission believes AI agents combined with robotics represent a groundbreaking frontier, enabling humanoid robots like NVIDIA's GR00T N1 to perform complex, real-world tasks. Yet, substantial hurdles—cost, latency, ethics—must be overcome before mainstream adoption becomes reality.",
    learnMore: 'https://docs.fission.lol/blog/ai-agent-with-robotics',
  },
  {
    title: 'Wanna learn more about elevated data labeling.',
    content:
      'Data labeling transforms raw data into meaningful information for AI models. At Fission, we advocate "elevated data labeling," where hierarchical structuring streamlines annotation, improves efficiency, and ensures data fairness. This structured approach empowers contributors, boosts data integrity, and creates robust foundations for scalable, ethical AI systems.',
    learnMore:
      'https://docs.fission.lol/blog/hierarchical-structuring-in-data-labeling-for-unstructured-data',
  },
];
