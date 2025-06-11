import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-rose-400 mb-4">Elegance</h3>
            <p className="text-gray-300 mb-4">
              Your premier destination for elegant ladies' fashion, jewelry, cosmetics, and accessories.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-rose-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-rose-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-rose-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/category/abayas" className="hover:text-rose-400">
                  Abayas
                </Link>
              </li>
              <li>
                <Link href="/category/jewelry" className="hover:text-rose-400">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics" className="hover:text-rose-400">
                  Cosmetics
                </Link>
              </li>
              <li>
                <Link href="/category/perfumes" className="hover:text-rose-400">
                  Perfumes
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-rose-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-rose-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-rose-400">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@elegance.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Fashion St, Style City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
