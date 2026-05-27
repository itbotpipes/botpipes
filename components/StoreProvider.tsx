"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/lib/redux/store";
import { fetchCareers } from "@/lib/redux/career/thunk";
import { fetchTestimonials } from "@/lib/redux/testimonial/thunk";
import { fetchFaqs } from "@/lib/redux/faq/thunk";
import { fetchProducts } from "@/lib/redux/product/thunk";
import { fetchBlogs } from "@/lib/redux/blogs/thunk";
import { fetchCategories } from "@/lib/redux/category/thunk";
import { fetchGalleries } from "@/lib/redux/gallery/thunk";

interface StoreProviderProps {
  children?: ReactNode;
}
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
};

const StoreInitializer: React.FC<StoreProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCareers());
    dispatch(fetchTestimonials());
    dispatch(fetchFaqs());
    dispatch(fetchProducts());
    dispatch(fetchBlogs());
    dispatch(fetchCategories());
    dispatch(fetchGalleries());
  }, [dispatch]);

  return <>{children}</>;
};

export default StoreProvider;
