import React from "react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";

const ContactInformation: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className="mb-8">
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Contact Information
      </h3>

      <div className="space-y-5">
        {/* Registered Office */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <label className="mb-1 block text-xs font-medium">
              Registered Office Address
            </label>
            <Input
              className="input w-full"
              placeholder="Registered Office Address"
              {...register("contactInfo.registeredOfficeAddress")}
            />
            {errors.contactInfo?.registeredOfficeAddress && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo?.registeredOfficeAddress.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">City</label>
            <Input
              className="input w-full"
              placeholder="City"
              {...register("contactInfo.registeredCity")}
            />
            {errors.contactInfo?.registeredCity && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.registeredCity.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">PIN</label>
            <Input
              className="input w-full"
              placeholder="PIN"
              {...register("contactInfo.registeredPin")}
            />
            {errors.contactInfo?.registeredPin && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.registeredPin.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">State</label>
            <Input
              className="input w-full"
              placeholder="State"
              {...register("contactInfo.registeredState")}
            />
            {errors.contactInfo?.registeredState && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.registeredState.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Factory Warehouse Address */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <label className="mb-1 block text-xs font-medium">
              Factory/Warehouse Address (if different)
            </label>
            <Input
              className="input w-full"
              placeholder="Factory/Warehouse Address"
              {...register("contactInfo.factoryAddress")}
            />
            {errors.contactInfo?.factoryAddress && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.factoryAddress.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">City</label>
            <Input
              className="input w-full"
              placeholder="City"
              {...register("contactInfo.factoryCity")}
            />
            {errors.contactInfo?.factoryCity && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.factoryCity.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">PIN</label>
            <Input
              className="input w-full"
              placeholder="PIN"
              {...register("contactInfo.factoryPin")}
            />
            {errors.contactInfo?.factoryPin && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.factoryPin.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">State</label>
            <Input
              className="input w-full"
              placeholder="State"
              {...register("contactInfo.factoryState")}
            />
            {errors.contactInfo?.factoryState && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.factoryState.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Top row: contact person, designation, email, landline */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium">
              Contact Person Name
            </label>
            <Input
              className="input w-full"
              placeholder="Contact Person Name"
              {...register("contactInfo.person.contactPersonName")}
            />
            {errors.contactInfo?.person?.contactPersonName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.person.contactPersonName.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Designation
            </label>
            <Input
              className="input w-full"
              placeholder="Designation"
              {...register("contactInfo.person.contactDesignation")}
            />
            {errors.contactInfo?.person?.contactDesignation && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.person.contactDesignation.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Email Address
            </label>
            <Input
              className="input w-full"
              placeholder="Email Address"
              {...register("contactInfo.person.contactEmail")}
            />
            {errors.contactInfo?.person?.contactEmail && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.person.contactEmail.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Landline Number (with STD code)
            </label>
            <Input
              className="input w-full"
              placeholder="Landline Number"
              {...register("contactInfo.person.landlineNumber")}
            />
            {errors.contactInfo?.person?.landlineNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactInfo.person.landlineNumber.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="mb-1 block text-xs font-medium">Website</label>
          <Input
            className="input w-full"
            placeholder="Website"
            {...register("contactInfo.person.website")}
          />
          {errors.contactInfo?.person?.website && (
            <p className="mt-1 text-xs text-red-600">
              {errors.contactInfo.person.website.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
