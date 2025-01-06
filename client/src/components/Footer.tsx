import Logo from "../assets/logo.png";
import { Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#08286b] text-white">
        <div className="mx-auto w-full max-w-screen-2xl p-4 py-4 md:py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <a href="/">
                  <img
                    src={Logo}
                    className="h-8 md:h-10 lg:h-12"
                    alt="MentG Logo"
                  />
                </a>
              </div>
              <address className="flex text-white not-italic mt-4 md:mt-6 lg:mt-9">
                <MapPin size={20} className="mr-2 text-white" /> Mumbai, India
              </address>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-20 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 md:mb-6 text-sm font-semibold uppercase">
                  Company
                </h2>
                <ul className="text-white text-sm md:text-base font-medium">
                  <li className="mb-2 md:mb-4">
                    <a href="/about" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li className="mb-2 md:mb-4">
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li className="mb-2 md:mb-4">
                    <a href="/privacy" className="hover:underline">
                      Terms and Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 md:mb-6 text-sm font-semibold uppercase">
                  Platform
                </h2>
                <ul className="text-white text-sm md:text-base font-medium">
                  <li className="mb-2 md:mb-4">
                    <a href="#" className="hover:underline">
                      Pricing
                    </a>
                  </li>
                  <li className="mb-2 md:mb-4">
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li className="mb-2 md:mb-4">
                    <a href="#" className="hover:underline">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-2 md:my-4 lg:my-8 border-gray-200 sm:mx-auto" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <span className="text-xs md:text-sm text-gray-400 text-left">
              © 2024{" "}
              <a href="/" className="hover:underline">
                MentG™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex space-x-4 md:space-x-6">
              <a
                href="https://www.linkedin.com/company/mentg/"
                className="text-white hover:text-black transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/mentg.in/"
                className="text-white hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
