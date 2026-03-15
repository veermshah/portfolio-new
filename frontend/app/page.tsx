"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Linkedin, Menu, X } from "lucide-react";
import { VideoText } from "@/components/ui/video-text";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { PixelImage } from "@/components/ui/pixel-image";
import { DotPattern } from "@/components/ui/dot-pattern";
import { HyperText } from "@/components/ui/hyper-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { CursorImageTrail } from "@/components/ui/cursor-image-trail";
import { RoundedSquareCursor } from "@/components/ui/rounded-square-cursor";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magicui/scroll-based-velocity";

const heroPhotos = [
  "/photos/veer16.jpg",
  "/photos/veer17.jpg",
  "/photos/veer14.jpg",
  "/photos/veer12.jpg",
  "/photos/veer1.jpeg",
  "/photos/veer2.jpeg",
  "/photos/veer3.jpeg",
  "/photos/veer6.png",
  "/photos/veer8.jpg",
  "/photos/veer9.jpg",
];

const experienceTimeline = [
  {
    role: "Director (formerly Experience Officer)",
    company: "HackUTD",
    period: "Feb 2024 - Present · 2 yrs 1 mo",
    location: "Dallas, Texas",
    details:
      "Started as Experience Officer, designing participant systems and event operations, then moved into Director responsibilities leading team strategy, sponsor collaboration, and cross-functional execution for one of the largest student hackathons.",
    skills: "Team Leadership, Event Planning, Cross-Functional Team Building, +7 skills",
  },
  {
    role: "Full Stack Software Engineering Intern",
    company: "Fidelity Investments · Internship",
    period: "Jun 2025 - Dec 2025 · 7 mos",
    location: "Westlake, Texas, United States",
    details:
      "Built retrieval and AI-oriented product workflows with robust cloud infrastructure and production-grade full-stack delivery.",
    skills: "Retrieval-Augmented Generation (RAG), Amazon Web Services (AWS), +3 skills",
  },
  {
    role: "Technology Intern Program",
    company: "Capital One · Internship",
    period: "Starting Summer 2026",
    location: "Plano, Texas",
    details:
      "Incoming intern in Capital One's Technology Intern Program, focused on building scalable software systems and delivering customer-facing product impact.",
    skills: "Software Engineering, Scalable Systems, Product Development",
  },
  {
    role: "Software Engineering Intern",
    company: "Investamark LLC · Internship",
    period: "Jun 2024 - Jul 2024 · 2 mos",
    location: "Irving, Texas, United States · On-site",
    details:
      "Set up Ollama Docker workflows for Phi3, Gemma 2, and Mistral, customized OpenWebUI Svelte UI, created synthetic fine-tuning data, and built RAG over 100+ documents using ChromaDB, OpenAIEmbeddings, and LangChain.",
    skills: "LangChain, Svelte, +4 skills",
  },
  {
    role: "Undergraduate Researcher (incl. Clark Summer Research Program)",
    company: "UT Dallas · Part-time",
    period: "Jun 2023 - Feb 2024 · 9 mos",
    location: "Richardson, Texas, United States · On-site",
    details:
      "Contributed to UTD research through the Clark Summer Research Program and continued as an undergraduate researcher, supporting cybersecurity PhD teams with experiment setup, data collection, and hands-on prototyping using Python, ROS2, C++, and Linux.",
    skills: "Python (Programming Language), ROS2, C++, Linux, +2 skills",
  },
];

const projectItems = [
  {
    title: "WhatDoesDaFoxSay",
    event: "HackUTA 7",
    award: "Winner - [MLH] Best Use of Auth0",
    stack: "Gemini, ElevenLabs, OpenFace, MediaPipe, Firebase",
    summary:
      "A calm, playful reading companion designed for children with dyslexia, combining speech, gaze, and emotion-aware feedback.",
    devpost: "https://devpost.com/software/whatdoesdafoxsay",
    github: "https://github.com/veermshah/25HackUTA",
    tryUrl: "https://devpost.com/software/whatdoesdafoxsay",
    images: ["/projects/fox.jpg", "/projects/fox1.jpg", "/projects/fox3.jpg"],
  },
  {
    title: "Ebby",
    event: "HackSMU VI",
    award: "Winner - OIT Track, MLH Best Use of PropelAuth",
    stack: "Next.js, Flask, OpenCV, OpenAI, WebSockets",
    summary:
      "A student-focused well-being platform with AI health guidance, peer support groups, and fitness tracking.",
    devpost: "https://devpost.com/software/ibm-please-hire-us",
    github: "https://github.com/sachi-jh/hacksmu/",
    tryUrl: "https://devpost.com/software/ibm-please-hire-us",
    images: ["/projects/ebby.jpg", "/projects/ebby2.jpg", "/projects/ebby3.jpg"],
  },
  {
    title: "Midpoint",
    event: "HackUPC 2025",
    award: "Winner - [MLH] Best Use of MongoDB Atlas || M5GO IoT Starter Kit",
    stack: "Next.js, React, Gemini, Auth0, MongoDB, Chart.js, Spline",
    summary:
      "An AI-powered group travel planner that merges preferences, budgets, and schedules to recommend destinations, activities, and trip options.",
    devpost: "https://devpost.com/software/a-wk0ple",
    github: "https://github.com/veermshah/HackUPC.git",
    tryUrl: "https://devpost.com/software/a-wk0ple",
    images: ["/projects/midpoint.jpg", "/projects/midpoint1.jpg", "/projects/midpoint2.jpg"],
  },
  {
    title: "QuantumLoans",
    event: "HackFin - Quantum Drift",
    award: "Winner - Fintech Hackathon Challenge (First Place)",
    stack: "React, Solidity, Hardhat, MetaMask SDK, Web3.js, Flask, Uniswap",
    summary:
      "A DeFi lending platform for overcollateralized crypto loans, liquidity lending, and portfolio health insights without selling core holdings.",
    devpost: "https://devpost.com/software/quantumloans",
    github: "https://github.com/veermshah/QuantumLoans",
    tryUrl: "https://devpost.com/software/quantumloans",
    images: ["/projects/ql.jpg", "/projects/ql1.jpg", "/projects/ql2.jpg"],
  },
  {
    title: "Comet Live",
    event: "Product Engineering",
    award: "Full Stack Developer",
    stack: "Flutter, Figma, Full-Stack Product Development",
    summary:
      "Shipped full-stack product features and polished UX workflows to improve user engagement and release quality.",
    devpost: "https://www.linkedin.com/in/veermickeyshah/",
    github: "https://github.com/veermshah",
    tryUrl: "https://www.linkedin.com/in/veermickeyshah/",
    images: ["/projects/fluently.jpg", "/projects/fluently1.jpg", "/projects/fluently2.jpg"],
  },
  {
    title: "FinTech UTD",
    event: "Product Leadership",
    award: "Product Manager",
    stack: "Agile, Jira, Product Strategy, Sprint Planning",
    summary:
      "Managed product planning, sprint direction, and delivery coordination across engineering and design contributors.",
    devpost: "https://www.linkedin.com/in/veermickeyshah/",
    github: "https://github.com/veermshah",
    tryUrl: "https://www.linkedin.com/in/veermickeyshah/",
    images: ["/projects/fluently3.jpg", "/projects/fluently4.jpg", "/projects/fluently5.jpg"],
  },
  {
    title: "AIS UTD",
    event: "Applied AI",
    award: "AIM",
    stack: "Neural Networks, Data Preparation, ML Experimentation",
    summary:
      "Worked on machine learning experimentation and data preparation pipelines for practical AI applications.",
    devpost: "https://www.linkedin.com/in/veermickeyshah/",
    github: "https://github.com/veermshah",
    tryUrl: "https://www.linkedin.com/in/veermickeyshah/",
    images: ["/projects/fluently6.jpg", "/projects/fluently7.jpg", "/projects/mp4.jpg"],
  },
  {
    title: "CYC",
    event: "Consulting Work",
    award: "Technical Consultant",
    stack: "Technical Consulting, Solution Mapping, Client Delivery",
    summary:
      "Led technical consultation and sales-oriented solution mapping for client-facing software decisions.",
    devpost: "https://www.linkedin.com/in/veermickeyshah/",
    github: "https://github.com/veermshah",
    tryUrl: "https://www.linkedin.com/in/veermickeyshah/",
    images: ["/projects/cc3.jpg", "/projects/cc4.jpg", "/projects/cc5.jpg"],
  },
  {
    title: "MindfulWalk",
    event: "ACM UTD Projects",
    award: "Mobile Wellness App",
    stack: "Flutter, Figma, Android",
    summary:
      "Built an Android app blending urban exploration, fitness, and mindfulness using an agile, design-first workflow.",
    devpost: "https://www.linkedin.com/in/veermickeyshah/",
    github: "https://github.com/veermshah",
    tryUrl: "https://www.linkedin.com/in/veermickeyshah/",
    images: ["/projects/ebby7.jpg", "/projects/ebby8.jpg", "/projects/ebby9.jpg"],
  },
  {
    title: "Moneyplant",
    event: "TAMUhack X",
    award: "Winner - Third Place for the PIMCO Challenge",
    stack: "React, Django, LSTM, Black-Litterman, Watsonx",
    summary:
      "An ML-driven robo-advisor that blends portfolio optimization with stress-reducing UX for better investing decisions.",
    devpost: "https://devpost.com/software/moneyplant-vjar92",
    github: "https://github.com/veermshah/TAMUhacks",
    tryUrl: "https://money-plant-demo.netlify.app/",
    images: ["/projects/mp.jpg", "/projects/mp2.jpg", "/projects/mp3.jpg"],
  },
  {
    title: "Charity Clarity",
    event: "HackTheChains",
    award: "Winner - Best Domain Name from GoDaddy, Solana",
    stack: "React, Solana, Phantom Wallet, AWS, Web3.js",
    summary:
      "A blockchain-based donation transparency platform that lets donors verify where funds are going in real time.",
    devpost: "https://devpost.com/software/jeremiahisfat",
    github: "https://github.com/jeremiahboban/HackTheChains",
    tryUrl: "http://charityclarity.us/",
    images: ["/projects/cc.jpg", "/projects/cc1.jpg", "/projects/cc2.png"],
  },
  {
    title: "Aerovision Pro Max",
    event: "PennApps XXIV",
    award: "Winner - Best Use of Viam Software in Robotics",
    stack: "Python, OpenCV, MediaPipe, Viam Rover",
    summary:
      "A gesture-controlled robotics system inspired by aircraft marshalling signals for safer autonomous transition workflows.",
    devpost: "https://devpost.com/software/wordle-wniql2",
    github: "https://github.com/RCoder01/pennapps-xxiv",
    tryUrl: "https://devpost.com/software/wordle-wniql2",
    images: ["/projects/pennapps.jpg", "/projects/pennapps2.jpg"],
  },
];

type EducationItem = {
  school: string;
  focus?: string;
  degree?: string;
  dates?: string;
  programLine?: string;
  gpa?: string;
  honors?: string[];
  studyAbroad?: string;
  coursework?: string[];
  activities?: string;
  grade?: string;
  ib?: string;
  program?: string;
  skills?: string;
};

const educationItems: EducationItem[] = [
  {
    school: "The University of Texas at Dallas",
    degree: "Bachelor's degree, Computer Science",
    dates: "Aug 2023 - May 2027",
    programLine: "B.S. + M.S. in Computer Science | Minor in Finance Aug 2023 - May 2027",
    gpa: "3.85",
    honors: ["CS Honors", "National Merit Finalist", "Collegium V"],
    studyAbroad: "Universidad Carlos III de Madrid",
    coursework: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Databases",
      "Statistics/Probability",
      "Systems Engineering",
      "Java",
      "Linear Algebra",
      "Discrete Math",
      "Computer Architecture",
      "Digital Logic",
      "Automata Theory",
      "Software Engineering",
      "Database Design",
      "Machine Learning",
      "Compilers",
      "Artificial Intelligence",
      "Blockchain",
    ],
    activities:
      "HackUTD, Association for Computing Machinery, Fintech, Artificial Intelligence Society, Consult Your Community",
  },
  {
    school: "Universidad Carlos III de Madrid",
    dates: "Jan 2025 - Jun 2025",
    program: "Exchange program",
    skills: "Spanish, Corporate Finance, +1 skill",
  },
  {
    school: "Harvard Extension School",
    dates: "Jun 2020 - Jul 2020",
    grade: "A",
  },
  {
    school: "Uplift Education-North Hills Preparatory High School",
    degree: "IB Diploma",
    dates: "2019 - 2023",
    grade: "3.95",
    activities:
      "Student Government, National Honor Society, Spanish Honor Society, UIL Theatre, Cross Country, Track",
    ib: "38/45",
  },
];

const aboutParagraphs = [
  "Hi, I am Veer Shah, an aspiring software engineer passionate about building impactful products through collaboration and creativity. I enjoy working across the stack, with a strong focus on AI and full-stack systems.",
  "I have interned at Fidelity Investments and Investamark, where I built cloud-native solutions, hybrid search systems, and secure AI-powered workflows. I also work on autonomous systems and security-oriented projects.",
  "Outside internships and research, I love hackathons and rapid prototyping. I am a 7x hackathon winner and currently serve as Director of HackUTD.",
];

const navNameFonts = ["font-hkblack", "font-hkbold", "font-heming", "font-milkywalky", "font-dirtyline"];
const webringSiteId = "your-site-here";
const splashVideoSrc = "https://res.cloudinary.com/deevrb9n5/video/upload/v1773572228/splash_1_wpivoc.mp4";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isExperienceBgLoaded, setIsExperienceBgLoaded] = useState(false);
  const [activeAboutHoverIndex, setActiveAboutHoverIndex] = useState<number | null>(null);
  const [activeAboutHoverImage, setActiveAboutHoverImage] = useState<string | null>(null);
  const [activeUnsplashHoverKey, setActiveUnsplashHoverKey] = useState<string | null>(null);
  const [activeUnsplashHoverImage, setActiveUnsplashHoverImage] = useState<string | null>(null);
  const [splashTrailImages, setSplashTrailImages] = useState<string[]>([]);
  const [experiencePanelImages, setExperiencePanelImages] = useState<string[]>([]);
  const [isNameHovering, setIsNameHovering] = useState(false);
  const [navNameFontIndex, setNavNameFontIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [activeEducationModalIndex, setActiveEducationModalIndex] = useState<number | null>(null);
  const [educationTilt, setEducationTilt] = useState<Record<number, { rotateX: number; rotateY: number }>>({});
  const siteRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 900], [0, -45]);
  const activeExperienceBgSrc =
    experiencePanelImages[activeExperienceIndex] ||
    heroPhotos[activeExperienceIndex % heroPhotos.length];
  const activeProject = projectItems[activeProjectIndex];
  const activeProjectBgSrc = activeProject.images[0];
  const activeEducationItem =
    activeEducationModalIndex !== null ? educationItems[activeEducationModalIndex] : null;

  const getRandomPortfolioImage = () => {
    const source = splashTrailImages.length > 0 ? splashTrailImages : heroPhotos;
    return source[Math.floor(Math.random() * source.length)];
  };

  const handleUnsplashHoverStart = (key: string) => {
    setActiveUnsplashHoverImage(getRandomPortfolioImage());
    setActiveUnsplashHoverKey(key);
  };

  const handleUnsplashHoverEnd = () => {
    setActiveUnsplashHoverKey(null);
    setActiveUnsplashHoverImage(null);
  };

  const handleExperiencePreview = (index: number) => {
    if (supportsHover) {
      setActiveExperienceIndex(index);
    }
  };

  const handleProjectPreview = (index: number) => {
    if (supportsHover) {
      setActiveProjectIndex(index);
    }
  };

  const handleAboutHoverStart = (index: number) => {
    setActiveAboutHoverImage(getRandomPortfolioImage());
    setActiveAboutHoverIndex(index);
  };

  const handleAboutHoverEnd = () => {
    setActiveAboutHoverIndex(null);
    setActiveAboutHoverImage(null);
  };

  const getEducationInitial = (index: number) => {
    const leftEntryIndexes = new Set([0, 2]);
    const offset = isMobileViewport ? 72 : 84;
    return leftEntryIndexes.has(index)
      ? { x: -offset, y: 0, opacity: 0 }
      : { x: offset, y: 0, opacity: 0 };
  };

  const handleEducationTiltMove = (index: number, event: MouseEvent<HTMLElement>) => {
    if (isMobileViewport) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    const maxTilt = 8;
    const rotateY = (relativeX - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - relativeY) * maxTilt * 2;

    setEducationTilt((prev) => ({
      ...prev,
      [index]: { rotateX, rotateY },
    }));
  };

  const resetEducationTilt = (index: number) => {
    setEducationTilt((prev) => ({
      ...prev,
      [index]: { rotateX: 0, rotateY: 0 },
    }));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateSupportsHover = () => setSupportsHover(mediaQuery.matches);
    updateSupportsHover();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSupportsHover);
      return () => mediaQuery.removeEventListener("change", updateSupportsHover);
    }

    mediaQuery.addListener(updateSupportsHover);
    return () => mediaQuery.removeListener(updateSupportsHover);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const pickRandomImages = (source: string[], count: number) => {
      if (source.length === 0 || count <= 0) return [];

      const shuffled = [...source];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
      }

      if (shuffled.length >= count) {
        return shuffled.slice(0, count);
      }

      const repeated: string[] = [];
      for (let index = 0; index < count; index += 1) {
        repeated.push(shuffled[index % shuffled.length]);
      }
      return repeated;
    };

    const loadUnsplashImages = async () => {
      try {
        const response = await fetch("/api/unsplash-photos?username=veermickey&per_page=24");
        if (!response.ok) return;

        const data = (await response.json()) as { photos?: Array<{ src: string }> };
        if (!data.photos || isCancelled) return;

        const nextImages = data.photos.map((photo) => photo.src).filter(Boolean).slice(0, 24);
        if (nextImages.length > 0) {
          setSplashTrailImages(nextImages);
          setExperiencePanelImages(pickRandomImages(nextImages, experienceTimeline.length));
        }
      } catch {
        // Keep silent fallback when Unsplash is unavailable.
      }
    };

    setExperiencePanelImages(pickRandomImages(heroPhotos, experienceTimeline.length));
    loadUnsplashImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (showSplash) return;
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % heroPhotos.length);
    }, 3400);

    return () => clearInterval(interval);
  }, [showSplash]);

  useEffect(() => {
    if (!isNameHovering) return;

    const fontCycle = setInterval(() => {
      setNavNameFontIndex((prev) => (prev + 1) % navNameFonts.length);
    }, 900);

    return () => clearInterval(fontCycle);
  }, [isNameHovering]);

  useEffect(() => {
    setIsExperienceBgLoaded(false);
  }, [activeExperienceBgSrc]);

  useEffect(() => {
    if (showSplash || !siteRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scroll='section']").forEach((section) => {
        if (section.id === "experience") return;

        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 64 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger='items']").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-item='reveal']");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 32, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float='parallax']").forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -24 : -14,
          rotate: index % 2 === 0 ? -1.5 : 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='inview']").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28, scale: 0.985, filter: "blur(7px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
          }
        );
      });

    }, siteRef);

    return () => context.revert();
  }, [showSplash]);

  useEffect(() => {
    if (activeEducationModalIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveEducationModalIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeEducationModalIndex]);

  const goPrev = () => {
    setActivePhoto((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const goNext = () => {
    setActivePhoto((prev) => (prev + 1) % heroPhotos.length);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <RoundedSquareCursor enabled={!showSplash} />
      <DotPattern className="-z-10 text-zinc-300/70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] dark:text-zinc-700/40" />

      <AnimatePresence mode="wait">
        {showSplash ? (
        <motion.main
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          role="button"
          tabIndex={0}
          onClick={() => setShowSplash(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setShowSplash(false);
            }
          }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-3"
        >
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center px-4 md:px-8">
            <div className="relative h-[64vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/30 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] md:h-[70vh]">
              <Image
                src="/splash/splash.jpg"
                alt="Splash background"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-4 py-4 md:translate-y-6 md:flex-row md:gap-3 md:px-8 lg:px-12">
                <div className="relative h-[27vh] w-full md:h-full md:w-[48%]">
                  <VideoText
                    src={splashVideoSrc}
                    fontSize={30}
                    fontWeight={800}
                    fontFamily="HKGroteskWide Black, Arial, sans-serif"
                    className="font-hkblack"
                  >
                    VEER
                  </VideoText>
                </div>

                <div className="relative h-[27vh] w-full md:h-full md:w-[48%]">
                  <VideoText
                    src={splashVideoSrc}
                    fontSize={30}
                    fontWeight={800}
                    fontFamily="HKGroteskWide Black, Arial, sans-serif"
                    className="font-hkblack"
                  >
                    SHAH
                  </VideoText>
                </div>
              </div>
            </div>
          </div>

          <CursorImageTrail enabled={showSplash} images={splashTrailImages} />
          <h1 className="sr-only">VEER SHAH</h1>
        </motion.main>
      ) : (
        <motion.main
          ref={siteRef}
          key="site"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="min-h-screen"
        >
          <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/88">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
              <motion.a
                href="#top"
                onClick={() => setMobileNavOpen(false)}
                onMouseEnter={() => setIsNameHovering(true)}
                onMouseLeave={() => {
                  setIsNameHovering(false);
                  setNavNameFontIndex(0);
                }}
                whileHover={{ y: -3, scale: 1.06, rotate: -1 }}
                whileTap={{ scale: 0.9, rotate: 2 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className={`${navNameFonts[navNameFontIndex]} rounded-lg px-2 py-1 text-xl tracking-[0.08em] transition-[font-family,letter-spacing,box-shadow] duration-700 hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_12px_30px_-18px_rgba(255,255,255,0.24)]`}
              >
                VEER SHAH
              </motion.a>

              <button
                type="button"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center text-black md:hidden dark:text-white"
              >
                {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="hidden flex-wrap items-center justify-end gap-3 text-sm md:flex md:gap-5"
              >
                <motion.a
                  href="#about"
                  whileHover={{ y: -4, scale: 1.08, rotate: -1.2 }}
                  whileTap={{ scale: 0.88, y: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="group relative inline-flex items-center rounded-full px-3 py-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-current/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  <span>About</span>
                </motion.a>
                <motion.a
                  href="#experience"
                  whileHover={{ y: -4, scale: 1.08, rotate: 1.2 }}
                  whileTap={{ scale: 0.88, y: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="group relative inline-flex items-center rounded-full px-3 py-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-current/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  <span>Experience</span>
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ y: -4, scale: 1.08, rotate: -1.2 }}
                  whileTap={{ scale: 0.88, y: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="group relative inline-flex items-center rounded-full px-3 py-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-current/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  <span>Projects</span>
                </motion.a>
                <motion.a
                  href="#education"
                  whileHover={{ y: -4, scale: 1.08, rotate: 1.2 }}
                  whileTap={{ scale: 0.88, y: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="group relative inline-flex items-center rounded-full px-3 py-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-current/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  <span>Education</span>
                </motion.a>
                <motion.a
                  href="/Veer_Shah_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.08, rotate: -1.2 }}
                  whileTap={{ scale: 0.86, y: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  className="group relative inline-flex items-center rounded-full px-3 py-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-current/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  <span>Resume</span>
                </motion.a>
                <motion.a
                  href="https://github.com/veermshah"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  whileHover={{ y: -4, rotate: -14, scale: 1.18 }}
                  whileTap={{ scale: 0.82, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                  className="inline-flex rounded-full p-1.5 hover:bg-[var(--surface)]"
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/veermickeyshah/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{ y: -4, rotate: 14, scale: 1.18 }}
                  whileTap={{ scale: 0.82, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                  className="inline-flex rounded-full p-1.5 hover:bg-[var(--surface)]"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.div
                  whileHover={{ rotate: 18, scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.84, rotate: -14 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                >
                  <AnimatedThemeToggler className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[color:var(--foreground)] transition-colors hover:opacity-80" />
                </motion.div>
              </motion.div>
            </nav>

            <AnimatePresence>
              {mobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="border-t border-[var(--border)] bg-[var(--background)]/98 px-4 py-4 md:hidden"
                >
                  <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm">
                    <a href="#about" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--surface)]">About</a>
                    <a href="#experience" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--surface)]">Experience</a>
                    <a href="#projects" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--surface)]">Projects</a>
                    <a href="#education" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--surface)]">Education</a>
                    <a href="/Veer_Shah_Resume.pdf" target="_blank" rel="noreferrer" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--surface)]">Resume</a>
                    <div className="mt-1 flex items-center gap-4 px-2 py-1">
                      <a
                        href="https://github.com/veermshah"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        onClick={() => setMobileNavOpen(false)}
                        className="inline-flex rounded-full p-1.5 hover:bg-[var(--surface)]"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/veermickeyshah/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        onClick={() => setMobileNavOpen(false)}
                        className="inline-flex rounded-full p-1.5 hover:bg-[var(--surface)]"
                      >
                        <Linkedin size={18} />
                      </a>
                      <AnimatedThemeToggler className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[color:var(--foreground)] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          <section
            id="top"
            data-scroll="section"
            className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-24 md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:pt-24"
          >
            <motion.div
              data-gsap="inview"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 md:col-span-6"
            >
              <div className="min-h-6 text-xs uppercase tracking-[0.2em] text-zinc-700 md:min-h-7 md:text-sm dark:text-zinc-200">
                <TypingAnimation
                  words={[
                    "Fullstack Developer",
                    "Serial Hackathon Winner",
                    "ML/AI Engineer",
                    "MS + BS in CS",
                    "Agentic Frameworks",
                    "Blockchain Developer",
                  ]}
                  loop
                />
              </div>
              <h1 className="font-hkblack mt-3 text-5xl leading-[0.9] tracking-[0.07em] sm:text-6xl md:text-7xl">
                VEER SHAH
              </h1>
              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => handleUnsplashHoverStart("hero-intro")}
                onFocus={() => handleUnsplashHoverStart("hero-intro")}
                onMouseLeave={handleUnsplashHoverEnd}
                onBlur={handleUnsplashHoverEnd}
                className="group relative mt-5 max-w-xl overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    activeUnsplashHoverKey === "hero-intro" && activeUnsplashHoverImage
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {activeUnsplashHoverImage ? (
                    <Image
                      src={activeUnsplashHoverImage}
                      alt="Unsplash background"
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/65" />
                </div>

                <p
                  className={`relative text-base leading-7 transition-colors duration-300 ${
                    activeUnsplashHoverKey === "hero-intro"
                      ? "text-white"
                      : "text-black dark:text-[color:var(--muted-strong)]"
                  }`}
                >
                  I build intelligent, production-ready products at the intersection
                  of AI, cloud infrastructure, and full-stack development.
                </p>
              </div>
            </motion.div>

            <motion.div
              data-gsap="inview"
              data-float="parallax"
              style={{ y: heroY }}
              className="order-1 relative h-[62vh] min-h-[460px] w-full md:order-2 md:col-span-6 md:h-[70vh]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroPhotos[activePhoto]}
                    initial={{ opacity: 0, scale: 1.18 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroPhotos[activePhoto]}
                      alt={`Veer photo ${activePhoto + 1}`}
                      fill
                      priority={activePhoto === 0}
                      sizes="(max-width: 768px) 100vw, 48vw"
                      className="object-cover object-[center_20%]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 md:p-4">
                  <p className="text-xs font-medium tracking-[0.12em] text-white/85 md:text-sm">
                    PHOTO {activePhoto + 1} / {heroPhotos.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous photo"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur hover:bg-black/45"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next photo"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur hover:bg-black/45"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                {heroPhotos.map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    aria-label={`Go to photo ${index + 1}`}
                    onClick={() => setActivePhoto(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      activePhoto === index
                        ? "w-7 bg-zinc-900 dark:bg-zinc-100"
                        : "w-2.5 bg-zinc-400/70 dark:bg-zinc-600/80"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </section>

          <section id="about" data-scroll="section" className="mx-auto w-full max-w-7xl px-4 pt-24 md:px-8">
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleUnsplashHoverStart("heading-about")}
              onFocus={() => handleUnsplashHoverStart("heading-about")}
              onMouseLeave={handleUnsplashHoverEnd}
              onBlur={handleUnsplashHoverEnd}
              className="group relative inline-flex overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  activeUnsplashHoverKey === "heading-about" && activeUnsplashHoverImage
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {activeUnsplashHoverImage ? (
                  <Image
                    src={activeUnsplashHoverImage}
                    alt="Unsplash background"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 24vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/65" />
              </div>

              <HyperText
                as="h2"
                className={`font-hkbold relative z-10 text-3xl tracking-[0.04em] transition-colors duration-300 md:text-4xl ${
                  activeUnsplashHoverKey === "heading-about" ? "text-white" : ""
                }`}
                duration={700}
                startOnView
              >
                About
              </HyperText>
            </div>

            <div className="mt-6 grid items-stretch gap-8 md:grid-cols-12" data-stagger="items">
              <motion.div
                data-item="reveal"
                data-gsap="inview"
                data-float="parallax"
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 5.65 }}
                className="order-1 md:order-2 md:col-span-4 md:h-full"
              >
                <PixelImage
                  src="/photos/veer8.jpg"
                  alt="Veer portrait"
                  grid="8x8"
                  maxAnimationDelay={3000}
                  className="h-[300px] md:h-full md:min-h-[360px]"
                />
              </motion.div>

              <div className="order-2 space-y-4 md:order-1 md:col-span-8" data-item="reveal" data-gsap="inview">
                {aboutParagraphs.map((paragraph, index) => {
                  const isActive = activeAboutHoverIndex === index && activeAboutHoverImage;

                  return (
                    <div
                      key={`about-paragraph-${index}`}
                      onMouseEnter={() => handleAboutHoverStart(index)}
                      onFocus={() => handleAboutHoverStart(index)}
                      onMouseLeave={handleAboutHoverEnd}
                      onBlur={handleAboutHoverEnd}
                      className="group relative overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {activeAboutHoverImage ? (
                          <Image
                            src={activeAboutHoverImage}
                            alt="Unsplash background"
                            fill
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 58vw"
                            className="object-cover"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-black/65" />
                      </div>

                      <TextReveal
                        className={`relative z-10 transition-colors duration-300 ${
                          isActive ? "text-white" : ""
                        }`}
                      >
                        {paragraph}
                      </TextReveal>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-8 w-full py-8 md:mt-12 md:py-10">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-5 md:py-6">
              <ScrollVelocityContainer className="font-hkbold text-3xl tracking-[-0.02em] text-[color:var(--foreground)] md:text-6xl md:leading-[1.2]">
                <ScrollVelocityRow baseVelocity={35} direction={-1}>
                  Sometimes we are not looking for the answers just people we could share questions with. 
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={35} direction={1}>
                      Life is too important to take seriously.
                </ScrollVelocityRow>
              </ScrollVelocityContainer>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--surface)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--surface)] to-transparent" />
            </div>
          </section>

          <section id="experience" data-scroll="section" className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pt-8 md:px-8 md:pt-12">
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleUnsplashHoverStart("heading-experience")}
              onFocus={() => handleUnsplashHoverStart("heading-experience")}
              onMouseLeave={handleUnsplashHoverEnd}
              onBlur={handleUnsplashHoverEnd}
              className="group relative inline-flex overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  activeUnsplashHoverKey === "heading-experience" && activeUnsplashHoverImage
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {activeUnsplashHoverImage ? (
                  <Image
                    src={activeUnsplashHoverImage}
                    alt="Unsplash background"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 24vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/65" />
              </div>

              <HyperText
                as="h2"
                className={`font-hkbold relative z-10 text-3xl tracking-[0.04em] transition-colors duration-300 md:text-4xl ${
                  activeUnsplashHoverKey === "heading-experience" ? "text-white" : ""
                }`}
                duration={700}
                startOnView
              >
                Experience
              </HyperText>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 md:col-span-5 md:p-4">
                {experienceTimeline.map((item, index) => {
                  const isActive = index === activeExperienceIndex;
                  const experienceFillSrc =
                    experiencePanelImages[index] ||
                    heroPhotos[index % heroPhotos.length];

                  return (
                    <div key={`experience-list-${item.company}-${item.role}`}>
                      <button
                        type="button"
                        onMouseEnter={() => handleExperiencePreview(index)}
                        onFocus={() => handleExperiencePreview(index)}
                        onClick={() => setActiveExperienceIndex(index)}
                        className={`group relative w-full max-w-full overflow-hidden border-b border-[var(--border)] px-2 py-3 text-left transition-colors last:border-b-0 hover:bg-[var(--background)]/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)] ${
                          isActive ? "bg-[var(--background)]/75" : ""
                        }`}
                      >
                        <div className="relative block w-full">
                          <span className="font-hkbold block truncate text-xl leading-tight text-black dark:text-[color:var(--muted)] md:text-2xl">
                            {item.company}
                          </span>
                          <span
                            className={`font-hkbold pointer-events-none absolute left-0 top-0 block w-0 overflow-hidden whitespace-nowrap text-xl leading-tight text-[color:var(--foreground)] transition-all duration-500 ease-out filter brightness-75 contrast-125 saturate-125 dark:brightness-150 dark:contrast-115 md:text-2xl ${
                              isActive ? "w-full" : "dark:group-hover:w-full"
                            }`}
                            style={{
                              backgroundImage: `url(${experienceFillSrc})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            {item.company}
                          </span>
                        </div>

                        <div className="relative mt-1.5 block w-full">
                          <span className="block truncate text-sm leading-tight text-black dark:text-[color:var(--muted)] md:text-base">
                            {item.role}
                          </span>
                          <span
                            className={`pointer-events-none absolute left-0 top-0 block w-0 overflow-hidden whitespace-nowrap text-sm leading-tight text-[color:var(--foreground)] transition-all duration-500 ease-out filter brightness-75 contrast-125 saturate-125 dark:brightness-150 dark:contrast-115 md:text-base ${
                              isActive ? "w-full" : "dark:group-hover:w-full"
                            }`}
                            style={{
                              backgroundImage: `url(${experienceFillSrc})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            {item.role}
                          </span>
                        </div>
                      </button>

                      {isActive ? (
                        <motion.article
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mx-2 mb-3 mt-2 max-w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 md:hidden"
                        >
                          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">{item.period}</p>
                          <p className="mt-1 text-sm text-[color:var(--muted)]">{item.location}</p>
                          <p className="mt-3 break-words text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">{item.details}</p>
                          <p className="mt-3 break-words border-t border-[var(--border)] pt-3 text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">{item.skills}</p>
                        </motion.article>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="relative hidden min-h-[380px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:col-span-7 md:block md:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`experience-bg-${activeExperienceBgSrc}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeExperienceBgSrc}
                      alt={`Experience background ${activeExperienceIndex + 1}`}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 55vw"
                      onLoadingComplete={() => setIsExperienceBgLoaded(true)}
                      className={`object-cover transition-opacity duration-500 ${
                        isExperienceBgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-black/45 transition-opacity duration-500 ${
                        isExperienceBgLoaded ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/78 via-black/62 to-black/70" />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={`experience-detail-${activeExperienceIndex}`}
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-5 rounded-xl border border-white/15 bg-black/35 p-4 text-white backdrop-blur-[2px] md:inset-7 md:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-hkbold text-xs uppercase tracking-[0.18em] text-white/75">
                        {`${activeExperienceIndex + 1}`.padStart(2, "0")}
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--foreground)]" />
                    </div>
                    <TextAnimate
                      as="h3"
                      animation="slideLeft"
                      by="word"
                      duration={0.32}
                      className="font-hkbold text-2xl leading-tight md:text-3xl"
                    >
                      {experienceTimeline[activeExperienceIndex].company}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.04}
                      duration={0.3}
                      className="mt-1 text-base text-white/88 md:text-lg"
                    >
                      {experienceTimeline[activeExperienceIndex].role}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.08}
                      duration={0.28}
                      className="mt-4 text-xs uppercase tracking-[0.14em] text-white/72"
                    >
                      {experienceTimeline[activeExperienceIndex].period}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.12}
                      duration={0.28}
                      className="mt-2 text-sm text-white/74"
                    >
                      {experienceTimeline[activeExperienceIndex].location}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.16}
                      duration={0.3}
                      className="mt-5 text-base leading-7 text-white/94"
                    >
                      {experienceTimeline[activeExperienceIndex].details}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.2}
                      duration={0.26}
                      className="mt-5 border-t border-white/20 pt-4 text-xs uppercase tracking-[0.14em] text-white/76"
                    >
                      {experienceTimeline[activeExperienceIndex].skills}
                    </TextAnimate>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </section>

          <section id="projects" data-scroll="section" className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pt-24 md:px-8">
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleUnsplashHoverStart("heading-projects")}
              onFocus={() => handleUnsplashHoverStart("heading-projects")}
              onMouseLeave={handleUnsplashHoverEnd}
              onBlur={handleUnsplashHoverEnd}
              className="group relative inline-flex overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  activeUnsplashHoverKey === "heading-projects" && activeUnsplashHoverImage
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {activeUnsplashHoverImage ? (
                  <Image
                    src={activeUnsplashHoverImage}
                    alt="Unsplash background"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 24vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/65" />
              </div>

              <HyperText
                as="h2"
                className={`font-hkbold relative z-10 text-3xl tracking-[0.04em] transition-colors duration-300 md:text-4xl ${
                  activeUnsplashHoverKey === "heading-projects" ? "text-white" : ""
                }`}
                duration={700}
                startOnView
              >
                Projects
              </HyperText>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 md:col-span-5 md:max-h-[620px] md:overflow-y-auto md:p-4 no-scrollbar">
                {projectItems.map((project, index) => {
                  const isActive = index === activeProjectIndex;
                  const projectFillSrc =
                    project.images[0] ||
                    heroPhotos[index % heroPhotos.length];

                  return (
                    <div key={`project-list-${project.title}`}>
                      <button
                        type="button"
                        onMouseEnter={() => handleProjectPreview(index)}
                        onFocus={() => handleProjectPreview(index)}
                        onClick={() => setActiveProjectIndex(index)}
                        className={`group relative w-full max-w-full overflow-hidden border-b border-[var(--border)] px-2 py-3 text-left transition-colors last:border-b-0 hover:bg-[var(--background)]/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)] ${
                          isActive ? "bg-[var(--background)]/75" : ""
                        }`}
                      >
                        <div className="relative block w-full">
                          <span className="font-hkbold block truncate text-xl leading-tight text-black dark:text-[color:var(--muted)] md:text-2xl">
                            {project.title}
                          </span>
                          <span
                            className={`font-hkbold pointer-events-none absolute left-0 top-0 block w-0 overflow-hidden whitespace-nowrap text-xl leading-tight text-[color:var(--foreground)] transition-all duration-500 ease-out filter brightness-75 contrast-125 saturate-125 dark:brightness-150 dark:contrast-115 md:text-2xl ${
                              isActive ? "w-full" : "dark:group-hover:w-full"
                            }`}
                            style={{
                              backgroundImage: `url(${projectFillSrc})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            {project.title}
                          </span>
                        </div>

                        <div className="relative mt-1.5 block w-full">
                          <span className="block truncate text-sm leading-tight text-black dark:text-[color:var(--muted)] md:text-base">
                            {project.award}
                          </span>
                          <span
                            className={`pointer-events-none absolute left-0 top-0 block w-0 overflow-hidden whitespace-nowrap text-sm leading-tight text-[color:var(--foreground)] transition-all duration-500 ease-out filter brightness-75 contrast-125 saturate-125 dark:brightness-150 dark:contrast-115 md:text-base ${
                              isActive ? "w-full" : "dark:group-hover:w-full"
                            }`}
                            style={{
                              backgroundImage: `url(${projectFillSrc})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            {project.award}
                          </span>
                        </div>
                      </button>

                      {isActive ? (
                        <motion.article
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mx-2 mb-3 mt-2 max-w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 md:hidden"
                        >
                          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">{project.event}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">{project.award}</p>
                          <p className="mt-2 break-words text-sm text-[color:var(--muted)]">{project.stack}</p>
                          <p className="mt-3 break-words text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">{project.summary}</p>
                          <div className="mt-4 flex max-w-full flex-wrap gap-2">
                            <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs uppercase tracking-[0.12em]">
                              <Github size={12} /> GitHub
                            </a>
                            <a href={project.devpost} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs uppercase tracking-[0.12em]">
                              <ExternalLink size={12} /> Devpost
                            </a>
                            <a href={project.tryUrl} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs uppercase tracking-[0.12em]">
                              <ExternalLink size={12} /> Try It
                            </a>
                          </div>
                        </motion.article>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="relative hidden min-h-[420px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:col-span-7 md:block md:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`project-bg-${activeProjectBgSrc}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeProjectBgSrc}
                      alt={`${activeProject.title} background`}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/78 via-black/62 to-black/70" />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={`project-detail-${activeProjectIndex}`}
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-5 rounded-xl border border-white/15 bg-black/35 p-4 text-white backdrop-blur-[2px] md:inset-7 md:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-hkbold text-xs uppercase tracking-[0.18em] text-white/75">
                        {`${activeProjectIndex + 1}`.padStart(2, "0")}
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--foreground)]" />
                    </div>

                    <TextAnimate
                      as="h3"
                      animation="slideLeft"
                      by="word"
                      duration={0.32}
                      className="font-hkbold text-2xl leading-tight md:text-3xl"
                    >
                      {activeProject.title}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.04}
                      duration={0.3}
                      className="mt-1 text-base text-white/88 md:text-lg"
                    >
                      {activeProject.event}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.08}
                      duration={0.28}
                      className="mt-3 text-xs uppercase tracking-[0.14em] text-white/72"
                    >
                      {activeProject.award}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.12}
                      duration={0.28}
                      className="mt-4 text-sm text-white/76"
                    >
                      {activeProject.stack}
                    </TextAnimate>
                    <TextAnimate
                      as="p"
                      animation="slideLeft"
                      by="word"
                      delay={0.16}
                      duration={0.3}
                      className="mt-5 text-base leading-7 text-white/94"
                    >
                      {activeProject.summary}
                    </TextAnimate>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/92 transition hover:bg-white/20"
                      >
                        <Github size={13} /> GitHub
                      </a>
                      <a
                        href={activeProject.devpost}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/92 transition hover:bg-white/20"
                      >
                        <ExternalLink size={13} /> Devpost
                      </a>
                      <a
                        href={activeProject.tryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/92 transition hover:bg-white/20"
                      >
                        <ExternalLink size={13} /> Try It
                      </a>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </section>

          <section id="education" data-scroll="section" className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 md:px-8 md:pb-24">
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleUnsplashHoverStart("heading-education")}
              onFocus={() => handleUnsplashHoverStart("heading-education")}
              onMouseLeave={handleUnsplashHoverEnd}
              onBlur={handleUnsplashHoverEnd}
              className="group relative inline-flex overflow-hidden rounded-2xl px-3 py-2 md:px-4 md:py-3"
            >
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  activeUnsplashHoverKey === "heading-education" && activeUnsplashHoverImage
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {activeUnsplashHoverImage ? (
                  <Image
                    src={activeUnsplashHoverImage}
                    alt="Unsplash background"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 24vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/65" />
              </div>

              <HyperText
                as="h2"
                className={`font-hkbold relative z-10 text-3xl tracking-[0.04em] transition-colors duration-300 md:text-4xl ${
                  activeUnsplashHoverKey === "heading-education" ? "text-white" : ""
                }`}
                duration={700}
                startOnView
              >
                Education
              </HyperText>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2" data-stagger="items">
              {educationItems.map((item, index) => {
                const currentTilt = educationTilt[index] ?? { rotateX: 0, rotateY: 0 };

                return (
                  <motion.article
                    key={`${item.school}-${item.dates ?? index}`}
                    data-item="reveal"
                    initial={getEducationInitial(index)}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    animate={{ rotateX: currentTilt.rotateX, rotateY: currentTilt.rotateY }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    whileHover={isMobileViewport ? undefined : { scale: 1.02, y: -4 }}
                    className="relative cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 [transform-style:preserve-3d] will-change-transform"
                    style={{ perspective: 1200 }}
                    data-gsap="inview"
                    role="button"
                    tabIndex={0}
                    onMouseMove={(event) => handleEducationTiltMove(index, event)}
                    onMouseLeave={() => resetEducationTilt(index)}
                    onBlur={() => resetEducationTilt(index)}
                    onClick={() => setActiveEducationModalIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveEducationModalIndex(index);
                      }
                    }}
                  >
                    <h3 className="font-hkbold mt-2 text-xl tracking-[0.02em]">{item.school}</h3>
                    {item.degree ? (
                      <p className="mt-3 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">{item.degree}</p>
                    ) : null}
                    {item.dates ? (
                      <p className="text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">{item.dates}</p>
                    ) : null}
                    <span className="pointer-events-none absolute bottom-3 right-3 text-[color:var(--muted)] dark:text-[color:var(--muted-strong)]" aria-hidden="true">
                      <ExternalLink size={14} />
                    </span>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <AnimatePresence>
            {activeEducationItem ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4"
                onClick={() => setActiveEducationModalIndex(null)}
                role="dialog"
                aria-modal="true"
                aria-label="Education details"
              >
                <motion.div
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setActiveEducationModalIndex(null)}
                    aria-label="Close education details"
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <X size={16} />
                  </button>

                  <h3 className="font-hkbold pr-10 text-2xl tracking-[0.02em]">{activeEducationItem.school}</h3>

                  {activeEducationItem.degree ? (
                    <p className="mt-3 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      {activeEducationItem.degree}
                    </p>
                  ) : null}
                  {activeEducationItem.dates ? (
                    <p className="text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      {activeEducationItem.dates}
                    </p>
                  ) : null}

                  {activeEducationItem.programLine ? (
                    <p className="mt-4 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      {activeEducationItem.programLine}
                    </p>
                  ) : null}
                  {activeEducationItem.gpa ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      University of Texas at Dallas GPA: {activeEducationItem.gpa}
                    </p>
                  ) : null}
                  {activeEducationItem.honors ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Honors: {activeEducationItem.honors.join(", ")}
                    </p>
                  ) : null}
                  {activeEducationItem.studyAbroad ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Study Abroad: {activeEducationItem.studyAbroad}
                    </p>
                  ) : null}
                  {activeEducationItem.coursework ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Relevant Coursework: {activeEducationItem.coursework.join(", ")}
                    </p>
                  ) : null}

                  {activeEducationItem.activities ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Activities and societies: {activeEducationItem.activities}
                    </p>
                  ) : null}
                  {activeEducationItem.grade ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Grade: {activeEducationItem.grade}
                    </p>
                  ) : null}
                  {activeEducationItem.ib ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      IB: {activeEducationItem.ib}
                    </p>
                  ) : null}
                  {activeEducationItem.program ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      {activeEducationItem.program}
                    </p>
                  ) : null}
                  {activeEducationItem.skills ? (
                    <p className="mt-2 text-sm leading-6 text-black dark:text-[color:var(--muted-strong)]">
                      Skills: {activeEducationItem.skills}
                    </p>
                  ) : null}
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <footer data-gsap="inview" className="flex w-full justify-center pb-6 pt-3 md:pb-8">
            <div className="inline-flex items-center gap-2">
              <a
                href={`https://cs.utdring.com/#${webringSiteId}?nav=prev`}
                aria-label="Previous site"
                className="inline-flex h-6 w-6 items-center justify-center text-sm leading-none opacity-80 transition-opacity hover:opacity-100"
              >
                ←
              </a>
              <a
                href={`https://cs.utdring.com/#${webringSiteId}`}
                target="_blank"
                rel="noreferrer"
                aria-label="CS Webring"
                className="inline-flex items-center justify-center transition-opacity hover:opacity-100"
              >
                <img
                  src="https://cs.utdring.com/icon.black.svg"
                  alt="CS Webring"
                  className="h-auto w-5 opacity-100 dark:invert dark:opacity-95"
                />
              </a>
              <a
                href={`https://cs.utdring.com/#${webringSiteId}?nav=next`}
                aria-label="Next site"
                className="inline-flex h-6 w-6 items-center justify-center text-sm leading-none opacity-80 transition-opacity hover:opacity-100"
              >
                →
              </a>
            </div>
          </footer>
        </motion.main>
      )}
    </AnimatePresence>
    </div>
  );
}
