import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Browse Events', semtagId: 'nav.browse', semtagTarget: 'events.page' },
    {
      path: '/organizer',
      label: 'Organizer Dashboard',
      semtagId: 'nav.organizer',
      semtagTarget: 'organizer.page',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          data-semtag-id="nav.home"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Eventify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-semtag-id={link.semtagId}
              data-semtag-role="navigation"
              data-semtag-target={link.semtagTarget}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-semtag-id="nav.menu"
          data-semtag-role="toggle"
          data-semtag-action="toggle-menu"
          data-semtag-state={isMenuOpen ? 'open' : 'closed'}
          data-semtag-controls="nav.mobile"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t border-border bg-background"
          data-semtag-id="nav.mobile"
          data-semtag-role="region"
        >
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                data-semtag-id={`${link.semtagId}.mobile`}
                data-semtag-role="navigation"
                data-semtag-target={link.semtagTarget}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
