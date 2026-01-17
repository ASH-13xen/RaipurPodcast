import { Mic2, Youtube, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                <Mic2 className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Raipur Podcast
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The voice of innovation in Chhattisgarh. Connecting you with the
              visionaries, creators, and leaders shaping our future.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com/@RaipurPodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white transition-all duration-300 group"
                aria-label="YouTube"
              >
                <Youtube className="size-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-400 hover:text-white transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="size-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="size-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-700 hover:text-white transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4 text-slate-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Latest Episodes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Free Creator Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Startup Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Tech Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  About the Host
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Suggest a Guest
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Sponsorships
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Raipur Podcast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
