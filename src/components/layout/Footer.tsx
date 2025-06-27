import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground">ChowNow Express</span>
            </div>
            <p className="text-sm">Your favorite local food, delivered fast.</p>
          </div>
          
          {/* Link Columns */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
                <Link to="/careers" className="text-sm hover:text-primary transition-colors">Careers</Link>
                <Link to="/press" className="text-sm hover:text-primary transition-colors">Press</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
                <Link to="/faq" className="text-sm hover:text-primary transition-colors">FAQ</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/terms-of-service" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} ChowNow Express. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            {/* Social media links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;