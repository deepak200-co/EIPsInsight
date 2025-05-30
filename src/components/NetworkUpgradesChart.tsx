// "use client";

// import React, { useState, useCallback } from "react";
// import dynamic from "next/dynamic";
// import { Box, useColorModeValue, Flex, Heading, Button, Spinner } from "@chakra-ui/react";
// import axios from "axios";
// import CopyLink from "./CopyLink";

// const Column = dynamic(() => import("@ant-design/plots").then((mod) => mod.Column), {
//   ssr: false,
// }) as unknown as React.FC<any>;


// interface UpgradeData {
//   date: string;
//   upgrade: string;
//   count: number;
//   label: string;
// }

// interface UpgradeData2 {
//   date: string;
//   upgrade: string;
//   eip: string;
// }

// // Original data set
// const rawData = [
// { date: "2021-12-09", upgrade: "Arrow Glacier", eip: "EIP-4345" },
// { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2565" },
// { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2929" },
// { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2718" },
// { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2930" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-100" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-140" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-196" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-197" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-198" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-211" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-214" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-649" },
// { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-658" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-1153" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-4788" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-4844" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-5656" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-6780" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7044" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7045" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7514" },
// { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7516" },
// { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-145" },
// { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1014" },
// { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1052" },
// { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1234" },
// { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1283" },
// { date: "2022-06-30", upgrade: "Gray Glacier", eip: "EIP-5133" },
// { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-2" },
// { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-7" },
// { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-8" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-152" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1108" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1344" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1884" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-2028" },
// { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-2200" },
// { date: "2021-08-05", upgrade: "London", eip: "EIP-1559" },
// { date: "2021-08-05", upgrade: "London", eip: "EIP-3198" },
// { date: "2021-08-05", upgrade: "London", eip: "EIP-3529" },
// { date: "2021-08-05", upgrade: "London", eip: "EIP-3541" },
// { date: "2021-08-05", upgrade: "London", eip: "EIP-3554" },
// { date: "2020-01-02", upgrade: "Muir Glacier", eip: "EIP-2384" },
// { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-145" },
// { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1014" },
// { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1052" },
// { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1234" },
// { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3651" },
// { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3855" },
// { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3860" },
// { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-4895" },
// { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-6049" },
// { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-155" },
// { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-160" },
// { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-161" },
// { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-170" },
// { date: "2016-10-18", upgrade: "Tangerine Whistle", eip: "EIP-150" },
// { date: "2022-09-15", upgrade: "The Merge", eip: "EIP-4399" },
// { date: "2022-09-15", upgrade: "The Merge", eip: "EIP-3675" },
// { date: "2015-09-07", upgrade: "Frontier Thawing", eip: "" },
// { date: "2015-07-30", upgrade: "Frontier", eip: "" },
// { date: "2021-10-21", upgrade: "Altair", eip: "" },
// ];
// // Group and transform the data
// const upgradeMap: Record<string, { date: string; upgrade: string; eips: string[] }> = {};
// for (const { date, upgrade, eip } of rawData) {
//   const key = `${date}-${upgrade}`;
//   if (!upgradeMap[key]) {
//     upgradeMap[key] = { date, upgrade, eips: [] };
//   }
//   if (eip) {
//     upgradeMap[key].eips.push(eip.replace("EIP-", ""));
//   }
// }

// const transformedData: UpgradeData[] = Object.values(upgradeMap).map(({ date, upgrade, eips }) => ({
//   date,
//   upgrade,
//   count: eips.length,
//   label: eips.join(", "),
// })).sort((a, b) => {
//   if (a.date === "TBD") return 1;
//   if (b.date === "TBD") return -1;
//   return new Date(a.date).getTime() - new Date(b.date).getTime();
// });

// function getContrastColor(hexColor: string) {
//   // Convert hex to RGB
//   const r = parseInt(hexColor.substr(1, 2), 16);
//   const g = parseInt(hexColor.substr(3, 2), 16);
//   const b = parseInt(hexColor.substr(5, 2), 16);

//   // Calculate luminance
//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

//   // Return dark or light text based on background brightness
//   return luminance > 0.5 ? '#000000' : '#ffffff';
// }

// const generateDistinctColor = (index: number, total: number) => {
//   const hue = (index * (360 / total)) % 360;
//   const saturation = 85 - (index % 2) * 15;
//   const lightness = 60 - (index % 3) * 10;
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// };

// const uniqueUpgrades = [...new Set(transformedData.map((data) => data.upgrade))];
// const colorMap = uniqueUpgrades.reduce((map, upgrade, index) => {
//   map[upgrade] = generateDistinctColor(index, uniqueUpgrades.length);
//   return map;
// }, {} as Record<string, string>);

// const NetworkUpgradesChart = React.memo(() => {
//   const bg = useColorModeValue("#f6f6f7", "#171923");
//   const headingColor = useColorModeValue("black", "white");
//   const [isLoading, setIsLoading] = useState(false);

//   const downloadData = useCallback(async () => {
//     setIsLoading(true);
//     const header = "Date,Network Upgrade,EIP Link,Requires,Type, Category,GITHUB\n";

//     try {
//       const csvContent =
//         "data:text/csv;charset=utf-8," +
//         header +
//         (
//           await Promise.all(
//             rawData.map(async ({ date, upgrade, eip }) => {
//               const eipNo = eip.replace("EIP-", "");
//               const url = `https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-${eipNo}.md`;

//               try {
//                 const response = await fetch(url);
//                 if (!response.ok) throw new Error(`Failed to fetch EIP-${eipNo}`);
//                 const eipData = await response.text();

//                 const requiresMatch = eipData.match(/requires:\s*(.+)/);
//                 let requires = requiresMatch ? requiresMatch[1].trim() : "None";
//                 const TypeMatch = eipData.match(/type:\s*(.+)/);
//                 let Type = TypeMatch?.[1]?.trim() ?? "None";
//                 const CategoryMatch = eipData.match(/category:\s*(.+)/);
//                 let Category = CategoryMatch ? CategoryMatch[1].trim() : "-";
//                 if (requires.includes(",")) {
//                   requires = `"${requires}"`;
//                 }

//                 return `${date},${upgrade},https://eipsinsight.com/eips/eip-${eipNo},${requires},${Type}, ${Category}, EIPs`;
//               } catch (error) {
//                 console.error(`Error fetching data for EIP-${eipNo}:`, error);
//                 return `${date},${upgrade},-,-,-,-,-`;
//               }
//             })
//           )
//         ).join("\n");

//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "network_upgrades.csv");
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error("Error downloading data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const config = {
//     data: transformedData,
//     xField: "date",
//     yField: "count",
//     seriesField: "upgrade",
//     color: (datum: { upgrade?: string }) => colorMap[datum.upgrade as string] || "#ccc",
//     isStack: true,
//     label: {
//       position: "middle" as const,
//       layout: [
//         { type: "interval-adjust-position" },
//         { type: "interval-hide-overlap" },
//         { type: "adjust-color" }, // This will adjust text color if background is too dark
//       ],
//       content: (origin: UpgradeData) => {
//         const eips = origin.label.split(", ");
//         return eips
//           .map((eip) => `${eip}`) // Format as EIP-XXXX
//           .join("\n");
//       },
//       style: (datum: any) => {
//         const upgradeColor = colorMap[datum.upgrade] || "#ccc";
//         return {
//           fill: getContrastColor(upgradeColor), // Helper function to choose white or black text
//           fontSize: 10,
//           fontWeight: "bold",
//           background: {
//             padding: [4,6],
//             style: {
//               fill: upgradeColor,
//               radius: 4,
//             },
//           },
//         };
//       },
//       // Add animation to labels
//       // Add this to your config object
//       animation: {
//         appear: {
//           duration: 1000,
//           easing: 'easeQuadOut',
//         },
//         update: {
//           duration: 300,
//           easing: 'easeQuadInOut',
//         },
//       },
//     },
//     legend: { position: "top-right" as const },
//     tooltip: {
//       customItems: (items: any[]) =>
//         items.map((item) => ({
//           ...item,
//           name: item.data.upgrade,
//           value: `EIPs: ${item.data.label}`,
//         })),
//     },
//   };

//   return (
//     <Box bg={bg} p={4} borderRadius="lg" boxShadow="lg">
//       <Flex justifyContent="space-between" alignItems="center" marginBottom="0.5rem">
//         <Heading size="md" color={headingColor}>
//           Network Upgrades <CopyLink link={`https://eipsinsight.com/pectra#NetworkUpgrades`} />
//         </Heading>
//         <Button
//           colorScheme="blue"
//           fontSize={{ base: "0.6rem", md: "md" }}
//           onClick={async () => {
//             try {
//               downloadData();
//               await axios.post("/api/DownloadCounter");
//             } catch (error) {
//               console.error("Error triggering download counter:", error);
//             }
//           }}
//           isDisabled={isLoading}
//         >
//           {isLoading ? <Spinner size="sm" /> : "Download CSV"}
//         </Button>
//       </Flex>
//       <Column {...config} />
//     </Box>
//   );
// });

// export default NetworkUpgradesChart;

"use client";

import React, { useState, useCallback, useRef } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import {
  Box,
  useColorModeValue,
  Flex,
  Heading,
  Button,
  Spinner,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons";
import axios from "axios";
import CopyLink from "./CopyLink";
import { saveAs } from "file-saver";

interface UpgradeData {
  date: string;
  upgrade: string;
  count: number;
  label: string;
  eips: string[];
}

interface UpgradeData2 {
  date: string;
  upgrade: string;
  eip: string;
}
type HoveredEipInfo = {
  eip: string;
  upgrade: string;
  date: string;
};


const rawData = [
  { date: "2021-12-09", upgrade: "Arrow Glacier", eip: "EIP-4345" },
  { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2565" },
  { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2929" },
  { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2718" },
  { date: "2021-04-15", upgrade: "Berlin", eip: "EIP-2930" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-100" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-140" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-196" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-197" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-198" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-211" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-214" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-649" },
  { date: "2017-10-16", upgrade: "Byzantium", eip: "EIP-658" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-1153" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-4788" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-4844" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-5656" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-6780" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7044" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7045" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7514" },
  { date: "2024-03-13", upgrade: "Dencun", eip: "EIP-7516" },
  { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-145" },
  { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1014" },
  { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1052" },
  { date: "2019-02-28", upgrade: "Constantinople", eip: "EIP-1234" },
  { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1283" },
  { date: "2022-06-30", upgrade: "Gray Glacier", eip: "EIP-5133" },
  { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-2" },
  { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-7" },
  { date: "2016-03-14", upgrade: "Homestead", eip: "EIP-8" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-152" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1108" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1344" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-1884" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-2028" },
  { date: "2019-12-07", upgrade: "Istanbul", eip: "EIP-2200" },
  { date: "2021-08-05", upgrade: "London", eip: "EIP-1559" },
  { date: "2021-08-05", upgrade: "London", eip: "EIP-3198" },
  { date: "2021-08-05", upgrade: "London", eip: "EIP-3529" },
  { date: "2021-08-05", upgrade: "London", eip: "EIP-3541" },
  { date: "2021-08-05", upgrade: "London", eip: "EIP-3554" },
  { date: "2020-01-02", upgrade: "Muir Glacier", eip: "EIP-2384" },
  { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-145" },
  { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1014" },
  { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1052" },
  { date: "2019-02-28", upgrade: "Petersburg", eip: "EIP-1234" },
  { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3651" },
  { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3855" },
  { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-3860" },
  { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-4895" },
  { date: "2023-04-12", upgrade: "Shapella", eip: "EIP-6049" },
  { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-155" },
  { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-160" },
  { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-161" },
  { date: "2016-11-22", upgrade: "Spurious Dragon", eip: "EIP-170" },
  { date: "2016-10-18", upgrade: "Tangerine Whistle", eip: "EIP-150" },
  { date: "2022-09-15", upgrade: "The Merge", eip: "EIP-4399" },
  { date: "2022-09-15", upgrade: "The Merge", eip: "EIP-3675" },
  { date: "2015-09-07", upgrade: "Frontier Thawing", eip: "" },
  { date: "2015-07-30", upgrade: "Frontier", eip: "" },
  { date: "2021-10-21", upgrade: "Altair", eip: "" },
];
const upgradeMap: Record<string, { date: string; upgrade: string; eips: string[] }> = {};
for (const { date, upgrade, eip } of rawData) {
  const key = `${date}-${upgrade}`;
  if (!upgradeMap[key]) {
    upgradeMap[key] = { date, upgrade, eips: [] };
  }
  if (eip) {
    upgradeMap[key].eips.push(eip.replace("EIP-", ""));
  }
}

const transformedData: UpgradeData[] = Object.values(upgradeMap).map(({ date, upgrade, eips }) => ({
  date,
  upgrade,
  count: eips.length,
  label: eips.join(", "),
  eips,
})).sort((a, b) => {
  if (a.date === "TBD") return 1;
  if (b.date === "TBD") return -1;
  return new Date(a.date).getTime() - new Date(b.date).getTime();
});

const generateDistinctColor = (index: number, total: number) => {
  const hue = (index * (360 / total)) % 360;
  const saturation = 85 - (index % 2) * 15;
  const lightness = 60 - (index % 3) * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const uniqueUpgrades = [...new Set(transformedData.map((data) => data.upgrade))];
const colorMap = uniqueUpgrades.reduce((map, upgrade, index) => {
  map[upgrade] = generateDistinctColor(index, uniqueUpgrades.length);
  return map;
}, {} as Record<string, string>);

const cubeSize = 20;
const padding = 40; // Increased padding for axes
const rowHeight = cubeSize + 12;
const blockHeight = cubeSize;


const NetworkUpgradesChart = React.memo(() => {
  const bg = useColorModeValue("#f6f6f7", "#171923");
  const headingColor = useColorModeValue("black", "white");
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [hoveredEip, setHoveredEip] = useState<HoveredEipInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const maxItems = Math.max(...transformedData.map(d => d.eips.length));
  const blockWidth = cubeSize * 2;
  const blockSpacing = 6;
  const xScale = scaleLinear({
    domain: [0, maxItems],
    range: [0, maxItems * (blockWidth + blockSpacing)],
  });

  const chartWidth = xScale(maxItems) + 200;
  const chartHeight = transformedData.length * rowHeight + padding * 2;

  const resetZoom = () => {
    setZoomLevel(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({
      x: prev.x - dx / zoomLevel,
      y: prev.y - dy / zoomLevel,
    }));
  };

  const downloadData = useCallback(async () => {
    setIsLoading(true);
    const header = "Date,Network Upgrade,EIP Link,Requires,Type, Category,GITHUB\n";

    try {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        header +
        (
          await Promise.all(
            rawData.map(async ({ date, upgrade, eip }) => {
              const eipNo = eip.replace("EIP-", "");
              const url = `https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-${eipNo}.md`;

              try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch EIP-${eipNo}`);
                const eipData = await response.text();

                const requiresMatch = eipData.match(/requires:\s*(.+)/);
                let requires = requiresMatch ? requiresMatch[1].trim() : "None";
                const TypeMatch = eipData.match(/type:\s*(.+)/);
                let Type = TypeMatch?.[1]?.trim() ?? "None";
                const CategoryMatch = eipData.match(/category:\s*(.+)/);
                let Category = CategoryMatch ? CategoryMatch[1].trim() : "-";
                if (requires.includes(",")) {
                  requires = `"${requires}"`;
                }

                return `${date},${upgrade},https://eipsinsight.com/eips/eip-${eipNo},${requires},${Type}, ${Category}, EIPs`;
              } catch (error) {
                console.error(`Error fetching data for EIP-${eipNo}:`, error);
                return `${date},${upgrade},-,-,-,-,-`;
              }
            })
          )
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "network_upgrades.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box bg={bg} p={4} borderRadius="lg" boxShadow="lg" width="100%">
      {/* Header with Zoom and Download */}
      <Flex justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={3}>
        <Heading size="md" color={headingColor}>
          Network Upgrades <CopyLink link={`https://eipsinsight.com/pectra#NetworkUpgrades`} />
        </Heading>
        <HStack>
          <IconButton
            aria-label="Zoom In"
            icon={<AddIcon />}
            size="sm"
            onClick={() => setZoomLevel(z => z * 1.2)}
          />
          <IconButton
            aria-label="Zoom Out"
            icon={<MinusIcon />}
            size="sm"
            onClick={() => setZoomLevel(z => z / 1.2)}
          />
          <IconButton
            aria-label="Reset Zoom"
            icon={<RepeatIcon />}
            size="sm"
            onClick={resetZoom}
          />
          <Button
            colorScheme="blue"
            fontSize={{ base: "0.6rem", md: "md" }}
            onClick={async () => {
              try {
                downloadData();
                await axios.post("/api/DownloadCounter");
              } catch (error) {
                console.error("Error triggering download counter:", error);
              }
            }}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Download CSV"}
          </Button>
        </HStack>
      </Flex>

      {/* Chart Container */}
      <Box width="100%" overflow="visible" position="relative">
        <svg
          width="100%"
          height={chartHeight + 60}
          viewBox={`0 0 ${chartWidth} ${chartHeight + 60}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            background: useColorModeValue('#f9f9f9', '#1a202c'),
            display: 'block',
          }}
        >
          <Group top={padding} left={padding}>
            {/* Y Axis */}
            <AxisLeft
              left={0}
              scale={scaleLinear({
                domain: [0, transformedData.length - 1],
                range: [0, transformedData.length * rowHeight],
              })}
              tickValues={transformedData.map((_, i) => i)}
              tickFormat={(d) => transformedData[d].date}
              stroke="#000"
              tickStroke="#000"
              tickLabelProps={() => ({
                fontSize: 12,
                fill: useColorModeValue('#000', '#fff'),
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0.33em',
              })}
            />

            {/* X Axis */}
            <AxisBottom
              top={transformedData.length * rowHeight}
              scale={xScale}
              stroke="#000"
              tickStroke="#000"
              numTicks={Math.min(10, maxItems)}
              tickLabelProps={() => ({
                fontSize: 12,
                fill: useColorModeValue('#000', '#fff'),
                textAnchor: 'middle',
              })}
            />

            {/* Blocks */}
            {transformedData.map((item, rowIndex) => (
              <Group key={rowIndex} top={rowIndex * rowHeight} left={80}>
                {item.eips.map((eip, i) => (
                  <a key={i} href={`/eips/eip-${eip}`} target="_blank" rel="noopener noreferrer">
                    <g
                      onMouseEnter={(e) => {
                        setHoveredEip({
                          eip,
                          upgrade: item.upgrade,
                          date: item.date,
                        });
                        setTooltipPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setHoveredEip(null)}
                    >
                      <rect
                        x={xScale(i)}
                        y={0}
                        width={blockWidth}
                        height={blockHeight}
                        rx={4}
                        fill={colorMap[item.upgrade]}
                        stroke="white"
                      />
                      <text
                        x={xScale(i) + blockWidth / 2}
                        y={blockHeight / 1.5}
                        fontSize={11}
                        textAnchor="middle"
                        fill="white"
                      >
                        {eip}
                      </text>
                    </g>
                  </a>
                ))}
              </Group>
            ))}
          </Group>
        </svg>
      </Box>

      {/* Legend */}
      <Flex mt={4} gap={6} flexWrap="wrap" justify="center" align="center">
        {uniqueUpgrades.map((upgrade) => (
          <Flex key={upgrade} align="center" gap={2}>
            <Box w="12px" h="12px" borderRadius="full" bg={colorMap[upgrade]} />
            <Box as="span" fontSize="sm" fontWeight="medium">
              {upgrade}
            </Box>
          </Flex>
        ))}
      </Flex>

      {/* Tooltip with Date */}
      {hoveredEip && (
        <Box
          position="fixed"
          left={tooltipPos.x + 10}
          top={tooltipPos.y + 10}
          zIndex={999}
          bg="gray.800"
          color="white"
          px={4}
          py={3}
          borderRadius="md"
          fontSize="md"
          fontWeight="bold"
          pointerEvents="none"
          boxShadow="lg"
        >
          <Text fontSize="lg">EIP: {hoveredEip.eip}</Text>
          <Text>Upgrade: {hoveredEip.upgrade}</Text>
          <Text>Date: {hoveredEip.date}</Text>
        </Box>
      )}
    </Box>
  );


});

export default NetworkUpgradesChart;