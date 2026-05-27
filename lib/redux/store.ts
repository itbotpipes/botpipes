import { configureStore } from "@reduxjs/toolkit";
import careerReducer from "./career/careerSlice";
import testimonialReducer from "./testimonial/testimonialSlice";
import faqReducer from "./faq/faqSlice";
import productReducer from "./product/productSlice";
import blogReducer from "./blogs/blogSlice";
import categoryReducer from "./category/categorySlice";
import galleryReducer from "./gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    career: careerReducer,
    testimonial: testimonialReducer,
    faq: faqReducer,
    product: productReducer,
    blog: blogReducer,
    category: categoryReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
