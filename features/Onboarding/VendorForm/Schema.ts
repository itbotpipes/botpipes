import * as yup from "yup";

const companyInfoSchema = {
  name: yup.string().required("Company name is required"),
  brand: yup.string().optional(),
  yearEstablished: yup
    .string()
    .matches(/^[0-9]{4}$/, "Enter a valid year (YYYY)")
    .optional(),
  registrationNumber: yup.string().optional(),
  gstNumber: yup.string().optional(),
  panNumber: yup.string().optional(),
};

const registerdOfficeSchema = {
  registeredOfficeAddress: yup.string().required("This field is required"),
  registeredCity: yup.string().required("This field is required"),
  registeredPin: yup.string().required("This field is required"),
  registeredState: yup.string().required("This field is required"),
};

const factoryWarehouseSchema = {
  factoryAddress: yup.string().optional(),
  factoryCity: yup.string().optional(),
  factoryPin: yup.string().optional(),
  factoryState: yup.string().optional(),
};

const contactPersonSchema = {
  contactPersonName: yup.string().optional(),
  contactEmail: yup.string().email("Invalid email").optional(),
  contactDesignation: yup.string().optional(),
  landlineNumber: yup.string().optional(),
  website: yup.string().url("Enter a valid URL").optional(),
};

const contactInformationSchema = {
  ...registerdOfficeSchema,
  ...factoryWarehouseSchema,
  person: yup.object(contactPersonSchema),
};

const businessDetailsSchema = {
  // Business details
  primaryProduct: yup.string().optional(),
  categories: yup.array().of(yup.string()).required("This field is required"),

  annualTurnover: yup.string().optional(),
  manufacturingCapacity: yup.string().optional(),
  leadTimeStandardOrders: yup.string().optional(),
  minimumOrderQuantity: yup.string().optional(),

  areasServed: yup.string().required("This field is required"),
};

const additionalInfoSchema = {
  whyPartner: yup.string().required("This field is required"),
  whySuitable: yup.string().required("This field is required"),
  capabilities: yup.string().required("This field is required"),
};

const BankInfoSchema = {
  bankName: yup.string().optional(),
  accountNumber: yup.string().optional(),
  ifscCode: yup.string().optional(),
  branchAddress: yup.string().optional(),
};

const commercialInfoSchema = {
  paymentSchema: yup.string().required("This field is required"),
  paymentSchema2: yup.string().required("This field is required"),
  ...BankInfoSchema,
};

const ReferenceSchema = yup.object({
  companyName: yup.string().required("Client name is required"),
  contactPerson: yup.string().required("Contact person is required"),
  phoneEmail: yup.string().required("Phone/Email is required"),
  productsSupplied: yup
    .string()
    .required("Products/Services Supplied is required"),
});
export type ReferenceSchemaType = yup.InferType<typeof ReferenceSchema>;

const clientReferencesSchema = {
  clientReferences: yup
    .array()
    .of(ReferenceSchema)
    .min(1, "At least one reference is required"),
};

const declarationSchema = {
  name: yup.string().required("Your name is required"),
  designation: yup.string().required("This field is required"),
  data: yup.string().required(),
  signature: yup.string().required(),
  seal: yup.string().required(),
};

export const schema = yup.object({
  companyInfo: yup.object(companyInfoSchema).required("This field is required"),
  contactInfo: yup
    .object(contactInformationSchema)
    .required("This field is required"),
  businessInfo: yup
    .object(businessDetailsSchema)
    .required("This field is required"),
  qualityCompliance: yup
    .array()
    .of(yup.string())
    .required("This field is required"),
  provideCertificates: yup.string().required("This field is required"),
  inHouseTesting: yup.string().required("This field is required"),
  commercialInfo: yup
    .object(commercialInfoSchema)
    .required("This field is required"),
  ...clientReferencesSchema,
  additonalInfo: yup
    .object(additionalInfoSchema)
    .required("This field is required"),
  declaration: yup.object(declarationSchema),
});

export type FormValues = yup.InferType<typeof schema>;
