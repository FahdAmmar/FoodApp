import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm text-muted-foreground flex-wrap", className)}>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors p-1 -ml-1 rounded-lg hover:bg-muted/50"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition-colors px-1.5 py-0.5 rounded-md hover:bg-muted/50">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium px-1.5">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
