import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const Index = lazy(() => import("./pages/Index"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AreaPage = lazy(() => import("./pages/AreaPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MealDetailPage = lazy(() => import("./pages/MealDetailPage"));
const IngredientPage = lazy(() => import("./pages/IngredientPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CuisinesPage = lazy(() => import("./pages/CuisinesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/area/:name" element={<AreaPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/meal/:id" element={<MealDetailPage />} />
            <Route path="/ingredient/:name" element={<IngredientPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cuisines" element={<CuisinesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" closeButton richColors />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
);

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t bg-card/50 backdrop-blur-sm">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
              </div>
              <span className="font-bold text-lg text-foreground">TastyBites</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover delicious recipes from around the world. Your culinary adventure starts here.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a></li>
              <li><a href="/cuisines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cuisines</a></li>
              <li><a href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Search</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">About</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">Powered by TheMealDB</span></li>
              <li><span className="text-sm text-muted-foreground">&copy; {currentYear} TastyBites</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Made with passion for food lovers everywhere.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>All recipes sourced from TheMealDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
