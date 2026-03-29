import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
