import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Calculator", path: "/calculator" },
    { name: "Destinations", path: "/destinations" },
    { name: "Tips", path: "/tips" },
  ];

  const resources = [
    { name: "Impact Data", path: "/data" },
    { name: "News & Articles", path: "/news" },
    { name: "Community", path: "/community" },
    { name: "Feedback", path: "/feedback" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary-foreground font-bold text-xl mb-4">
              <Leaf className="h-8 w-8 text-nature-accent" />
              <span>EcoTravel</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Promoting sustainable tourism practices and raising awareness about climate change impacts on travel destinations worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-nature-accent transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-nature-accent transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-primary-foreground/80 hover:text-nature-accent transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Join our mission for sustainable travel and climate awareness.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} EcoTravel Initiative. Built with care for our planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;