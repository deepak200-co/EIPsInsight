import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  useColorModeValue,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  Link,
  Flex,
  SimpleGrid,
  Heading,
  Icon,
  Badge,
  useBreakpointValue,
  AspectRatio,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  Center,
} from "@chakra-ui/react";
import { FaYoutube, FaNewspaper, FaBlog, FaQuestionCircle, FaTools } from "react-icons/fa";
import NextLink from 'next/link';

const ResourcesPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const tabBg = useColorModeValue("white", "gray.700");
  const tabBorderColor = useColorModeValue("gray.200", "gray.600");
  
  const tabSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSelection = (hash: any) => {
    const upperHash = hash.toUpperCase();
    const tabs = ["FAQ", "BLOGS", "VIDEOS", "NEWS"];
    const index = tabs.indexOf(upperHash);
    if (index !== -1) {
      setTabIndex(index);
      window.location.hash = hash;
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1).toUpperCase();
    const tabs = ["FAQ", "BLOGS", "VIDEOS", "NEWS"];
    const index = tabs.indexOf(hash);
    if (index !== -1) setTabIndex(index);
  }, []);


  const Card = ({ image, title, content, link, tag }: { image?: string; title: string; content: string; link: string; tag?: string }) => (
    <Box
      bg={cardBg}
      p={5}
      borderRadius="xl"
      boxShadow="md"
      height="100%"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
      }}
    >
      {image && (
        <AspectRatio ratio={16/9} mb={4} borderRadius="lg" overflow="hidden">
          <Image src={image} alt={title} objectFit="cover" />
        </AspectRatio>
      )}
      {tag && (
        <Badge colorScheme="blue" mb={2}>
          {tag}
        </Badge>
      )}
      <Heading fontSize={{ base: "lg", md: "xl" }} mb={2} noOfLines={2}>
        {title}
      </Heading>
      <Text fontSize="md" color={textColor} noOfLines={3} mb={4}>
        {content}
      </Text>
      <Link 
        href={link} 
        color={accentColor} 
        fontWeight="semibold" 
        isExternal={!link.startsWith('/')}
        display="inline-flex"
        alignItems="center"
      >
        Read more →
      </Link>
    </Box>
  );

  const VideoCard = ({ url, title }: { url: string; title?: string }) => (
    <Box
      bg={cardBg}
      p={0}
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
      }}
    >
      <AspectRatio ratio={16/9}>
        <iframe
          width="100%"
          height="100%"
          src={url}
          title={title || "EIPsInsight Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </AspectRatio>
      {title && (
        <Box p={4}>
          <Heading fontSize="lg" mb={2}>
            {title}
          </Heading>
          <Link 
            href={url.replace("embed/", "watch?v=")} 
            color={accentColor} 
            fontWeight="semibold" 
            isExternal
            display="inline-flex"
            alignItems="center"
          >
            Watch on YouTube →
          </Link>
        </Box>
      )}
    </Box>
  );

  const TOOLS = [
    {
      title: "Analytics",
      description: "Track and visualize EIP activity and trends",
      link: "/Analytics",
      icon: "📊"
    },
    {
      title: "Boards",
      description: "Manage and organize EIP proposals",
      link: "/boards",
      icon: "📋"
    },
    {
      title: "Editors & Reviewers Leaderboard",
      description: "See top contributors in the EIP ecosystem",
      link: "/Reviewers",
      icon: "🏆"
    },
    {
      title: "EIP Proposal Builder",
      description: "Create and format new EIP proposals easily",
      link: "/proposalbuilder",
      icon: "🛠️"
    },
    {
      title: "Search by Author",
      description: "Find EIPs by their authors",
      link: "/authors",
      icon: "🔍"
    },
    {
      title: "Search by EIP",
      description: "Quickly find specific EIPs",
      link: "/SearchEip",
      icon: "🔎"
    }
  ];

  const FAQs = [
    {
      title: "What is an Ethereum Improvement Proposal (EIP)?",
      content: "An overview of account abstraction, EOA, Contract, EIP-86, EIP-2938, EIP-4337, sponsored transaction and more.",
      link: "/FAQs/EIP",
      tag: "Beginner"
    },
    {
      title: "What is an Ethereum Request for Change (ERC)?",
      content: "Need, Proposal, Churn Limit, Managing Validator Exits & Activations",
      link: "/FAQs/ERC",
      tag: "Intermediate"
    },
    {
      title: "What is an Rollup Improvement Proposal (RIP)?",
      content: "Devnet 8 Specs, Challenges in Devnet 7, Geth-Related Bugs & c-kzg Library",
      link: "/FAQs/RIP",
      tag: "Advanced"
    },
    {
      title: "What is EIPsInsight?",
      content: "EIP proposes BLOBBASEFEE opcode for smart contracts to manage blob data costs efficiently. It enables trustless accounting and blob gas futures.",
      link: "/About",
      tag: "About"
    },
  ];

  const NEWS = [
    {
      image: "/EIP_blog1.png",
      title: "EIPsInsight Newsletter Issue #[01] | [02-07-2025]",
      content: "Bringing You the Latest in Ethereum Improvement Proposals",
      link: "/Blogs/blog1"
    },
    {
      image: "/news1.jpg",
      title: "The EIP Proposal Builder: Simplify, Streamline, Succeed",
      content: "Introducing the EIP Proposal Builder: Simplify the creation of Ethereum Improvement Proposals with ease.",
      link: "https://etherworld.co/2025/01/20/the-eip-proposal-builder-simplify-streamline-succeed/",
      tag: "New Feature"
    },
    {
      image: "/news2.jpg",
      title: "Unveiling the Analytics Tool on EIPsInsight",
      content: "Discover EIPsInsight Analytics – a tool designed to streamline project management with visualized GitHub data.",
      link: "https://etherworld.co/2025/01/07/unveiling-the-analytics-tool-on-eipsinsight/",
      tag: "Tool"
    },
    {
      image: "/news3.png",
      title: "Boosting EIP Contributions: Unleashing the Power of Editors Leaderboard",
      content: "The Editors Leaderboard and EIP Board streamline EIP reviews by tracking individual contributions.",
      link: "https://etherworld.co/2024/12/26/boosting-eip-contributions-unleashing-the-power-of-editors-leaderboard-and-eip-board/",
      tag: "Community"
    },
    {
      image: "/news4.jpg",
      title: "Introducing EIP-Board: Simplifying Pull Request Management",
      content: "EIP-Board simplifies Ethereum Improvement Proposal management by prioritizing pull requests.",
      link: "https://etherworld.co/2024/12/04/introducing-eip-board-simplifying-pull-request-management-for-eip-editors/",
      tag: "New Feature"
    },
    {
      image: "/news5.jpg",
      title: "Introducing 'Search by Author' Feature on EIPsInsight",
      content: "Tracking and exploring Ethereum proposals just got a whole lot easier.",
      link: "https://etherworld.co/2024/11/26/search-by-author-eipsinsight/",
      tag: "Feature"
    },
  ];

  const BLOGS = [
    {
      image: "/blog3.jpg",
      title: "ICYMI: New Features on EIPsInsight",
      content: "EIPsInsight introduces new features, including filters, reviewer tracking, Pectra countdown, and improved analytics.",
      link: "https://etherworld.co/2025/04/01/icymi-new-features-on-eipsinsight/",
      tag: "Update"
    },
    {
      image: "/EipsInsightRecap.jpg",
      title: "Eipsinsight milestones 2024",
      content: "This review highlights the pivotal role played by the Analytics Scheduler, Reviewers Tracker, EIP Board, and other utilities.",
      link: "/milestones2024",
      tag: "Year in Review"
    },
    {
      image: "/blog1.jpg",
      title: "ERC-7779: Understanding & Redefining Wallet Interoperability",
      content: "ERC-7779 revolutionizes Ethereum by enhancing wallet interoperability, simplifying user transitions.",
      link: "https://etherworld.co/2025/01/24/erc-7779-understanding-redefining-wallet-interoperability/",
      tag: "Technical"
    },
    {
      image: "/resources3.jpg",
      title: "Ethereum's Dencun upgrade moving towards Devnet 8",
      content: "Devnet 8 Specs, Challenges in Devnet 7, Geth-Related Bugs & c-kzg Library",
      link: "https://etherworld.co/2023/07/11/ethereums-dencun-upgrade-moving-towards-devnet-8/",
      tag: "Upgrade"
    },
    {
      image: "/resources7.png",
      title: "Eip - 7516 : BLOBBASEFEE opcode",
      content: "EIP proposes BLOBBASEFEE opcode for smart contracts to manage blob data costs efficiently.",
      link: "https://etherworld.co/2024/01/25/eip-7516-blobbasefee-opcode/",
      tag: "Technical"
    },
    {
      image: "/resources9.jpg",
      title: "EIP - 7045 Increase Max Attestation Inclusion Slot",
      content: "EIP-7045 introduces a crucial Ethereum upgrade, extending attestation inclusion slots for improved security.",
      link: "https://etherworld.co/2024/01/09/eip-7045/",
      tag: "Technical"
    },
  ];

  const VIDEOS = [
    {
      url: "https://www.youtube.com/embed/AyidVR6X6J8?start=8",
      title: "Introduction to EIPsInsight"
    },
    {
      url: "https://youtu.be/sIr6XX8yR8o?si=csIwXAls_fm7Hfcx",
      title: "How to Submit an EIP"
    },
    {
      url: "https://youtu.be/dEgBVAzY6Eg?si=1CVqeBFXepeji-Ik",
      title: "Understanding ERC Standards"
    },
    {
      url: "https://www.youtube.com/watch?v=nJ57mkttCH0",
      title: "Ethereum Improvement Process Explained"
    },
    {
      url: "https://youtu.be/V75TPvK-K_s?si=KDQI5kP4y-2-9bka",
      title: "Advanced EIP Development"
    },
    {
      url: "https://youtu.be/fwxkbUaa92w?si=uHze3y_--2JfYMjD",
      title: "Community Contributions"
    },
  ];

  const FAQContent = () => (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
     <Box>
    <AspectRatio ratio={9/ 10} mb={8}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ borderRadius: "12px", objectFit: "cover" }}
      >
        <source src="/single.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </AspectRatio>
       
      </Box>
      
      <Box>
      <Image 
          src="/faq_resources4.png" 
          alt="FAQ Illustration" 
          borderRadius="xl" 
          boxShadow="md"
        />
        <Heading size="lg" mb={6} display="flex" alignItems="center" gap={2}>
          <Icon as={FaQuestionCircle} color={accentColor} /> Frequently Asked Questions
        </Heading>
        <Accordion allowToggle>
          {FAQs.map((item, index) => (
            <AccordionItem key={index} mb={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <AccordionButton 
                bg={cardBg}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                p={4}
              >
                <Box flex="1" textAlign="left">
                  <Heading size="sm">{item.title}</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg={useColorModeValue("gray.50", "gray.700")}>
                <Text mb={3}>{item.content}</Text>
                <NextLink href={item.link} passHref legacyBehavior>
                  <Link 
                    color={accentColor}
                    fontWeight="semibold"
                    display="inline-flex"
                    alignItems="center"
                  >
                    Learn more →
                  </Link>
                </NextLink>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Grid>
  );

  const tabContent = [
    {
      label: "FAQ",
      icon: FaQuestionCircle,
      content: <FAQContent />
    },
    {
      label: "Blogs",
      icon: FaBlog,
      content: (
        <Box>
          <Heading size="lg" mb={6} display="flex" alignItems="center" gap={2}>
            <Icon as={FaBlog} color={accentColor} /> Latest Blog Posts
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {BLOGS.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </SimpleGrid>
        </Box>
      )
    },
    {
      label: "Videos",
      icon: FaYoutube,
      content: (
        <Box>
          <Heading size="lg" mb={6} display="flex" alignItems="center" gap={2}>
            <Icon as={FaYoutube} color={accentColor} /> Video Tutorials & Guides
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {VIDEOS.map((item, index) => (
              <VideoCard key={index} {...item} />
            ))}
          </SimpleGrid>
        </Box>
      )
    },
    {
      label: "News",
      icon: FaNewspaper,
      content: (
        <Box>
          <Heading size="lg" mb={6} display="flex" alignItems="center" gap={2}>
            <Icon as={FaNewspaper} color={accentColor} /> News & Announcements
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {NEWS.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </SimpleGrid>
        </Box>
      )
    }
  ];

  const ToolsSection = () => (
    <Box mt={8}>
      <Heading size="lg" mb={6} display="flex" alignItems="center" gap={2}>
        <Icon as={FaTools} color={accentColor} /> Tools
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {TOOLS.map((tool, index) => (
          <Box
            key={index}
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "lg",
            }}
          >
            <Flex align="center" mb={3}>
              <Text fontSize="2xl" mr={3}>{tool.icon}</Text>
              <Heading size="md">{tool.title}</Heading>
            </Flex>
            <Text mb={4} color={textColor}>{tool.description}</Text>
            <NextLink href={tool.link} passHref legacyBehavior>
              <Link 
                color={accentColor}
                fontWeight="semibold"
                display="inline-flex"
                alignItems="center"
              >
                Open Tool →
              </Link>
            </NextLink>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
  return (
    <Box bg={bg} minH="100vh">
      <Header title="Resources" subtitle="Learn, explore, and stay updated with Ethereum improvements" />
      
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Center mb={8}>
          <Tabs 
            index={tabIndex} 
            onChange={setTabIndex} 
            variant="unstyled"
            isFitted={isMobile}
          >
            <TabList 
              display="flex" 
              flexWrap="wrap" 
              justifyContent="center"
              gap={2}
              bg="transparent"
            >
              {tabContent.map((tab, index) => (
                <Tab 
                  key={index} 
                  onClick={() => handleSelection(tab.label)}
                  fontSize={tabSize}
                  fontWeight="semibold"
                  bg={tabBg}
                  borderWidth="1px"
                  borderColor={tabIndex === index ? accentColor : tabBorderColor}
                  borderRadius="lg"
                  py={3}
                  px={6}
                  mx={1}
                  _selected={{ 
                    color: "white",
                    bg: accentColor,
                    boxShadow: "md",
                  }}
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                  }}
                  transition="all 0.2s ease"
                  minW={{ base: "120px", md: "150px" }}
                >
                  <Stack direction="row" align="center" spacing={2}>
                    <Icon as={tab.icon} />
                    {!isMobile && <Text>{tab.label}</Text>}
                  </Stack>
                </Tab>
              ))}
            </TabList>
            
            <TabPanels mt={8}>
              {tabContent.map((tab, index) => (
                <TabPanel key={index} px={0}>
                  {tab.content}
                  <ToolsSection />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
};

export default ResourcesPage;