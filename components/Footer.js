import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">BACHLAY</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your premier destination for elegant ladies' fashion, jewelry, cosmetics, and accessories.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/category/abayas" className="hover:text-white transition-colors duration-200">
                  Abayas
                </Link>
              </li>
              <li>
                <Link href="/category/jewelry" className="hover:text-white transition-colors duration-200">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics" className="hover:text-white transition-colors duration-200">
                  Cosmetics
                </Link>
              </li>
              <li>
                <Link href="/category/perfumes" className="hover:text-white transition-colors duration-200">
                  Perfumes
                </Link>
              </li>
            </ul>
          </div>

      

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+971 (55) 936-8028</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@bachlay.ae</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 BACHLAY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
