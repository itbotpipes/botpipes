"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FormProvider, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useBlogForm, FormDataType } from "./useBlogForm";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import DescriptionEditor from "../../DescriptionEditor";
import { fetchCategories } from "@/lib/redux/category/thunk";
import {
  User,
  Link2,
  Tag,
  FolderOpen,
  AlignLeft,
  Eye,
  Trash,
  ArrowLeft,
  Check,
  CloudUpload,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotionBlogEditorProps {
  submitHandler: (data: FormDataType) => void;
  defaultValues?: BlogRecord;
  onDelete?: () => void;
}

const NotionBlogEditor: React.FC<NotionBlogEditorProps> = ({
  submitHandler,
  defaultValues,
  onDelete,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);
  const { loading } = useSelector((state: RootState) => state.blog);

  // Load categories if not loaded
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const { form, setDescription, handleSubmit } = useBlogForm(
    submitHandler,
    defaultValues
  );

  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // Watch fields for display
  const titleValue = form.watch("title");
  const authorValue = form.watch("author");
  const slugValue = form.watch("slug");
  const excerptValue = form.watch("excerpt");
  const isDraftValue = form.watch("content"); // simple proxy

  const coverImageUrl = form.watch("cover_image_url") as string | File | undefined;
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Setup Cover Image preview
  useEffect(() => {
    if (!coverImageUrl) {
      setCoverPreview(null);
      return;
    }
    if (typeof coverImageUrl === "string") {
      setCoverPreview(coverImageUrl);
    } else if (coverImageUrl instanceof File) {
      const url = URL.createObjectURL(coverImageUrl);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [coverImageUrl]);

  // Sync title to slug automatically on new pages
  useEffect(() => {
    if (!defaultValues && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug, { shouldDirty: true });
    }
  }, [titleValue, form, defaultValues]);

  // Monitor save thunk loading status
  useEffect(() => {
    if (loading) {
      setSavingStatus("saving");
    } else if (savingStatus === "saving") {
      setSavingStatus("saved");
      const timer = setTimeout(() => setSavingStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, savingStatus]);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("cover_image_url", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const removeCover = () => {
    form.setValue("cover_image_url", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Tag helper hook form array
  const tagsValue = form.watch("tags") || [];
  const [newTagInput, setNewTagInput] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const addTag = () => {
    if (newTagInput.trim()) {
      const updated = [...tagsValue, { tag: newTagInput.trim() }];
      form.setValue("tags", updated, { shouldDirty: true });
      setNewTagInput("");
    }
    setIsAddingTag(false);
  };

  const removeTag = (index: number) => {
    const updated = tagsValue.filter((_, i) => i !== index);
    form.setValue("tags", updated, { shouldDirty: true });
  };

  // Category values hook form integration
  const selectedCategories = form.watch("category_ids") || [];
  const currentCategoryValue = selectedCategories[0]?.category || "";

  return (
    <div className="min-h-screen bg-[#191919] text-[#e3e3e3] font-sans antialiased overflow-y-auto">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2c2c2c] bg-[#191919]/90 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-[#8c8c8c] hover:bg-[#252525] hover:text-white transition-all"
            type="button"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </button>
          <span className="text-[#3a3a3a]">/</span>
          <span className="text-sm font-medium text-[#c0c0c0] truncate max-w-[200px]">
            {titleValue || "Untitled"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicators */}
          {savingStatus === "saving" && (
            <span className="text-xs text-[#8c8c8c] animate-pulse">Saving...</span>
          )}
          {savingStatus === "saved" && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <Check size={12} /> Changes saved
            </span>
          )}

          {/* Delete Action (only if editing existing item) */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded p-1.5 text-[#8c8c8c] hover:bg-[#2c1d1d] hover:text-red-500 transition-all"
              type="button"
              title="Delete post"
            >
              <Trash size={16} />
            </button>
          )}

          {/* Save Button */}
          <Button
            onClick={form.handleSubmit(handleSubmit, (err) => {
              console.log("Validation errors:", err);
              const fields = Object.keys(err).map(k => {
                if (k === "cover_image_url") return "Cover Image";
                if (k === "category_ids") return "Category";
                return k.charAt(0).toUpperCase() + k.slice(1);
              }).join(", ");
              alert(`Cannot publish. Please complete the following required fields: ${fields}`);
            })}
            disabled={loading}
            className="bg-[#2eaadc] hover:bg-[#1a93c4] text-white px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all"
          >
            {defaultValues ? "Save Changes" : "Publish Post"}
          </Button>
        </div>
      </header>

      {/* 2. Workspace Body Container */}
      <main className="mx-auto max-w-4xl px-8 py-6">
        <FormProvider {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="mb-6 p-4 rounded bg-red-950/30 border border-red-900/40 text-red-400 text-xs space-y-1">
                <p className="font-semibold mb-1">Please complete all required fields:</p>
                {form.formState.errors.cover_image_url && <p>• Cover image is required</p>}
                {form.formState.errors.title && <p>• Blog title is required</p>}
                {form.formState.errors.author && <p>• Author name is required</p>}
                {form.formState.errors.slug && <p>• Slug is required</p>}
                {form.formState.errors.category_ids && <p>• Category selection is required</p>}
                {form.formState.errors.tags && <p>• At least one tag is required</p>}
                {form.formState.errors.content && <p>• Content body is required</p>}
              </div>
            )}

            {/* Cover Image Area */}
            <div className="relative group w-full mb-8 rounded-lg overflow-hidden border border-[#2d2d2d] bg-[#202020] min-h-[140px] flex flex-col items-center justify-center">
              {coverPreview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverPreview}
                    alt="Cover image"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                    <button
                      onClick={() => coverImageInputRef.current?.click()}
                      className="flex items-center gap-1.5 bg-[#2b2b2b] hover:bg-[#383838] border border-[#444] text-xs font-medium px-3 py-1.5 rounded transition-all"
                      type="button"
                    >
                      <CloudUpload size={14} /> Change Cover
                    </button>
                    <button
                      onClick={removeCover}
                      className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-950 text-red-400 border border-red-900/50 text-xs font-medium px-3 py-1.5 rounded transition-all"
                      type="button"
                    >
                      <Trash size={14} /> Remove
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => coverImageInputRef.current?.click()}
                  className="flex flex-col items-center justify-center text-[#8c8c8c] hover:text-white py-8 w-full h-full transition-all"
                  type="button"
                >
                  <ImageIcon size={32} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Add cover image</span>
                  <span className="text-[10px] opacity-40 mt-1">Accepts JPEG, PNG, WEBP</span>
                </button>
              )}
              <input
                ref={coverImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </div>

            {/* Title Canvas */}
            <div className="mb-6">
              <textarea
                placeholder="Untitled"
                value={titleValue}
                onChange={(e) => {
                  form.setValue("title", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  // Auto resize height
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                rows={1}
                className="w-full text-5xl font-bold bg-transparent text-white border-none outline-none focus:ring-0 placeholder:text-[#3f3f3f] resize-none p-0 focus:outline-none focus:border-none"
                style={{ height: "auto" }}
              />
            </div>

            {/* 3. Notion-Style Properties Grid */}
            <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-3 text-sm text-[#8c8c8c] border-b border-[#2d2d2d] pb-6 mb-8">
              
              {/* Author property */}
              <div className="flex items-center gap-2 text-xs">
                <User size={14} className="opacity-60" />
                <span>Author</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Empty"
                  {...form.register("author")}
                  className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none"
                />
              </div>

              {/* Slug property */}
              <div className="flex items-center gap-2 text-xs">
                <Link2 size={14} className="opacity-60" />
                <span>Slug</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="empty-slug"
                  {...form.register("slug")}
                  className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none"
                />
              </div>

              {/* Category property */}
                <div className="flex items-center gap-2 text-xs">
                <FolderOpen size={14} className="opacity-60" />
                <span>Category</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={currentCategoryValue}
                  onChange={(e) => {
                    form.setValue(
                      "category_ids",
                      e.target.value ? [{ category: e.target.value }] : [],
                      { shouldValidate: true, shouldDirty: true }
                    );
                  }}
                  className="bg-[#202020] text-white border border-[#2d2d2d] rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-[#2eaadc] min-w-[150px]"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags property */}
              <div className="flex items-center gap-2 text-xs">
                <Tag size={14} className="opacity-60" />
                <span>Tags</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {tagsValue.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-[#252525] border border-[#333] text-white px-2 py-0.5 rounded text-[11px]"
                  >
                    {t.tag}
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="text-[#8c8c8c] hover:text-white text-xs font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
                
                {isAddingTag ? (
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      } else if (e.key === "Escape") {
                        setIsAddingTag(false);
                      }
                    }}
                    onBlur={addTag}
                    autoFocus
                    className="bg-[#202020] border border-[#2eaadc] text-white px-1.5 py-0.5 rounded text-[11px] outline-none max-w-[80px]"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="text-[#2eaadc] hover:underline text-xs flex items-center"
                  >
                    + Add Tag
                  </button>
                )}
              </div>

              {/* Excerpt property */}
              <div className="flex items-center gap-2 text-xs">
                <AlignLeft size={14} className="opacity-60" />
                <span>Excerpt</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter a short brief description..."
                  {...form.register("excerpt")}
                  className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Borderless Tiptap Editor Canvas */}
            <div 
              className={clsx(
                "editor-canvas focus:outline-none",
                // Tailwind custom selectors to target internal Tiptap classes and format them in beautiful dark mode
                "[&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full",
                "[&_.rich-editorjs_>_div:first-child]:bg-[#202020] [&_.rich-editorjs_>_div:first-child]:border-[#2d2d2d] [&_.rich-editorjs_>_div:first-child]:text-white",
                "[&_.rich-editorjs_button]:hover:bg-[#2c2c2c] [&_.rich-editorjs_button.is-active]:bg-[#2eaadc] [&_.rich-editorjs_button.is-active]:text-white",
                "[&_.ProseMirror]:bg-[#191919] [&_.ProseMirror]:border-none [&_.ProseMirror]:text-[#e3e3e3] [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-4 [&_.ProseMirror]:min-h-[450px]"
              )}
            >
              <DescriptionEditor
                label=""
                name="content"
                onValueChange={setDescription}
                control={form.control}
              />
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default NotionBlogEditor;
