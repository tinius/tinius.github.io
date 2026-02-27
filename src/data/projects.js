export const projects = [
  {
    slug: "tree-cities",
    title: "Which U.S. cities have the most trees?",
    year: 2025,

    link: {
      type: "external", // "external" | "internal"
      url: "https://www.washingtonpost.com/climate-environment/interactive/2025/tree-friendly-cities-urban-forests/",
    },

    // media: either image or video (mp4/webm)
    primaryMedia: { type: "image", src: "/projects/treecities3.png" },
    secondaryMedia: { type: "image", src: "/projects/treecities4.png" },

    dataHighlights: [
      "Matched U.S. cities to peer cities based on geographical proximity, climate and population density",
      "Investigated policies and practices in outlier cities where tree cover is much higher or lower than expected",
    ],
    visualHighlights: [
      "Interactive lookup tool (mapbox-gl-js) for neighbourhood-level data",
      "SimCity-style isometric views of example cities from Google Earth Studio",
    ],
  },

  {
    slug: "floodsabove",
    title: "Deadly rivers in the sky",
     link: {
      type: "external", // "external" | "internal"
      url: "https://www.washingtonpost.com/weather/interactive/2025/deadly-flooding-moisture-hotspots-maps",
    },
    year: 2025,
    primaryMedia: { type: "video", src: "/projects/floodsabove-padded-cropped.mp4" },
    secondaryMedia: { type: "image", src: "/projects/floodsabove2.png" },
    dataHighlights: [
      "Identified rainfall trends and extremes across 40 years of daily gridded data",
      "Combined rainfall and atmospheric moisture records to identify ‘compound events’ with the strongest climate change link",
    ],
    visualHighlights: [
      "mapbox-gl-js globe with video layers, visualising moisture plumes in the atmosphere",
    ],
  },
  {
    slug: "climatemaladies",
    title: "Extreme heat and the human limit",
     link: {
      type: "external", // "external" | "internal"
      url: "https://www.washingtonpost.com/climate-environment/interactive/2023/india-deadly-extreme-heat-poverty/",
    },
    year: 2023,
    primaryMedia: { type: "video", src: "/projects/climatemaladies-cropped.mp4" },
    secondaryMedia: { type: "image", src: "/projects/climatemaladies2.jpg" },
    dataHighlights: [
      "Collaborated with external scientists to model extreme heat days in unprecedented detail",
      "Reported on the ground in Kolkata, India, mapping urban heat inequality with mobile weather sensors",
    ],
    visualHighlights: [
      "Maps, videos and 3D reconstruction of affected neighbourhoods in Kolkata",
      "mapbox-gl-js globe and animated maps of extreme heat days around the world"
    ],
  },
  {
    slug: "uselex2020",
    title: "2020 U.S. elections",
     link: {
      type: "external", // "external" | "internal"
      url: "https://www.theguardian.com/us-news/ng-interactive/2020/dec/08/us-election-results-2020-joe-biden-defeats-donald-trump-to-win-presidency",
    },
    year: 2020,
    primaryMedia: { type: "video", src: "/projects/uselex2020-cropped.mp4" },
    secondaryMedia: { type: "image", src: "/projects/uselex2020-1.png" },
    
    dataHighlights: [
      "nodeJS/AWS data pipeline fetching data from Associated Press every 15s"
    ],
    visualHighlights: [
      "Live-updating React page with results ticker, maps and battleground states",
      "Custom cartogram for House of Representatives results"
    ],
  },
];