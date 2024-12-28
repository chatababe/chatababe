// components/CategoryProvider.tsx
"use client"
import { useCategoryNavbar } from "@/store/use-category-navbar";
import React from 'react';

type WithCategory = {
  category?: string;  // Changed from selectedCategory to category
}

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { selectedCategory } = useCategoryNavbar();
  
  return (
    <div className="max-w-screen-2xl">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<WithCategory>, { 
            category: selectedCategory  
          });
        }
        return child;
      })}
    </div>
  );
};