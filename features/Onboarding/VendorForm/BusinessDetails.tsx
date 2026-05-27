import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";
import ProductCategories from "./Checklists/ProductCategories";
import Areas from "./Checklists/Areas";

const BusinessDetails: React.FC = () => {
  const { register } = useFormContext<FormValues>();

  return (
    <section className="mb-8">
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Business Details
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium">
            Primary Product/Service You Offer
          </label>
          <Textarea
            className="input w-full resize-none"
            placeholder="Primary Product/Service"
            {...register("businessInfo.primaryProduct")}
          />
        </div>

        <ProductCategories />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium">
              Annual Turnover (Last Financial Year)
            </label>
            <Input
              className="input w-full"
              placeholder="Annual Turnover"
              {...register("businessInfo.annualTurnover")}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Manufacturing/Supply Capacity
            </label>
            <Input
              className="input w-full"
              placeholder="Manufacturing/Supply Capacity"
              {...register("businessInfo.manufacturingCapacity")}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Lead Time for Standard Orders
            </label>
            <Input
              className="input w-full"
              placeholder="Lead Time for Standard Orders"
              {...register("businessInfo.leadTimeStandardOrders")}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Minimum Order Quantity (if applicable)
            </label>
            <Input
              className="input w-full"
              placeholder="Minimum Order Quantity"
              {...register("businessInfo.minimumOrderQuantity")}
            />
          </div>
        </div>

        <Areas />
      </div>
    </section>
  );
};

export default BusinessDetails;
