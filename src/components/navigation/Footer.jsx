import { Link } from 'react-router-dom';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import { FaSpotify, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SA_CITIES, EVENT_CATEGORIES } from '../../constants';

const Footer = () => (
  <footer className="bg-[#0F172A] border-t border-white/10 mt-20">
    <div className="content-max px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D6D] to-[#7C5CFF] flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="font-display font-bold text-white text-xl">Pulse <span className="text-[#FF4D6D]">SA</span></span>
          </Link>
          <p className="text-sm text-[#B6BDC9] leading-relaxed mb-5">
            South Africa's premier event discovery platform. Find, save, and experience the best events across the country.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: FaTiktok, href: '#', label: 'TikTok' },
              { icon: FaYoutube, href: '#', label: 'YouTube' },
              { icon: FaSpotify, href: '#', label: 'Spotify' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#B6BDC9] hover:text-white hover:bg-[#FF4D6D] transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div>
          <h4 className="font-semibold text-white mb-4">Popular Cities</h4>
          <ul className="space-y-2">
            {SA_CITIES.slice(0, 7).map(city => (
              <li key={city}>
                <Link to={`/events?city=${city}`} className="text-sm text-[#B6BDC9] hover:text-[#FF4D6D] transition-colors flex items-center gap-1.5">
                  <MdLocationOn size={14} /> {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-white mb-4">Categories</h4>
          <ul className="space-y-2">
            {EVENT_CATEGORIES.slice(0, 7).map(cat => (
              <li key={cat.id}>
                <Link to={`/events?category=${cat.id}`} className="text-sm text-[#B6BDC9] hover:text-[#FF4D6D] transition-colors flex items-center gap-1.5">
                  <span>{cat.icon}</span> {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 mb-6">
            {['About Us', 'Careers', 'Press', 'Blog', 'Help Center', 'Privacy Policy', 'Terms of Service'].map(item => (
              <li key={item}>
                <Link to="#" className="text-sm text-[#B6BDC9] hover:text-[#FF4D6D] transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a href="mailto:hello@pulsesa.co.za" className="flex items-center gap-2 text-sm text-[#B6BDC9] hover:text-white transition-colors">
              <MdEmail size={16} /> hello@pulsesa.co.za
            </a>
            <a href="tel:+27110000000" className="flex items-center gap-2 text-sm text-[#B6BDC9] hover:text-white transition-colors">
              <MdPhone size={16} /> +27 11 000 0000
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#B6BDC9]">© {new Date().getFullYear()} Pulse SA. All rights reserved.</p>
        <div className="flex items-center gap-1 text-sm text-[#B6BDC9]">
          <span>Made with</span>
          <span className="text-[#FF4D6D]">♥</span>
          <span>in South Africa</span>
          <span className="ml-1">🇿🇦</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
