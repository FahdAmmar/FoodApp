import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Search, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/cuisines", label: "Cuisines" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-background/50 backdrop-blur-md"
      )}
    >
      <div className="container-wide flex h-16 items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <motion.div
            whileHover={{ rotate: -10, scale: 1.05 }}
            className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <ChefHat className="h-5 w-5 text-white" />
          </motion.div>
          <span className="hidden sm:inline font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            TastyBites
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="flex-1 max-w-md ml-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50 border-border/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary text-sm rounded-xl transition-all"
            />
          </div>
        </form>

        <ThemeToggle />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-xl">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-l border-border/50">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex items-center gap-2.5 mt-6 mb-8">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ChefHat className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">TastyBites</span>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-all",
                    isActive(link.to)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
