import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-10 px-4 font-oswald max-w-7xl mx-auto">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20">
        {/* Pages Section */}
        <div>
          <div className="flex flex-col items-start gap-2 w-auto">
            <h2 className="text-lg text-primary font-bold mb-2">Pages</h2>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/pages/artist" className="hover:text-primary">
              Artist
            </Link>
            <Link href="/pages/program" className="hover:text-primary">
              Program
            </Link>
            <Link href="/pages/booking" className="hover:text-primary">
              Booking
            </Link>
            <Link href="/pages/info" className="hover:text-primary">
              Info
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col">
          <h2 className="text-lg text-primary font-bold mb-2">Contact</h2>
          <Link href="tel:+4512345678" className="hover:text-primary">
            Tel: +45 12 34 56 78
          </Link>
          <Link href="mailto:foofest@info.dk" className="hover:text-primary">
            Mail: Foofest@info.dk
          </Link>
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 rounded-lg pointer-events-none"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.6965400706226!2d37.60481267691555!3d55.76377357308834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5aaea55555%3A0x799d9c88d68b6abe!2sTverskaya%20St%2C%2012%2C%20Moskva%2C%20Rusland%2C%20125009!5e0!3m2!1sda!2sdk!4v1733402670162!5m2!1sda!2sdk"
              width="100%"
              height="200"
              style={{ marginTop: 10, border: "0" }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex flex-col">
          <h2 className="text-lg text-primary font-bold mb-2">Social</h2>
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit hover:text-primary transition duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit hover:text-primary transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit hover:text-primary transition duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit hover:text-primary transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-sm text-center mt-8 text-gray-400">
        © 2024 My Company. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
