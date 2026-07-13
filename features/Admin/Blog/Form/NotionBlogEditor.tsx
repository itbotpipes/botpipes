"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
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
  ChevronDown,
  ChevronUp,
  Globe,
  Settings,
  HelpCircle,
  Clock,
  Sparkles,
  Search,
  FileText,
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

  // Tabs state: edit, seo, preview
  const [activeTab, setActiveTab] = useState<"edit" | "seo" | "preview">("edit");

  // Accordion collapses in SEO tab
  const [seoGeneralOpen, setSeoGeneralOpen] = useState(true);
  const [seoPreviewOpen, setSeoPreviewOpen] = useState(true);

  // Word metrics state
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  // Load categories
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

  // Watch fields for rendering and SEO previews
  const titleValue = form.watch("title");
  const authorValue = form.watch("author");
  const slugValue = form.watch("slug");
  const excerptValue = form.watch("excerpt");
  const seoTitleValue = form.watch("seo_title");
  const metaDescriptionValue = form.watch("meta_description");
  const focusKeywordValue = form.watch("focus_keyword");
  const canonicalUrlValue = form.watch("canonical_url");
  const isDraftValue = form.watch("is_draft");

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

  // Notion Auto-Save Engine: debounces form changes for 5 seconds and saves
  const formValues = form.watch();
  useEffect(() => {
    if (!form.formState.isDirty) return;

    setSavingStatus("saving");
    const saveTimer = setTimeout(() => {
      // Trigger silent form submit
      form.handleSubmit(async (data) => {
        try {
          // Keep current draft status
          submitHandler({
            ...defaultValues,
            ...data,
            cover_image_url: {
              file: data.cover_image_url,
              publicId: defaultValues?.cover_image_url?.publicId,
            },
            category_ids: data.category_ids.map((c) => c.category),
            tags: data.tags.map((t) => t.tag),
            content: form.getValues("content"), // fetch content directly
          } as any);
          
          form.reset(data, { keepValues: true }); // reset dirty state
          setSavingStatus("saved");
          setTimeout(() => setSavingStatus("idle"), 2500);
        } catch (err) {
          console.error("Autosave error:", err);
          setSavingStatus("idle");
        }
      })();
    }, 5000);

    return () => clearTimeout(saveTimer);
  }, [formValues, form, submitHandler, defaultValues]);

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

  // Text changes metric updater
  const handleRawChange = (text: string) => {
    const cleanText = text.trim();
    const words = cleanText ? cleanText.split(/\s+/).length : 0;
    const chars = cleanText.length;
    const time = Math.max(1, Math.ceil(words / 200)); // 200 words per minute average
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(time);
  };

  // Trigger submission to publish or draft
  const triggerSave = (draft: boolean) => {
    form.setValue("is_draft", draft, { shouldDirty: true });
    form.handleSubmit(handleSubmit, (err) => {
      console.log("Validation errors:", err);
      const fields = Object.keys(err).map(k => {
        if (k === "cover_image_url") return "Cover Image";
        if (k === "category_ids") return "Category";
        return k.charAt(0).toUpperCase() + k.slice(1);
      }).join(", ");
      alert(`Cannot save. Please complete the following required fields: ${fields}`);
    })();
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#e3e3e3] font-sans antialiased overflow-y-auto">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2c2c2c] bg-[#191919]/90 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-[#8c8c8c] hover:bg-[#252525] hover:text-white transition-all cursor-pointer"
            type="button"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-[#3a3a3a]">/</span>
          <span className="text-sm font-medium text-[#c0c0c0] truncate max-w-[200px]">
            {titleValue || "Untitled"}
          </span>

          {/* Tab Selection */}
          <div className="flex items-center gap-1 bg-[#202020] border border-[#2d2d2d] rounded-md p-0.5 ml-6">
            <button
              onClick={() => setActiveTab("edit")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "edit"
                  ? "bg-[#2c2c2c] text-white"
                  : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "seo"
                  ? "bg-[#2c2c2c] text-white"
                  : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              SEO Panel
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "preview"
                  ? "bg-[#2c2c2c] text-white"
                  : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              Live Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicators */}
          {savingStatus === "saving" && (
            <span className="text-xs text-[#8c8c8c] animate-pulse flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-yellow-500 animate-ping" />
              Saving...
            </span>
          )}
          {savingStatus === "saved" && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <Check size={12} /> Saved just now
            </span>
          )}

          {/* Delete Action (only if editing existing item) */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded p-1.5 text-[#8c8c8c] hover:bg-red-950/40 hover:text-red-500 transition-all cursor-pointer"
              type="button"
              title="Delete post"
            >
              <Trash size={16} />
            </button>
          )}

          {/* Action Buttons */}
          <button
            onClick={() => triggerSave(true)}
            disabled={loading}
            id="save-draft-btn"
            className="bg-[#252525] border border-[#2d2d2d] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all"
            type="button"
          >
            Save Draft
          </button>
          <Button
            onClick={() => triggerSave(false)}
            disabled={loading}
            id="publish-btn"
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
            
            {/* Form Validation Errors Banner */}
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

            {/* TAB 1: EDIT CANVAS */}
            {activeTab === "edit" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
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
                          className="flex items-center gap-1.5 bg-[#2b2b2b] hover:bg-[#383838] border border-[#444] text-xs font-medium px-3 py-1.5 rounded transition-all cursor-pointer"
                          type="button"
                        >
                          <CloudUpload size={14} /> Change Cover
                        </button>
                        <button
                          onClick={removeCover}
                          className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-950 text-red-400 border border-red-900/50 text-xs font-medium px-3 py-1.5 rounded transition-all cursor-pointer"
                          type="button"
                        >
                          <Trash size={14} /> Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => coverImageInputRef.current?.click()}
                      className="flex flex-col items-center justify-center text-[#8c8c8c] hover:text-white py-8 w-full h-full transition-all cursor-pointer"
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
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    className="w-full bg-transparent text-white border-none outline-none font-bold text-4xl placeholder-[#333] p-0 resize-none font-sans focus:outline-none focus:ring-0 leading-tight"
                    rows={1}
                  />
                </div>

                {/* Notion-Style Properties Grid */}
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
                      placeholder="empty-slug-url"
                      {...form.register("slug")}
                      className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm font-mono focus:outline-none"
                    />
                  </div>

                  {/* Category property */}
                  <div className="flex items-center gap-2 text-xs">
                    <FolderOpen size={14} className="opacity-60" />
                    <span>Category</span>
                  </div>
                  <div>
                    <select
                      value={currentCategoryValue}
                      onChange={(e) => {
                        const val = e.target.value;
                        form.setValue(
                          "category_ids",
                          val ? [{ category: val }] : [],
                          { shouldValidate: true, shouldDirty: true }
                        );
                      }}
                      className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#202020]">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-[#202020]">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reading metrics row */}
                  <div className="flex items-center gap-2 text-xs">
                    <Clock size={14} className="opacity-60" />
                    <span>Read Time</span>
                  </div>
                  <div className="text-sm text-[#c0c0c0] flex items-center gap-1.5">
                    <span>{readingTime || 1} min read</span>
                    <span className="opacity-20">•</span>
                    <span className="text-xs text-[#8c8c8c]">({wordCount} words, {charCount} chars)</span>
                  </div>

                  {/* Tags property */}
                  <div className="flex items-center gap-2 text-xs">
                    <Tag size={14} className="opacity-60" />
                    <span>Tags</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tagsValue.map((item, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 bg-[#232323] hover:bg-[#2c2c2c] border border-[#2d2d2d] rounded-full px-2.5 py-0.5 text-xs text-[#e3e3e3] transition-all"
                      >
                        {item.tag}
                        <button
                          type="button"
                          onClick={() => removeTag(idx)}
                          className="opacity-50 hover:opacity-100 text-red-400 font-bold ml-0.5 cursor-pointer"
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
                        onBlur={addTag}
                        onKeyDown={(e) => e.key === "Enter" && addTag()}
                        className="bg-[#202020] border border-[#2d2d2d] rounded px-1.5 py-0.5 text-xs text-white outline-none focus:border-[#2eaadc]"
                        autoFocus
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingTag(true)}
                        className="text-xs text-[#2eaadc] hover:underline cursor-pointer"
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
                      placeholder="Enter a short excerpt description..."
                      {...form.register("excerpt")}
                      className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tiptap Editor Canvas */}
                <div 
                  className={clsx(
                    "editor-canvas focus:outline-none mb-10",
                    "[&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full",
                    "[&_.ProseMirror]:bg-[#191919] [&_.ProseMirror]:border-none [&_.ProseMirror]:text-[#e3e3e3] [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-4 [&_.ProseMirror]:min-h-[450px]"
                  )}
                >
                  <DescriptionEditor
                    label=""
                    name="content"
                    onValueChange={setDescription}
                    control={form.control}
                    notionMode={true}
                    onRawValueChange={handleRawChange}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: SEO PANEL */}
            {activeTab === "seo" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-6">
                
                {/* Accordion 1: Meta Settings */}
                <div className="border border-[#2d2d2d] rounded-lg bg-[#202020]/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSeoGeneralOpen(!seoGeneralOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-[#202020] text-sm font-semibold border-b border-[#2d2d2d] cursor-pointer hover:bg-[#252525] transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={16} className="text-[#2eaadc]" />
                      Search Engine Optimization Inputs
                    </span>
                    {seoGeneralOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {seoGeneralOpen && (
                    <div className="p-5 space-y-4 text-sm">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#8c8c8c] font-medium">SEO Title Tag</label>
                        <input
                          type="text"
                          placeholder={titleValue || "Optional: Enter title overrides..."}
                          {...form.register("seo_title")}
                          className="w-full bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#2eaadc]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#8c8c8c] font-medium">Meta Description</label>
                        <textarea
                          placeholder={excerptValue || "Optional: Enter search snippet excerpts..."}
                          rows={3}
                          {...form.register("meta_description")}
                          className="w-full bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#2eaadc]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#8c8c8c] font-medium">Focus Keyword</label>
                        <input
                          type="text"
                          placeholder="e.g. AI automation, workflow pipelines"
                          {...form.register("focus_keyword")}
                          className="w-full bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#2eaadc]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-[#8c8c8c] font-medium">Canonical URL</label>
                        <input
                          type="text"
                          placeholder="https://botpipes.com/blog/..."
                          {...form.register("canonical_url")}
                          className="w-full bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#2eaadc] font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Live Search Engine Snippet Mock */}
                <div className="border border-[#2d2d2d] rounded-lg bg-[#202020]/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSeoPreviewOpen(!seoPreviewOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-[#202020] text-sm font-semibold border-b border-[#2d2d2d] cursor-pointer hover:bg-[#252525] transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={16} className="text-yellow-500" />
                      Google Search Preview Mockup
                    </span>
                    {seoPreviewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {seoPreviewOpen && (
                    <div className="p-6 bg-black flex flex-col gap-3">
                      <span className="text-xs text-[#8c8c8c] italic">This is how your post will render on mobile and desktop Google searches:</span>
                      
                      <div className="bg-[#1b1b1b] border border-[#2d2d2d] p-5 rounded-lg max-w-xl font-sans mt-2 shadow-inner">
                        <div className="text-xs text-[#c0c0c0] mb-1.5 flex items-center gap-1">
                          <span>https://botpipes.com</span>
                          <span>›</span>
                          <span className="truncate">blog</span>
                          <span>›</span>
                          <span className="truncate text-[#8c8c8c]">{slugValue || "untitled"}</span>
                        </div>
                        <h3 className="text-[19px] text-[#8ab4f8] hover:underline cursor-pointer leading-tight font-normal">
                          {seoTitleValue || titleValue || "Untitled Post | Botpipes"}
                        </h3>
                        <p className="text-xs text-[#bdc1c6] leading-relaxed mt-2">
                          {metaDescriptionValue || excerptValue || "Please configure your meta description or blog excerpt to preview this Google Search snippet text details."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: LIVE PREVIEW MODE */}
            {activeTab === "preview" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#121212] border border-[#2d2d2d] rounded-xl p-8 shadow-inner select-none mb-10">
                {/* Mock Live Site Header */}
                <div className="flex justify-between items-center text-xs text-[#8c8c8c] border-b border-[#2d2d2d] pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span>Live preview matching website styles</span>
                  </div>
                  <span>Preview mode active</span>
                </div>

                {/* Banner image preview */}
                {coverPreview && (
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-8 border border-[#2d2d2d]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverPreview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Category tag */}
                {currentCategoryValue && (
                  <span className="text-xs font-semibold text-[#2eaadc] uppercase tracking-wider mb-3 block">
                    {categories.find((c) => c.id === currentCategoryValue)?.name || "Automation"}
                  </span>
                )}

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  {titleValue || "Untitled Post"}
                </h1>

                {/* Sub info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8c8c8c] mb-6 pb-6 border-b border-[#2d2d2d]">
                  <div className="flex items-center gap-1.5">
                    <span className="size-5 rounded-full bg-[#202020] flex items-center justify-center font-bold text-white text-[10px]">
                      {authorValue ? authorValue.charAt(0) : "A"}
                    </span>
                    <span className="text-white font-medium">{authorValue || "Author"}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{readingTime || 1} min read</span>
                  </div>
                  {tagsValue.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        {tagsValue.map((t, idx) => (
                          <span key={idx} className="bg-[#1f1f1f] text-white border border-[#2d2d2d] rounded-full px-2 py-0.5 text-[10px]">
                            #{t.tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Excerpt container */}
                {excerptValue && (
                  <p className="text-[#8c8c8c] text-lg italic border-l-2 border-[#2d2d2d] pl-4 mb-8 leading-relaxed">
                    {excerptValue}
                  </p>
                )}

                {/* Preview Rich Editor Canvas (read-only mode) */}
                <div 
                  className={clsx(
                    "preview-canvas shadow-none focus:outline-none",
                    "[&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full",
                    "[&_.ProseMirror]:bg-transparent [&_.ProseMirror]:border-none [&_.ProseMirror]:text-[#e3e3e3] [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-0 [&_.ProseMirror]:min-h-0"
                  )}
                >
                  <DescriptionEditor
                    label=""
                    name="content"
                    onValueChange={() => {}}
                    control={form.control}
                    notionMode={true}
                    editable={false}
                  />
                </div>
              </div>
            )}
            
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default NotionBlogEditor;
