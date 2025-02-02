"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTiktok,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import React, { useEffect } from "react";
import { useGlobalState } from "./GlobalStateContext";
import { gsap } from "gsap/all";

const Footer = () => {
  const { state } = useGlobalState();
  const { isLoading, footerContent } = state;

  const strapiBaseURL =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

  useEffect(() => {
    // library.add(fab);
    const textUnderlineAnimation = () => {
      document.querySelectorAll(".hover-link").forEach((link) => {
        const underline = link.querySelector(".underline");

        // Set initial styles for GSAP to manage transform origin
        gsap.set(underline, { transformOrigin: "left center", scaleX: 0 });

        // Hover start: expand the underline from the left
        link.addEventListener("mouseenter", () => {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "left center", // Ensures the origin is correct for expanding
          });
        });

        // Hover end: contract the underline to the right
        link.addEventListener("mouseleave", () => {
          gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power2.in",
            transformOrigin: "right center", // Shifts the origin to right for contraction
          });
        });
      });
    };

    textUnderlineAnimation();
    window.addEventListener("DOMContentLoaded", textUnderlineAnimation);

    return () => {
      window.removeEventListener("DOMContentLoaded", textUnderlineAnimation);
    };
  }, [isLoading]);

  return (
    <>
      {!isLoading && footerContent && (
        <footer className="bg-primary-foreground pt-[200px] px-[2vw] pb-[2vw] sticky bottom-0 -mt-[200px] ">
          <div className="flex flex-col lg:flex-row gap-[2vh] lg:gap-[7.5vw] justify-start pt-[2vh] pb-[2vh] lg:pt-[5vh] lg:pb-[5vh] 2xl:pt-[15vh] 2xl:pb-[15vh]">
            <div className="flex flex-col justify-center">
              <a
                className="-ml-2 flex items-center rounded-full px-2 font-melodrama text-3xl transition w-auto"
                href="/"
              >
                <img
                  src={`${strapiBaseURL}${footerContent.logo.data.attributes.url}`}
                  alt="la cucina ristorante"
                  loading="eager"
                  className="h-auto w-[10rem] lg:w-[16rem]"
                  width="516"
                  height="516"
                  decoding="async"
                />
              </a>
            </div>
            {/* <div>
              <h2 className="font-primary font-bold uppercase text-[22px] lg:text-[2vw] mt-[1vh] lg:pb-3">
                {footerContent.footerLinks[0].linksCategory}
              </h2>
              <div className="flex flex-col justify-between max-w-[50ch]">
                <ul className="flex flex-col gap-x-8 text-white font-primary font-bold uppercase gap-[0.5vw]">
                  <li className="flex w-auto">
                    <div className="flex flex-col hover-link">
                      <a href="/" className="">
                        About
                      </a>
                      <span className="underline bg-primary text-primary h-[1px]"></span>
                    </div>
                  </li>
                  <li className="flex w-auto">
                    <div className="flex flex-col hover-link">
                      <a href="/" className="">
                        In Store
                      </a>
                      <span className="underline bg-primary text-primary h-[1px]"></span>
                    </div>
                  </li>
                  <li className="flex w-auto">
                    <div className="flex flex-col hover-link">
                      <a href="/" className="">
                        Corporate Events
                      </a>
                      <span className="underline bg-primary text-primary h-[1px]"></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div>
              <h2 className="font-primary font-bold uppercase text-[22px] lg:text-[2vw] mt-[1vh] lg:pb-3">
                {footerContent.footerLinks[1].linksCategory}
              </h2>
              <ul className="flex flex-col gap-x-8 text-white font-primary font-bold uppercase gap-[0.5vw]">
                <li className="flex w-auto">
                  <div className="flex flex-col hover-link">
                    <a href="/" className="">
                      Contact Us
                    </a>
                    <span className="underline bg-primary text-primary h-[1px]"></span>
                  </div>
                </li>
                <li className="flex w-auto">
                  <div className="flex flex-col hover-link">
                    <a href="/" className="">
                      Jobs
                    </a>
                    <span className="underline bg-primary text-primary h-[1px]"></span>
                  </div>
                </li>
                <li className="flex w-auto">
                  <div className="flex flex-col hover-link">
                    <a href="/" className="">
                      Give Your Opinion
                    </a>
                    <span className="underline bg-primary text-primary h-[1px]"></span>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row justify-start items-center text-[30px] gap-[20px] h-[2vw] w-full my-[40px] lg:mt-[2vw] lg:mb-0">
                    <a href="/" aria-label="Instagram">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/" aria-label="Facebook">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="/" aria-label="TikTok">
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                    <a href="/" aria-label="YouTube">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="/" aria-label="LinkedIn">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </div>
                </li>
                
              </ul>
            </div> */}
            {footerContent.footerLinks.map((category) => (
              <div key={category.id}>
                <h2 className="font-primary font-bold uppercase text-[22px] lg:text-[2vw] mt-[1vh] lg:pb-3">
                  {category.linksCategory}
                </h2>
                <ul className="flex flex-col gap-x-8 text-white font-primary font-bold uppercase gap-[0.5vw]">
                  {category.linksList.map((linkItem, index) => {
                    const parts = linkItem.children[0].text.split(", ");
                    const url = parts[0];
                    const text = parts[1];
                    const iconKey = parts[2];
                    // console.log(iconKey);

                    return (
                      <li key={index} className="flex w-auto mb-2">
                        <div className="flex flex-col hover-link">
                          <a href={url} className="flex items-center">
                            {iconKey && (
                              <FontAwesomeIcon
                                icon={iconKey}
                                className="mr-2"
                              />
                            )}
                            {text}
                          </a>
                          <span className="underline bg-primary text-primary h-[1px]"></span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-foreground h-[1px] w-full"></div>
          <ul className="flex flex-row gap-[10px] py-[1vh] text-[12px] lg:text-[18px]">
            <div className="flex flex-row w-full gap-[15px]">
              {footerContent && renderInfoLinks(footerContent.pageLinks)}
            </div>
            {/* <li className="flex w-full justify-end">
              <div className="flex flex-col hover-link">
                <a href="/" className="">
                  {footerContent.pageLinks[3].children[0].text}
                </a>
                <span className="underline bg-primary text-primary h-[1px]"></span>
              </div>
            </li> */}
          </ul>
        </footer>
      )}
    </>
  );
};

const renderInfoLinks = (pageLinks) => {
  return pageLinks.map((linkInfo, index) => {
    const parts = linkInfo.children[0].text.split(", ");
    const href = parts[0].trim(); // Assuming the first part is the href
    const text = parts[1].trim(); // Assuming the second part is the link text
    return (
      <li key={index}>
        <div className="flex flex-col hover-link">
          <a href={href} className="">
            {text}
          </a>
          <span className="underline bg-primary text-primary h-[1px]"></span>
        </div>
      </li>
    );
  });
};

export default Footer;
