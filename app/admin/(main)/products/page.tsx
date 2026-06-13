import { Button } from "@/components/ui/button";
import ProductList from "@/features/Admin/Product/Table/ProductList";
import Link from "next/link";
import React from "react";

export const runtime = 'edge';

function ProductsPage() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Products</h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/products/add"}>Add Product</Link>
          </Button>
        </div>

        <ProductList />
      </div>
    </div>
  );
}

export default ProductsPage;
