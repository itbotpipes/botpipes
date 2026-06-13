import { Button } from "@/components/ui/button";
import CareerList from "@/features/Admin/Career/Table/CareerList";
import Link from "next/link";
import React from "react";

async function CareerPage() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Career</h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/careers/add"}>Add Career</Link>
          </Button>
        </div>

        <CareerList />
      </div>
    </div>
  );
}

export default CareerPage;
