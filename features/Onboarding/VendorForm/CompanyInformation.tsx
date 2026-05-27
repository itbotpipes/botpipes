import React from "react";
import { Input } from "@/components/ui/input";
import { FormValues } from "./Schema";
import { useFormContext } from "react-hook-form";

const CompanyInformation: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className="mb-8">
      <h2 className="mb-8 text-center text-3xl font-medium uppercase">
        Company Information
      </h2>

      <h3 className="mb-4 font-medium">UPLOAD YOUR DESIGN</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium">
            Company Legal Name
          </label>
          <Input
            className="input w-full"
            placeholder="Name"
            {...register("companyInfo.name")}
          />
          {errors.companyInfo?.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyInfo.name.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">
            Brand/Trade Name (If different)
          </label>
          <Input
            className="input w-full"
            placeholder="Brand/Trade Name"
            {...register("companyInfo.brand")}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">
            Year of Establishment
          </label>
          <Input
            className="input w-full"
            placeholder="Year of Establishment"
            {...register("companyInfo.yearEstablished")}
          />
          {errors.companyInfo?.yearEstablished && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyInfo.yearEstablished.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">
            Company Registration Number
          </label>
          <Input
            className="input w-full"
            placeholder="Company Registration Number"
            {...register("companyInfo.registrationNumber")}
          />
          {errors.companyInfo?.registrationNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyInfo.registrationNumber.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">GST Number</label>
          <Input
            className="input w-full"
            placeholder="GST Number"
            {...register("companyInfo.gstNumber")}
          />
          {errors.companyInfo?.gstNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyInfo.gstNumber.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">PAN Number</label>
          <Input
            className="input w-full"
            placeholder="PAN Number"
            {...register("companyInfo.panNumber")}
          />
          {errors.companyInfo?.panNumber && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyInfo.panNumber.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyInformation;
