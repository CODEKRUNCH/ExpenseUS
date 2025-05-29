import React, { PureComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Example from '../components/Graph';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set initial state to true

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  gsap.registerPlugin(ScrollTrigger);
    const animationContainer = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // MatchMedia Animations
    const mm = gsap.matchMedia();

    function createAnimation(config) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: animationContainer.current,
          start: config.start || "top 40%",
          end: config.end || "bottom 70%",
          scrub: 1.5,
          ease: "power2.inOut",
          markers: false,
        },
      });

      tl.to("#factoringApp", { y: config.appY || 155, duration: 2, ease: "power2.out" });

      tl.to(["#submitInvoice", "#fuelCard", "#summary"], {
        x: (i) => config.firstGroupX[i],
        y: (i) => config.firstGroupY[i],
        duration: 2.5,
        stagger: 0.2,
        ease: "power2.inOut",
      }, "<0.3");

      tl.to(["#ar", "#reserve", "#invoice"], {
        x: (i) => config.secondGroupX[i],
        y: (i) => config.secondGroupY[i],
        duration: 3,
        stagger: 0.2,
        ease: "power3.inOut",
      }, "<0.5");

      return tl;
    }

    mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
      createAnimation({
        start: "top 50%",
        end: "bottom 80%",
        appY: 70,
        firstGroupX: [-203, 220, 357],
        firstGroupY: [200, 200, -60],
        secondGroupX: [148, -300, -355],
        secondGroupY: [170, 400, 120],
      })
    );

    mm.add("(min-width: 1024px) and (max-width: 1279px)", () =>
      createAnimation({
        start: "top 45%",
        end: "bottom 75%",
        appY: 160,
        firstGroupX: [-300, 320, 455],
        firstGroupY: [340, 340, 40],
        secondGroupX: [195, -350, -453],
        secondGroupY: [340, 440, 300],
      })
    );

    mm.add("(min-width: 1280px) and (max-width: 1439px)", () =>
      createAnimation({
        appY: 155,
        firstGroupX: [-400, 420, 555],
        firstGroupY: [405, 400, 80],
        secondGroupX: [245, -490, -550],
        secondGroupY: [420, 530, 365],
      })
    );

    mm.add("(min-width: 1440px)", () =>
      createAnimation({
        appY: 385,
        firstGroupX: [-500, 505, 712],
        firstGroupY: [876, 1000, 530],
        secondGroupX: [295, -635, -652],
        secondGroupY: [1000, 1050, 860],
      })
    );

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
    });

    // Image cycling logic
    const images = [
      "./images/1.png",
      "./images/2.png",
      "./images/3.png",
      // Add the rest of your images here
    ];

    let index = 0;
    const imageInterval = setInterval(() => {
      if (mobileImageRef.current) {
        mobileImageRef.current.src = images[index];
      }
      index = (index + 1) % images.length;
    }, 3500);

    // Cleanup
    return () => {
      lenis.destroy();
      mm.revert();
      clearInterval(imageInterval);
    };
  }, []);

  // Tab Button Handler
  const handleTabClick = (e) => {
    const button = e.currentTarget;
    const content = button.nextElementSibling;
    const icon = button.querySelector("svg");

    const allContents = document.querySelectorAll(".tab-content");
    const allIcons = document.querySelectorAll(".tab-btn svg");

    if (content.classList.contains("hidden")) {
      allContents.forEach((el) => el.classList.add("hidden"));
      allIcons.forEach((i) => i.classList.remove("rotate-180"));

      content.classList.remove("hidden");
      icon.classList.add("rotate-180");
    } else {
      content.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  };


  return (
    <>
      <header
      class="flex justify-between items-center shadow-md rounded-full p-3 mx-4 fixed top-5 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm"
    >
      <div class="container mx-auto flex justify-between items-center">
        {/* <!-- Logo --> */}
        <a href="index.html" class="logo w-48 py-1">
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="0 0 456.82 52.14"
            viewBox="0 0 456.82 52.14"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="presentation"
            aria-hidden="true"
            aria-label=""
          >
            <g>
              <path
                d="M8.84 1.03h30.33l-.83 4.64H13.51l-3.23 18.3h21.39l-.83 4.64H9.46L5.51 51.1H0z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M54.04.69h5.33L69.62 51.1h-5.54l-7.43-39.06c-.16-.87-.3-1.73-.43-2.56-.13-.84-.22-1.67-.29-2.49h-.34c-.34.83-.72 1.66-1.12 2.49s-.83 1.69-1.29 2.56L31.83 51.1h-5.71zM38.7 33.01h24.55l.93 4.57H36.12z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M77.48 24.66c1.4-7.84 4.43-13.91 9.1-18.21Q93.57 0 102.42 0c8.85 0 9.8 1.57 12.55 4.71q4.125 4.71 3.3 12l-.03.34h-5.5l.03-.34c.37-3.58-.37-6.46-2.22-8.65s-4.84-3.29-8.99-3.29c-4.36 0-8.24 1.69-11.66 5.07s-5.7 8.32-6.84 14.81l-.48 2.82c-1.12 6.33-.58 11.22 1.63 14.68s5.51 5.19 9.89 5.19 7.73-1.19 10.25-3.58c2.52-2.38 4.22-5.17 5.09-8.36l.1-.34h5.5l-.1.34c-1.28 4.66-3.75 8.6-7.41 11.85-3.66 3.24-8.42 4.87-14.29 4.87s-10.42-2.14-13.58-6.41c-3.16-4.28-4.05-10.36-2.65-18.24l.48-2.82Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M123.99 1.03h38.51l-.83 4.64h-16.5l-8.01 45.43h-5.5l8.01-45.43h-16.51z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M161.73 24.66c1.4-7.84 4.43-13.91 9.1-18.21S180.9 0 187.04 0s10.76 2.15 13.93 6.45c3.16 4.3 4.05 10.37 2.65 18.21l-.48 2.82c-1.38 7.84-4.4 13.91-9.08 18.21q-7.02 6.45-16.2 6.45c-9.18 0-10.79-2.15-13.94-6.45s-4.04-10.37-2.66-18.21l.48-2.82Zm6.74 17.48c2.2 3.47 5.62 5.21 10.25 5.21s8.63-1.74 12.05-5.21c3.43-3.47 5.69-8.36 6.79-14.67l.48-2.82c1.12-6.31.58-11.19-1.63-14.67-2.21-3.47-5.61-5.21-10.2-5.21s-8.66 1.74-12.09 5.21-5.7 8.36-6.83 14.67l-.48 2.82c-1.1 6.31-.55 11.19 1.65 14.67Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M216.9 1.03h15.89c5.3 0 9.12 1.32 11.47 3.96s3.13 6.17 2.35 10.59-2.81 7.98-6.1 10.66-7.58 4.02-12.88 4.02h-10.39l-3.68 20.84h-5.5zm11.52 24.66c4.06 0 7.06-.96 9.01-2.89s3.17-4.33 3.68-7.22c.5-2.89.12-5.27-1.15-7.15s-3.94-2.82-7.99-2.82h-10.39l-3.54 20.08zm.49 2.3 5.36-.65 8.6 23.76h-5.78z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M251.41 24.52c1.45-8.21 4.66-14.34 9.65-18.4S272.1.03 279.23.03c6.53 0 11.44 1.51 14.72 4.54s4.4 6.96 3.37 11.8l-.14.55h-13.27l.07-.41c.39-2.06.02-3.7-1.1-4.92s-3.12-1.82-5.98-1.82-5.23 1-7.29 2.99c-2.06 2-3.49 5.31-4.3 9.94l-1.2 6.74c-.85 4.82-.46 8.19 1.17 10.13q2.445 2.91 7.29 2.91c1.53 0 2.88-.17 4.02-.5 1.15-.33 2.33-.88 3.54-1.63l1.27-7.08h-7.87l1.65-9.42h20.84l-3.68 20.8c-2.2 1.86-5.1 3.57-8.7 5.12-3.6 1.56-7.86 2.34-12.79 2.34-7.64 0-13.23-2.03-16.78-6.09s-4.62-10.19-3.2-18.4l.55-3.1Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M306.79 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M348.83 1.03h14.03l9.94 28.4a20.4 20.4 0 0 1 .89 3.92h.27c.09-.83.18-1.52.28-2.1.09-.57.21-1.27.34-2.1l4.99-28.13h10.9l-8.84 50.07h-14.44l-9.77-27.96c-.25-.69-.42-1.35-.5-1.98s-.17-1.35-.26-2.15h-.27c-.09.83-.19 1.61-.29 2.34q-.15 1.095-.39 2.34l-4.82 27.41h-10.9l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M399.44 1.03h13.17l-8.84 50.07H390.6z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M421.57 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
            </g>
          </svg>
        </a>
        {/* <!-- Desktop Menu --> */}
        <nav class="hidden md:flex space-x-6 items-center text-black">
          <a href="index.html" class="hover:text-blue-500">Features</a>
          <a href="integrations.html" class="hover:text-blue-500"
            >Integrations</a
          >
          <a href="#" class="hover:text-blue-500">Contact Us</a>
          <a href="#" class="hover:text-blue-500">Pricing</a>
          <a
            href="#"
            class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >Demo Your App</a
          >
        </nav>

        {/* <!-- Mobile Menu Button --> */}
        <div class="md:hidden flex items-center" x-data="{ openMenu: false }">
          <button
            @click="openMenu = !openMenu"
            class="text-gray-700 focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* <!-- Mobile Menu --> */}
          <div
            x-show="openMenu"
            x-transition
            class="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 py-2"
          >
            <a
              href="index.html"
              class="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >Features</a
            >
            <a
              href="integrations.html"
              class="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >Integrations</a
            >
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >Contact Us</a
            >
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >Pricing</a
            >
            <a
              href="#"
              class="block bg-blue-500 text-white text-center px-4 py-2 rounded-full hover:bg-blue-600"
              >Demo Your App</a
            >
          </div>
        </div>
      </div>
    </header>

           {/* { Hero Section > */} 
    <section class="hero custom-gradient w-full min-h-screen pt-24 md:pt-24">
            <div class="container mx-auto flex flex-col">
                {/* < />!-- Heading Section --> */}
                <div class="text-center px-8 flex flex-col items-center justify-center section-heading mt-20 mb-0">
                    <h1 class="hero-text font-bold text-black md:px-16 xl:px-40 lg:px-16 2xl:px-44 mb-4">
                        The Free App for Freight Factors
                    </h1>
                    <h4 class="text-black font-semibold text-1xl sm:text-2xl mb-6">
                        White Labeled for Your Company
                    </h4>
                    <a href="#" class="mt-4 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition">Demo Your App</a>
                </div>

                {/* < />!-- Mobile Screen Section --> */}
                <div class="relative">
                    <div class="min-h-[113vh] section-mobile-screen" id="animationContainer">
                        <div
                            class="bg-white md:w-[320px] h-full absolute top-24 left-1/2 -translate-x-1/2 rounded-3xl mt-20 hidden md:block"
                            id="factoringApp"
                        >
                            <p class="text-center mt-10">Your Factoring App</p>
                        </div>

                        <img
                            src="./images/fuelcardbalance.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] w-40 absolute -top-32 left-24 hidden md:block"
                            id="fuelCard" />
                        <img
                            src="./images/ar.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] absolute top-4 left-70 w-20 hidden md:block"
                            id="ar" />

                        <img
                            src="./images/summary.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] absolute top-40 -left-28 w-[270px] -mt-1 hidden md:block"
                            id="summary" />

                        <img
                            src="./images/submitinvoice.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] absolute top-0 right-24 w-24 hidden md:block"
                            id="submitInvoice" />
                        <img
                            src="./images/reserve.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] absolute top-24 right-48 w-20 hidden md:block"
                            id="reserve" />

                        <img
                            src="./images/invoiceaging.png"
                            alt=""
                            class="rounded-lg drop-shadow-xl shadow-[0px_-2px_15px_rgba(0,0,0,0.2)] absolute top-40 -right-14 w-44 hidden md:block"
                            id="invoice" />
                    </div>

                    {/* < />!-- Description Columns --> */}
                    <div class="flex lg:container mx-auto mt-10">
                        {/* < />!-- 3 columns --> */}
                        <div class="w-full md:w-1/3 p-4 hidden lg:block lg:ml-12">
                            <h3 class="text-4xl font-bold">
                                Branded Modern Solutions Built for Retention
                            </h3>
                        </div>
                        <div class="w-full md:w-1/3 p-0">
                            <img
                                src="images/PhoneCase-size.png"
                                alt="Phone Case"
                                class="z-10 absolute md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-64 hidden md:block"
                                id="phoneCase" />
                            <img
                                src="images/mobile-frame.png"
                                alt="Phone Case"
                                class="z-10 absolute md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block md:hidden" />
                        </div>
                        <div class="w-full md:w-1/3 p-4 hidden lg:block lg:mr-12 text-lg">
                            <p class="mb-4">
                                FactorGenie’s white-label platform provides a fully branded mobile
                                app to enhance client retention and streamline operations.
                            </p>
                            <p>
                                Stand out from competitors and give your clients the digital tools
                                they expect, without the high cost of custom development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div
            class="conatiner mx-auto p-4 flex flex-col gap-4 text-center lg:hidden"
        >
                <div class="w-full">
                    <h3 class="text-3xl font-bold">
                        Branded Modern Solutions Built for Retention
                    </h3>
                </div>
                <div class="w-full">
                    <p class="mb-4">
                        FactorGenie’s white-label platform provides a fully branded mobile app
                        to enhance client retention and streamline operations.
                    </p>
                    <p>
                        Stand out from competitors and give your clients the digital tools
                        they expect, without the high cost of custom development.
                    </p>
                </div>
            </div>
            {/* -- Scrolling Logos Section --> */}
    <>
    <div class="container mx-auto py-8 text-center relative z-10">
            <h3 class="text-4xl font-bold">
                Brands <span class="text-blue-500">Powered By FactorGenie</span>
            </h3>
        </div><div class="overflow-hidden flex space-x-8 mb-10">
                <div class="flex space-x-8 animate-scroll">
                    <img src="images/brands/fina.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/lm.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/mf.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/of.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/pcg.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/porter.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/seven.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/tetra.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/thunder.png" class="max-w-40" alt="Logo" />
                </div>
               {/* - Duplicate for seamless scrolling --> */}
                <div class="flex space-x-8 animate-scroll" aria-hidden="true">
                    <img src="images/brands/fina.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/lm.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/mf.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/of.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/pcg.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/porter.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/seven.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/tetra.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/thunder.png" class="max-w-40" alt="Logo" />
                </div>
            </div>
            </>
           {/* - Dual Background Section --> */}
    <section class="w-full flex flex-col md:flex-row">
            <div
                class="w-full md:w-[55%] bg-white p-8 flex justify-center items-center"
            >
                <div class="md:mx-20">
                    <h1 class="text-2xl sm:text-3xl md:text-5xl font-bold">
                        Free Broker Credit Report Databases
                    </h1>
                    <p class="mt-4">
                        Save money on Ansonia costs by using the FactorGenie Broker Credit
                        Report Database
                    </p>
                </div>
            </div>
            <div
                class="w-full md:w-[45%] bg-gradient-to-br from-[#1896ef] via-[#fad9c8] to-[#f476a3] p-14 text-center text-white"
            >
                <img
                    src="images/creditbroker.png"
                    alt="Credit Report"
                    class="w-full md:-ml-32 shadow-lg rounded-lg" />
            </div>
        </section>
        {/* !-- gray Background Section -- */}
    <section
            class="w-full flex flex-col md:flex-row bg-gradient-to-t from-gray-200 to-white"
        >
            <div class="w-full md:w-[45%] p-0 text-right">
                <div class="mobile-frame relative mx-auto overflow-hidden">
                    {/* < />!-- Mobile Frame --> */}
                    <img
                        src="images/phone-frame.png"
                        alt="Phone Frame"
                        class="w-full h-auto object-cover relative z-10" />
                    {/* < />!-- Changing Image (Inside Screen) --> */}
                    <div
                        class="absolute top-5 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                    >
                        <video
                            autoplay
                            loop
                            muted
                            playsinline
                            class="w-full h-full object-top"
                        >
                            <source src="./images/file.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-[55%] p-8 md:mr-10 flex flex-col justify-center">
                <h1 class="text-2xl md:text-4xl font-bold">
                    Real-Time Status Tracking
                </h1>
                <p class="mt-4">
                    Stay informed at every step. FactorGenie provides real-time updates on
                    funding requests, so clients always know where they stand—no calls or
                    emails needed.
                </p>
            </div>
        </section>
        {/* !--Self-Serve Funding Requests Section --> */}
    <div class="container mx-auto py-8 text-center">
            <h3 class="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span class="text-blue-500">Self-Serve </span>Funding Requests
            </h3>
            <p class="my-4 text-lg px-4">
                Funding requests are effortless with in-app document scanning, batch
                invoicing, and a seamless submission process—all in just a few taps
            </p>
            <div class="flex flex-col md:flex-row justify-center mt-4 mb-10">
                {/* < />!-- 3 columns --> */}
                <div class="w-full md:w-1/3 p-0">
                    <div class="mobile-frame relative mx-auto">
                        {/* < />!-- Mobile Frame --> */}
                        <img
                            src="images/phone-frame.png"
                            alt="Phone Frame"
                            class="w-full h-auto object-cover relative z-10" />
                        <div
                            class="absolute top-6 sm:top-8 md:top-6 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                        >
                            <img
                                src="./images/94a96b_62383df2a53d415badcba2b0fdeae8d0~mv2.png"
                                class="w-full object-cover"
                                alt="Mobile Screen" />
                        </div>
                    </div>
                    <div class="lg:mx-10 mt-2 px-4">
                        <h3 class="text-xl font-bold">In-App Document Scanning</h3>
                        <p>
                            Scanner autocorrects perspective and lighting for increased
                            document legibility
                        </p>
                    </div>
                </div>
                {/* < />!-- 3 columns --> */}
                <div class="w-full md:w-1/3 p-0">
                    <div class="mobile-frame relative mx-auto">
                        {/* < />!-- Mobile Frame --> */}
                        <img
                            src="images/phone-frame.png"
                            alt="Phone Frame"
                            class="w-full h-auto object-cover relative z-10" />
                        <div
                            class="absolute top-6 sm:top-8 md:top-6 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                        >
                            <img
                                src="./images/94a96b_43fab95a1f794632b93321c88a72ce5a~mv2.png"
                                class="w-full object-cover"
                                alt="Mobile Screen" />
                        </div>
                    </div>
                    <div class="lg:mx-10 mt-2 px-4">
                        <h3 class="text-xl font-bold">Streamlined Funding Requests</h3>
                        <p>
                            Your clients request load and fuel funding in just a few taps from
                            their mobile device.
                        </p>
                    </div>
                </div>
                {/* < />!-- 3 columns --> */}
                <div class="w-full md:w-1/3 p-0">
                    <div class="mobile-frame relative mx-auto overflow-hidden">
                        {/* < />!-- Mobile Frame --> */}
                        <img
                            src="images/phone-frame.png"
                            alt="Phone Frame"
                            class="w-full h-auto object-cover relative z-10" />
                        <div
                            class="absolute top-6 sm:top-8 md:top-6 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                        >
                            <img
                                src="./images/94a96b_e8f9aceb84b547e88c7a0fd0d7a5034d~mv2.png"
                                class="w-full object-cover"
                                alt="Mobile Screen" />
                        </div>
                    </div>
                    <div class="lg:mx-10 mt-2 px-4">
                        <h3 class="text-xl font-bold">Multiple Load Batching</h3>
                        <p>
                            Enable your clients to easily make multiple funding requests in
                            bulk.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {/* !-- gray Background Section --> */}
        <section
            class="w-full flex flex-col md:flex-row bg-gradient-to-t from-white to-gray-200"
        >
            <div class="w-full md:w-[55%] p-8 md:ml-14 flex flex-col justify-center">
                <h1 class="text-2xl md:text-4xl font-bold">
                    Promote In-Network Fueling
                </h1>
                <p class="mt-4">
                    Boost fuel card usage and revenue while giving clients the tools they
                    need. FactorGenie’s fuel discount finder helps clients save at
                    preferred locations, while monitoring in-app card usage keeps them in
                    control of their spending.
                </p>
            </div>
            <div class="w-full md:w-[45%] p-0 text-center">
                <div class="mobile-frame relative mx-auto">
                    {/* < />!-- Mobile Frame --> */}
                    <img
                        src="images/phone-frame.png"
                        alt="Phone Frame"
                        class="w-full h-auto object-cover relative z-10" />
                    <div
                        class="absolute top-5 sm:top-6 md:top-9 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                    >
                        <img
                            src="./images/94a96b_62383df2a53d415badcba2b0fdeae8d0~mv2.png"
                            class="w-full object-cover"
                            alt="Mobile Screen" />
                    </div>
                </div>
            </div>
        </section>
        {/* !--Smarter Factoring Section --> */}
    <div class="container mx-auto py-8 text-center px-4">
            <h3 class="text-3xl sm:text-4xl md:text-5xl font-bold">
                More Tools for <span class="text-blue-500"> Smarter Factoring</span>
            </h3>
            <p class="my-4 text-lg">
                FactorGenie goes beyond funding with powerful features to enhance your
                service.
            </p>

            <div
                class="w-full flex flex-col md:flex-row justify-center mt-12 gap-6 border-round"
            >
                {/* < />!-- 4 columns --> */}
                <div
                    class="w-full md:w-1/2 lg:w-1/4 bg-white p-4 sm:pt-8 sm:pb-14 px-6 shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#008ff5"
                        class="w-8 h-8 mx-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                    <h4 class="text-lg font-bold my-3">Reports</h4>
                    <p class="text-gray-700">
                        Clients can easily access multiple reports across all devices.
                    </p>
                </div>
                {/* < />!-- 4 columns --> */}
                <div class="md:w-1/4 bg-white p-4 sm:pt-8 sm:pb-14 px-6 shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#008ff5"
                        class="w-8 h-8 mx-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <h4 class="text-lg font-bold my-3">Notifications</h4>
                    <p class="text-gray-700">
                        Keep clients informed with automated push and in-app notifications.
                    </p>
                </div>
                {/* < />!-- 4 columns --> */}
                <div class="md:w-1/4 bg-white p-4 sm:pt-8 sm:pb-14 px-6 shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#008ff5"
                        class="w-8 h-8 mx-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <h4 class="text-lg font-bold my-3">Load Board</h4>
                    <p class="text-gray-700">
                        Help clients find new opportunities with loads from your
                        prequalified shippers/brokers.
                    </p>
                </div>
                {/* < />!-- 4 columns --> */}
                <div class="md:w-1/4 bg-white p-4 sm:pt-8 sm:pb-14 px-6 shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#008ff5"
                        class="w-8 h-8 mx-auto"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    <h4 class="text-lg font-bold my-3">Fleet Portal</h4>
                    <p class="text-gray-700">
                        Clients get full account access through a user-friendly web portal
                        designed for back-office staff.
                    </p>
                </div>
            </div>
        </div>
        {/* < /></>!-- Scrolling Logos Section --> */}
        <>
    <div class="container mx-auto py-8 text-center">
            <h3 class="text-4xl font-bold">
                Connect With Your <span class="text-blue-500"> Essential Tools</span>
            </h3>
        </div><div class="overflow-hidden flex space-x-8">
                <div class="flex space-x-8 animate-scroll">
                    <img src="images/brands/fina.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/lm.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/mf.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/of.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/pcg.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/porter.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/seven.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/tetra.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/thunder.png" class="max-w-40" alt="Logo" />
                </div>
                {/* < />!-- Duplicate for seamless scrolling --> */}
                <div class="flex space-x-8 animate-scroll" aria-hidden="true">
                    <img src="images/brands/fina.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/lm.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/mf.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/of.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/pcg.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/porter.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/seven.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/tetra.png" class="max-w-40" alt="Logo" />
                    <img src="images/brands/thunder.png" class="max-w-40" alt="Logo" />
                </div>
            </div><div class="container mx-auto py-8 px-4">
                <h3 class="text-4xl font-bold text-center">Frequently Asked Questions</h3>
                <div class="flex flex-col gap-4 mt-10 md:mx-12">
                    {/* < />!-- Tab 1 --> */}
                    <div>
                        <button
                            class="bg-blue-500 rounded-2xl w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none tab-btn"
                        >
                            <span class="font-semibold"
                            >Does FactorGenie replace my current FMS factoring software?</span>
                            <svg
                                class="w-5 h-5 transition-transform transform rotate-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div class="tab-content hidden p-4 text-gray-700">
                            No, we integrate with and upgrade your current Factoring Management
                            System (FMS). You don’t have to migrate your data or retrain your
                            staff.
                        </div>
                    </div>

            
                    {/* !-- Tab 2 --> */}
                    <div>
                        <button
                            class="bg-blue-500 rounded-2xl w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none tab-btn"
                        >
                            <span class="font-semibold">Do you offer a fuel card?</span>
                            <svg
                                class="w-5 h-5 transition-transform transform rotate-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div class="tab-content hidden p-4 text-gray-700">
                            No, we integrate any of your existing fuel card programs into your
                            app, increasing your card sign-ups and gallons pumped.
                        </div>
                    </div>
                    {/* < />!-- Tab 3 --> */}
                    <div>
                        <button
                            class="bg-blue-500 rounded-2xl w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none tab-btn"
                        >
                            <span class="font-semibold">How soon can I launch my app?</span>
                            <svg
                                class="w-5 h-5 transition-transform transform rotate-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div class="tab-content hidden p-4 text-gray-700">
                            Most apps are ready to be launched within 5 days.
                        </div>
                    </div>
                    {/* < />!-- Tab 4 --> */}
                    <div>
                        <button
                            class="bg-blue-500 rounded-2xl w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none tab-btn"
                        >
                            <span class="font-semibold"
                            >Do you help me market the app to my clients?</span>
                            <svg
                                class="w-5 h-5 transition-transform transform rotate-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div class="tab-content hidden p-4 text-gray-700">
                            Yes, we provide landing pages and marketing materials.
                        </div>
                    </div>
                    {/* < />!-- Tab 5 --> */}
                    <div>
                        <button
                            class="bg-blue-500 rounded-2xl w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none tab-btn"
                        >
                            <span class="font-semibold"
                            >Do you provide tutorials to help truckers use the app?</span>
                            <svg
                                class="w-5 h-5 transition-transform transform rotate-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div class="tab-content hidden p-4 text-gray-700">
                            Sure, but it's so simple, you won't need them!
                        </div>
                    </div>
                </div>
            </div>
            {/* < /></>!-- Dual Background Section --> */}
    <section class="w-full flex flex-col md:flex-row">
            <div
                class="w-full md:w-1/2 bg-white p-8 text-center flex flex-col justify-center items-center"
            >
                <h1 class="text-5xl font-bold lg:mx-10">
                    See Your Custom App In Action
                </h1>
                <p class="my-4 font-semibold">
                    Contact us to schedule a demo of FactorGenie
                </p>
                <a
                    href="#"
                    class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
                >Demo Your App</a>
            </div>
            <div class="w-full md:w-1/2 custom-gradient p-0 text-center text-white">
                <div class="mobile-frame relative mx-auto overflow-hidden">
                    {/* < />!-- Mobile Frame --> */}
                    <img
                        src="images/phone-frame.png"
                        alt="Phone Frame"
                        class="w-full h-auto object-cover relative z-10" />

                    {/* < />!-- Changing Image (Inside Screen) --> */}
                    <div
                        class="absolute top-5 sm:top-6 md:top-9 left-1/2 transform -translate-x-1/2 w-[43%] md:w-[43.5%] overflow-hidden z-0 rounded-lg"
                    >
                        <img
                            id="mobileImage"
                            src="./images/94a96b_360d0498c2514ff2a08edd0a3e8c2cbb~mv2.png"
                            class="w-full object-cover"
                            alt="Mobile Screen" />
                    </div>
                </div>
            </div>
        </section><footer class="px-4 lg:px-8 flex flex-col md:flex-row gap-5 mt-12 pb-10">
                <div class="w-full md:w-1/1 p-4">
                    {/* < />!-- Logo --> */}
                    <svg
                        class="logo w-52 mb-6"
                        preserveAspectRatio="xMidYMid meet"
                        data-bbox="0 0 456.82 52.14"
                        viewBox="0 0 456.82 52.14"
                        xmlns="http://www.w3.org/2000/svg"
                        data-type="color"
                        role="presentation"
                        aria-hidden="true"
                        aria-label=""
                    >
                        <g>
                            <path
                                d="M8.84 1.03h30.33l-.83 4.64H13.51l-3.23 18.3h21.39l-.83 4.64H9.46L5.51 51.1H0z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M54.04.69h5.33L69.62 51.1h-5.54l-7.43-39.06c-.16-.87-.3-1.73-.43-2.56-.13-.84-.22-1.67-.29-2.49h-.34c-.34.83-.72 1.66-1.12 2.49s-.83 1.69-1.29 2.56L31.83 51.1h-5.71zM38.7 33.01h24.55l.93 4.57H36.12z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M77.48 24.66c1.4-7.84 4.43-13.91 9.1-18.21Q93.57 0 102.42 0c8.85 0 9.8 1.57 12.55 4.71q4.125 4.71 3.3 12l-.03.34h-5.5l.03-.34c.37-3.58-.37-6.46-2.22-8.65s-4.84-3.29-8.99-3.29c-4.36 0-8.24 1.69-11.66 5.07s-5.7 8.32-6.84 14.81l-.48 2.82c-1.12 6.33-.58 11.22 1.63 14.68s5.51 5.19 9.89 5.19 7.73-1.19 10.25-3.58c2.52-2.38 4.22-5.17 5.09-8.36l.1-.34h5.5l-.1.34c-1.28 4.66-3.75 8.6-7.41 11.85-3.66 3.24-8.42 4.87-14.29 4.87s-10.42-2.14-13.58-6.41c-3.16-4.28-4.05-10.36-2.65-18.24l.48-2.82Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M123.99 1.03h38.51l-.83 4.64h-16.5l-8.01 45.43h-5.5l8.01-45.43h-16.51z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M161.73 24.66c1.4-7.84 4.43-13.91 9.1-18.21S180.9 0 187.04 0s10.76 2.15 13.93 6.45c3.16 4.3 4.05 10.37 2.65 18.21l-.48 2.82c-1.38 7.84-4.4 13.91-9.08 18.21q-7.02 6.45-16.2 6.45c-9.18 0-10.79-2.15-13.94-6.45s-4.04-10.37-2.66-18.21l.48-2.82Zm6.74 17.48c2.2 3.47 5.62 5.21 10.25 5.21s8.63-1.74 12.05-5.21c3.43-3.47 5.69-8.36 6.79-14.67l.48-2.82c1.12-6.31.58-11.19-1.63-14.67-2.21-3.47-5.61-5.21-10.2-5.21s-8.66 1.74-12.09 5.21-5.7 8.36-6.83 14.67l-.48 2.82c-1.1 6.31-.55 11.19 1.65 14.67Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M216.9 1.03h15.89c5.3 0 9.12 1.32 11.47 3.96s3.13 6.17 2.35 10.59-2.81 7.98-6.1 10.66-7.58 4.02-12.88 4.02h-10.39l-3.68 20.84h-5.5zm11.52 24.66c4.06 0 7.06-.96 9.01-2.89s3.17-4.33 3.68-7.22c.5-2.89.12-5.27-1.15-7.15s-3.94-2.82-7.99-2.82h-10.39l-3.54 20.08zm.49 2.3 5.36-.65 8.6 23.76h-5.78z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M251.41 24.52c1.45-8.21 4.66-14.34 9.65-18.4S272.1.03 279.23.03c6.53 0 11.44 1.51 14.72 4.54s4.4 6.96 3.37 11.8l-.14.55h-13.27l.07-.41c.39-2.06.02-3.7-1.1-4.92s-3.12-1.82-5.98-1.82-5.23 1-7.29 2.99c-2.06 2-3.49 5.31-4.3 9.94l-1.2 6.74c-.85 4.82-.46 8.19 1.17 10.13q2.445 2.91 7.29 2.91c1.53 0 2.88-.17 4.02-.5 1.15-.33 2.33-.88 3.54-1.63l1.27-7.08h-7.87l1.65-9.42h20.84l-3.68 20.8c-2.2 1.86-5.1 3.57-8.7 5.12-3.6 1.56-7.86 2.34-12.79 2.34-7.64 0-13.23-2.03-16.78-6.09s-4.62-10.19-3.2-18.4l.55-3.1Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M306.79 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M348.83 1.03h14.03l9.94 28.4a20.4 20.4 0 0 1 .89 3.92h.27c.09-.83.18-1.52.28-2.1.09-.57.21-1.27.34-2.1l4.99-28.13h10.9l-8.84 50.07h-14.44l-9.77-27.96c-.25-.69-.42-1.35-.5-1.98s-.17-1.35-.26-2.15h-.27c-.09.83-.19 1.61-.29 2.34q-.15 1.095-.39 2.34l-4.82 27.41h-10.9l8.84-50.07Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M399.44 1.03h13.17l-8.84 50.07H390.6z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                            <path
                                d="M421.57 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                                fill="#008ff5"
                                data-color="1"
                            ></path>
                        </g>
                    </svg>
                    <p>© 2025 FactorGenie</p>
                </div>
                <div class="w-full md:w-1/4 flex flex-col px-4">
                    {/* < />!-- links --> */}
                    <a href="index.html">Home</a>
                    <a href="integrations.html">Integrations</a>
                    <a href="#">Contact </a>
                    <a href="#">Schedule a Demo </a>
                </div>
                <div class="w-full md:w-1/4 flex flex-col px-4">
                    <a href="#">Terms & Conditions </a>
                    <a href="#">Privacy Policy</a>
                </div>
            </footer>
            </>
           
  );
}

export default WelcomePage;