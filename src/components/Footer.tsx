import { Link } from "react-router-dom";
import { Target, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-primary">Hirescout</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered mock interviews designed for students. Practice, improve, and ace your next opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/demo" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Demo
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <div className="space-y-2">
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              <a 
                href="mailto:support@hirescout.io" 
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@hirescout.io</span>
              </a>
              <div className="flex space-x-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hirescout. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;