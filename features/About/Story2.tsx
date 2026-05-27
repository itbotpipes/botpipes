import React from "react";

export default function StoryTwo() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-sm tracking-widest uppercase text-slate-500 mb-4">
            About Us
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
            Our Story
          </h1>

          <div className="w-16 h-[2px] bg-slate-900 mt-6"></div>
        </div>

        {/* Story Content */}
        <div className="space-y-8 text-lg leading-relaxed text-slate-600">
          <p>
            Our company was founded with a singular vision — to redefine how
            complex systems are designed, built, and delivered. Recognizing the
            inefficiencies of traditional on-site construction, we set out to
            create a smarter, more controlled approach that elevates quality,
            safety, and execution speed.
          </p>

          <p>
            By integrating engineering precision with advanced prefabrication
            methodologies, we established a process built on consistency and
            accountability. Every system is developed in a controlled
            environment, ensuring performance standards that meet the demands
            of modern infrastructure.
          </p>

          <p>
            Today, we continue to partner with forward-thinking developers,
            contractors, and institutions who value reliability and long-term
            performance. Our commitment remains unchanged — to deliver
            engineered solutions where quality is not optional, and excellence
            is expected.
          </p>
        </div>

      </section>
    </main>
  );
}
