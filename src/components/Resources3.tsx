import React, { useState, useEffect } from "react";
import {useColorModeValue, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Image, Link, Flex, Grid } from "@chakra-ui/react";
import Header from "./Header";
import { SimpleGrid } from "@chakra-ui/react";


const ResourcesPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const bg = useColorModeValue("#f6f6f7", "#171923");
  const bg2 = useColorModeValue("gray.50", "gray.700"); // Light mode: gray.50, Dark mode: gray.700
  const textColor2 = useColorModeValue("black", "white"); // Light mode: black, Dark mode: white

  const handleSelection = (hash:any) => {
    if (hash === "FAQ") {
      setTabIndex(0);
    } else if (hash === "Blogs") {
      setTabIndex(1);
    } else if (hash === "Videos") {
      setTabIndex(2);
    } else if (hash === "News") {
      setTabIndex(3);
    }
    window.location.hash = hash; // Update the hash in the URL
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1); // Get the hash from the URL
    console.log("Current hash:", hash);

    // Match the hash to the corresponding tab index
    if (hash === "FAQ") {
      setTabIndex(0);
    } else if (hash.toUpperCase() === "BLOGS") {
      setTabIndex(1);
    } else if (hash.toUpperCase() === "VIDEOS") {
      setTabIndex(2);
    } else if (hash.toUpperCase() === "NEWS") {
      setTabIndex(3);
    }
  }, []);


  

  const Card = ({ image, title, content, link }: { image: string; title: string; content: string; link: string }) => {
    return (
      <Flex
        direction={{ base: "column", md: "row" }}
        bg={bg2}
        p={5}
        borderRadius="lg"
        boxShadow="lg"
        mb={5}
        height={{ base: "300px", sm: "350px", md: "200px" }}
        align="center"
      >
        <Image
          src={image}
          alt={title}
          boxSize={{ base: "150px", md: "150px" }}
          objectFit="cover"
          borderRadius="lg"
          mr={{ md: 5 }}
        />
        <Box flex="1" overflow="hidden">
          <Text
            fontSize={{ base: "sm", md: "lg", lg: "xl" }}
            fontWeight="bold"
            color={textColor2}
            noOfLines={1}
            mb={1}
          >
            {title}
          </Text>
          <Text
            mt={2}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            noOfLines={3} // Limit to 3 lines on all screen sizes
            textAlign="justify"
            color={textColor2}
            overflow="hidden" // Ensures text doesn't overflow
          >
            {content}
          </Text>
          <Link href={link} color="blue.400" isExternal>
            Read More
          </Link>
        </Box>
      </Flex>
    );
  };

  const Card2 = ({ image, title,link }: { image: string; title: string; link: string }) => {
    return (
      <Link href={link}>
      <Flex
  direction="row" // Default: column on small screens, row on larger
  wrap="nowrap" // Prevent wrapping of content within the Flex container
  bg={bg2}
  p={5}
  borderRadius="lg"
  boxShadow="lg"
  height="auto" // Allow height to adjust dynamically
  align="center"
  justify="space-between"
  minWidth="200px" // Minimum width for the entire box
  minHeight="100px" 
  w="100%" // Full width of the parent container
>
  
  <Box
    flex="1"
    overflow="hidden"
    flexShrink={0} // Prevent shrinking below the minimum width
  >
    <Text
      fontSize={{ base: "md", sm: "lg", md: "xl" }} // Adjust font size for responsiveness
      fontWeight="bold"
      color={textColor2}
      mb={1}
      whiteSpace="normal" // Allow multi-line wrapping
      wordBreak="break-word" // Handle long words
      overflow="hidden" // Prevent content overflow
      textOverflow="ellipsis" // Add ellipsis for truncated text
    >
      {title}
    </Text>
  </Box>
</Flex>
</Link>





    );
  };
  
  // export default Card;
  
  const FAQs= [
    {
        image: "faq_resources1.png",
        title: "What is an Ethereum Improvement Proposal (EIP)?",
        content: "An overview of account abstraction, EOA, Contract, EIP-86, EIP-2938, EIP-4337, sponsored transaction and more.",
        link: "/FAQs/EIP"
    },
    {
        image: "faq_resources2.png",
        title: "What is an Ethereum Request for Change (ERC)?",
        content: "Need, Proposal, Churn Limit, Managing Validator Exits & Activations",
        link: "/FAQs/ERC"
    },
    {
        image: "faq_resources3.png",
        title: "What is an Rollup Improvement Proposal (RIP)?",
        content: "Devnet 8 Specs, Challenges in Devnet 7, Geth-Related Bugs & c-kzg Library",
        link: "/FAQs/RIP"
    },
    {
        image: "Blockchain_Future.png",
        title: "What is EIPsInsight?",
        content: "EIP proposes BLOBBASEFEE opcode for smart contracts to manage blob data costs efficiently. It enables trustless accounting and blob gas futures with a gas cost of 2, aligning with conventions, ensuring seamless integration and minimal impact on backward compatibility.",
        link: "/About"
    },
]
  




const NEWS= [
    {
        image: "pectra4.png",
        title: "EtherWorld Weekly — Edition 301",
        content: "EtherWorld Weekly Edition 301 kicks off the new year with Ethereum’s top 2024 updates, Vitalik’s insights, and upcoming blockchain events. Dive into client releases, governance standards, and the future of AI x crypto!",
        link: "https://etherworld.co/2025/01/05/etherworld-weekly-edition-301/"
    },
    {
        image: "pectra1.jpg",
        title: "Ethereum Developers Push Proposal to increase Gossip Limit",
        content: "Gossip Limit in Blockchain Networks, Current Setup, Reasons for 10 MiB Limit, Challenges, Proposal Objectives, Implementation & Alternatives.",
        link: "https://etherworld.co/2024/12/15/ethereum-developers-push-proposal-to-increase-gossip-limit/"
    },
    {
        image: "pectra2.jpg",
        title: "Ethereum Launches Mekong Testnet: A Guide",
        content: "Ethereum’s Mekong testnet offers developers and stakers a sandbox to explore the Pectra upgrade’s UX and staking changes, shaping the upcoming mainnet deployment.",
        link: "https://etherworld.co/2024/11/08/mekong-testnet/"
    },
    {
        image: "pectra3.jpg",
        title: "Consensus-layer Call 144: EIPs, Pectra, and Blob Scaling",
        content: "Ethereum developers discussed key updates on Pectra, EIPs 7742 and 7782, and strategies for scaling blobs, focusing on network performance, PeerDAS, and upcoming changes for the Pectra hard fork.",
        link: "https://etherworld.co/2024/10/17/consensus-layer-call-144/"
    },
    {
      image: "resources1.jpg",
      title: "An overview of Account Abstraction in Ethereum blockchain",
      content: "An overview of account abstraction, EOA, Contract, EIP-86, EIP-2938, EIP-4337, sponsored transaction and more.",
      link: "https://etherworld.co/2021/10/06/an-overview-of-account-abstraction-in-ethereum-blockchain/"
  },
  {
      image: "resources2.jpg",
      title: "New Ethereum Proposal to Cap the Growth of Active Validators",
      content: "Need, Proposal, Churn Limit, Managing Validator Exits & Activations",
      link: "https://etherworld.co/2023/07/16/new-ethereum-proposal-to-cap-the-growth-of-active-validators/"
  },
  {
      image: "resources3.jpg",
      title: "Ethereum's Dencun upgrade moving towards Devnet 8",
      content: "Devnet 8 Specs, Challenges in Devnet 7, Geth-Related Bugs & c-kzg Library",
      link: "https://etherworld.co/2023/07/11/ethereums-dencun-upgrade-moving-towards-devnet-8/"
  },
  {
      image: "resources7.png",
      title: "Eip - 7516 : BLOBBASEFEE opcode",
      content: "EIP proposes BLOBBASEFEE opcode for smart contracts to manage blob data costs efficiently. It enables trustless accounting and blob gas futures with a gas cost of 2, aligning with conventions, ensuring seamless integration and minimal impact on backward compatibility.",
      link: "https://etherworld.co/2024/01/25/eip-7516-blobbasefee-opcode/"
  },
  {
      image: "resources9.jpg",
      title: "EIP - 7045 Increase Max Attestation Inclusion Slot",
      content: "EIP-7045 introduces a crucial Ethereum upgrade, extending attestation inclusion slots for improved security and efficiency. The article delves into its motivation, technical changes, implications, and impact on consensus and security.",
      link: "https://etherworld.co/2024/01/09/eip-7045/"
  },
  {
      image: "resources10.png",
      title: "EIP-1153 and Transient storage",
      content: "EIP-1153 introduces transient storage, revolutionizing Ethereum's data handling. It addresses gas inefficiencies, enhancing smart contract performance. Explore its impact on inter-frame communication and gas cost efficiency.",
      link: "https://etherworld.co/2024/01/08/eip-1153-and-transient-storage/"
  },
  {
      image: "resources12.png",
      title: "EIP-5656: MCOPY - An efficient EVM instruction",
      content: "EIP-5656 introduces MCOPY. Addressing gas cost challenges, MCOPY benefits, use cases, and impact, presenting a promising upgrade for Ethereum's ecosystem.",
      link: "https://etherworld.co/2023/11/15/eip-5656-mcopy-an-efficient-evm-instruction/"
  },
  {
      image: "resources15.jpg",
      title: "Transient Storage for Beginners",
      content: "EIP-1153: Need, Effects, Pros & Cons, Future Plans",
      link: "https://etherworld.co/2022/12/13/transient-storage-for-beginners/"
  }
]
const INSIGHT= [
  {
      image: "EipsInsightRecap.jpg",
      title: "Eipsinsight milestones 2024",
      content: "This review highlights the pivotal role played by the Analytics Scheduler, Reviewers Tracker, EIP Board, and other utilities, which together streamline workflows, promote accountability, and optimize the management of proposals.",
      link: "/milestones2024"
  },
  // {
  //     image: "Blockchain_Future.png",
  //     title: "What is EIPsInsight?",
  //     content: "EIPsInsight is specialized in toolings designed to provide clear, visual insights into the activity of Ethereum Improvement Proposals (EIPs),  Ethereum Request for Comments (ERCs), Rollup Improvement Proposals (RIPs) over a specified period.",
  //     link: "/About"
  // },
]

const Links = [
  "https://www.youtube.com/embed/AyidVR6X6J8?start=8",
  "https://youtu.be/sIr6XX8yR8o?si=csIwXAls_fm7Hfcx",
  "https://youtu.be/dEgBVAzY6Eg?si=1CVqeBFXepeji-Ik",
  "https://www.youtube.com/watch?v=nJ57mkttCH0",
  "https://youtu.be/V75TPvK-K_s?si=KDQI5kP4y-2-9bka",
  "https://youtu.be/fwxkbUaa92w?si=uHze3y_--2JfYMjD",
  "https://www.youtube.com/embed/YuEA-jE2Z8c",
  "https://www.youtube.com/watch?v=sIr6XX8yR8o",
  "https://www.youtube.com/watch?v=dEgBVAzY6Eg",
  "https://www.youtube.com/watch?v=pO8fmZd4Mjw",
  "https://www.youtube.com/watch?v=V75TPvK-K_s",
  "https://www.youtube.com/watch?v=fwxkbUaa92w",
  "https://www.youtube.com/embed/pyfKM_hOKaM",
];

// Convert URLs to the embed format
const embedLinks = Links.map((link) => {
  if (link.includes("youtube.com/watch?v=")) {
    return link.replace("watch?v=", "embed/");
  } else if (link.includes("youtu.be")) {
    return link.replace("youtu.be/", "www.youtube.com/embed/");
  }
  return link;
});


  const tabContent = [
    {
      label: "FAQ",
      content: (
        <>
           <Flex 
      direction={{ base: "column", md: "row" }} 
      align="center" 
      gap={4} 
      p={4}
    >
      {/* Left Half: Image */}
      <Box 
        flex={{ base: "none", md: "1" }} 
        display={{ base: "block", md: "flex" }} 
        justifyContent="center" 
        alignItems="center"
      >
        <Image 
            src="/faq_resources4.png" 
            alt="FAQs Illustration" 
            maxW="100%" 
            minH="100%"
            borderRadius="md" 
            shadow="md" 
        />

      </Box>

      {/* Right Half: FAQ Cards */}
      <Box 
        flex={{ base: "none", md: "2" }} 
        mt={{ base: 4, md: 0 }}
        w="100%"
  maxW={{ lg: "50%" }} 
      >
        <SimpleGrid 
    columns={{ base: 1, md: 1, lg: 1 }} // Stacks based on screen size
    spacing={4}
  >
    {FAQs.map((eip, index) => (
      <Box key={index}>
        {Card2({ 
          image: eip.image, 
          title: eip.title, 
          link: eip.link 
        })}
      </Box>
    ))}
  </SimpleGrid>
      </Box>
    </Flex>
          </>
      ),
    },
    {
        label: "Blogs",
        content: (
            <>
            <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={4} 
            >
                {INSIGHT.map((eip, index) => (
                <div key={index}>
                    {Card({ 
                    image: eip.image, 
                    title: eip.title, 
                    content: eip.content, 
                    link: eip.link 
                    })}
                </div>
                ))}
            </SimpleGrid>
          </>
        ),
      },
      {
        label: "Videos",
        content: (
          <>
            <Grid 
              templateColumns={{ base: "1fr", lg: "2fr 3fr" }} // Single column for small screens, 2:3 split for large screens
              gap={4}
            >
              {/* Left Section: Small Videos */}
              <SimpleGrid 
                columns={{ base: 1, lg: 2 }} 
                spacing={4} 
                display={{ base: "none", md:"none", lg: "grid" }} // Visible only on large screens
              >
                {embedLinks.slice(1, 5).map((link, index) => (
                  <iframe
                    key={index}
                    src={link}
                    title={`Video ${index + 2}`}
                    style={{ borderRadius: "8px" }}
                    width="100%"
                    height="200px"
                    allowFullScreen
                  />
                ))}
              </SimpleGrid>
      
              {/* Right Section: Featured Video */}
              <Box 
                bg="gray.900" 
                borderRadius="lg" 
                overflow="hidden"
              >
                <iframe
                  src={Links[0]}
                  title="Featured Video"
                  style={{ borderRadius: "8px" }}
                  width="100%"
                  height="400px"
                  allowFullScreen
                />
              </Box>
            </Grid>
      
            {/* Second Row: Remaining Videos */}
            <SimpleGrid 
              columns={{ base: 1, sm: 2, lg: 4 }} 
              spacing={4} 
              mt={{ base: 4, lg: 8 }}
            >
              {embedLinks.slice(5).map((link, index) => (
                <iframe
                  key={index}
                  src={link}
                  title={`Video ${index + 6}`}
                  style={{ borderRadius: "8px" }}
                  width="100%"
                  height="200px"
                  allowFullScreen
                />
              ))}
            </SimpleGrid>
      
            {/* Responsive Stacked View for Small Screens */}
            <SimpleGrid 
              columns={1} 
              spacing={4} 
              display={{ base: "grid", lg: "none" }} // Visible only on small/medium screens
              mt={4}
            >
              {embedLinks.map((link, index) => (
                <iframe
                  key={index}
                  src={link}
                  title={`Video ${index + 1}`}
                  style={{ borderRadius: "8px" }}
                  width="100%"
                  height="200px"
                  allowFullScreen
                />
              ))}
            </SimpleGrid>
          </>
        ),
      },
      
      
    {
      label: "News",
      content: (
        <>
            <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={4} 
            >
                {NEWS.map((eip, index) => (
                <div key={index}>
                    {Card({ 
                    image: eip.image, 
                    title: eip.title, 
                    content: eip.content, 
                    link: eip.link 
                    })}
                </div>
                ))}
            </SimpleGrid>
          </>
      ),
    },
  ];

  return (
    <Box
      paddingBottom={{ lg: "10", sm: "10", base: "10" }}
      paddingX={{ lg: "10", md: "5", sm: "5", base: "5" }}
      marginTop={{ lg: "10", md: "5", sm: "5", base: "5" }}
      className="flex flex-col space-x-6"
    >  <Box ml={5}>
      <Header title="Resources" subtitle="" />
      </Box>
      <Tabs isFitted variant="soft-rounded" index={tabIndex} // Control the active tab
      onChange={(key) => {
        // Update the tab index and hash when the tab is changed
        if (key === 0) handleSelection("FAQ");
        if (key === 1) handleSelection("Blogs");
        if (key === 2) handleSelection("Videos");
        if (key === 3) handleSelection("News");
      }}>
     <Box mt={2} borderRadius="10px 10px 0 0">
  <Flex
    justify="space-between"
    bg="gray.700"
    p={1}
    mb={1}
    borderRadius="md"
  >
    <TabList
      mb={1}
      display="flex"
      flexWrap="wrap" // Enable wrapping for tabs
      width="100%"
      gap={2} // Add spacing between tabs
    >
      {tabContent.map((tab, index) => (
        <Tab
          key={index}
          _selected={{
            bg: "blue.300",
            color: "white",
            borderColor: "lightblue",
            paddingY: 2,
          }}
          _hover={{
            bg: "gray.600",
          }}
          p={2}
          flex={{ base: "1 1 calc(50% - 1rem)", md: "1 1 calc(25% - 1rem)" }} // Responsive flex basis
          textAlign="center"
          borderRadius="md"
          boxShadow="sm"
          cursor="pointer"
          color="white"
          whiteSpace="normal" // Allow text wrapping
          wordBreak="break-word" // Handle long words
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
  </Flex>
</Box>


      <TabPanels>
        {tabContent.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
    </Box>
  );
};

export default ResourcesPage;
