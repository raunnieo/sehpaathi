import React from "react";

function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "Twitter", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section with logo and company name */}
        <div className="flex items-center mb-8">
          <div className="mr-4">
            <img
              src="src\assets\logo.png"
              alt="SEHPAATHI Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="font-bold text-lg">SEHPAATHI</div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-slate-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} SEHPAATHI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
