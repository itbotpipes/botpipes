import React from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../Schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BankInfoProps {
  className?: string;
}

const BankInfo: React.FC<BankInfoProps> = ({ className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className={clsx("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      <div>
        <Label className="mb-1 block text-xs font-medium">BANK NAME</Label>
        <Input
          {...register("commercialInfo.bankName")}
          placeholder="Bank Name"
          className="form"
        />
        {errors.commercialInfo?.bankName && (
          <p className="mt-1 text-xs text-red-600">
            {errors.commercialInfo.bankName.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-1 block text-xs font-medium">BRANCH</Label>
        <Input
          {...register("commercialInfo.branchAddress")}
          placeholder="Branch"
          className="form"
        />
        {errors.commercialInfo?.branchAddress && (
          <p className="mt-1 text-xs text-red-600">
            {errors.commercialInfo.branchAddress.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-1 block text-xs font-medium">ACCOUNT NUMBER</Label>
        <Input
          {...register("commercialInfo.accountNumber")}
          placeholder="Account Number"
          className="form"
        />
        {errors.commercialInfo?.accountNumber && (
          <p className="mt-1 text-xs text-red-600">
            {errors.commercialInfo.accountNumber.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-1 block text-xs font-medium">IFSC CODE</Label>
        <Input
          {...register("commercialInfo.ifscCode")}
          placeholder="IFSC Code"
          className="form"
        />
        {errors.commercialInfo?.ifscCode && (
          <p className="mt-1 text-xs text-red-600">
            {errors.commercialInfo.ifscCode.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BankInfo;
