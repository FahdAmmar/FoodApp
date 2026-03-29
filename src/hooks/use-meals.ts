import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useSearchMeals = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: () => api.searchMeals(query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
    staleTime: 30 * 60 * 1000,
  });

export const useRandomMeal = () =>
  useQuery({
    queryKey: ["randomMeal"],
    queryFn: api.getRandomMeal,
    staleTime: 10 * 60 * 1000,
  });

export const useMealById = (id: string) =>
  useQuery({
    queryKey: ["meal", id],
    queryFn: () => api.getMealById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });

export const useMealsByCategory = (category: string) =>
  useQuery({
    queryKey: ["category", category],
    queryFn: () => api.filterByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000,
  });

export const useMealsByArea = (area: string) =>
  useQuery({
    queryKey: ["area", area],
    queryFn: () => api.filterByArea(area),
    enabled: !!area,
    staleTime: 10 * 60 * 1000,
  });

export const useMealsByIngredient = (ingredient: string) =>
  useQuery({
    queryKey: ["ingredient", ingredient],
    queryFn: () => api.filterByIngredient(ingredient),
    enabled: !!ingredient,
    staleTime: 10 * 60 * 1000,
  });

export const useAreas = () =>
  useQuery({
    queryKey: ["areas"],
    queryFn: api.listAreas,
    staleTime: 30 * 60 * 1000,
  });
