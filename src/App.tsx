import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import AreaPage from "./pages/AreaPage";
import SearchPage from "./pages/SearchPage";
import MealDetailPage from "./pages/MealDetailPage";
import IngredientPage from "./pages/IngredientPage";
import CategoriesPage from "./pages/CategoriesPage";
import CuisinesPage from "./pages/CuisinesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
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
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container py-8 m-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Discover delicious recipes from around the world</p>
          <p>Powered by TheMealDB API</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
