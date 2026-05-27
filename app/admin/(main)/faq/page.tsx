import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FAQList from "@/features/Admin/FAQ/Table/FAQList";

function FAQ({}: PageProps<"/admin/faq">) {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">
        Frequently Asked Questions
      </h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/faq/add"}>Add FAQ</Link>
          </Button>
        </div>

        <FAQList />
      </div>
    </div>
  );
}

export default FAQ;
