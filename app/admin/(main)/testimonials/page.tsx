import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TestimonialList from "@/features/Admin/Testimonial/Table/TestimonialList";

function Testimonial({}: PageProps<"/admin/testimonials">) {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Testimonials</h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/testimonials/add"}>Add Testimonials</Link>
          </Button>
        </div>

        <TestimonialList />
      </div>
    </div>
  );
}

export default Testimonial;
