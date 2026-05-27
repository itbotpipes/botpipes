import React from "react";
import clsx from "clsx";

interface CategoriesProps {
  className?: string;
}

type Item = {
  title: string;
  points: string[];
};

type CategoryGroup = {
  category: string;
  items: Item[];
};

const categories: CategoryGroup[] = [
  {
    category: "Raw Materials Suppliers",
    items: [
      {
        title: "Steel Pipes & Tubes",
        points: [
          'Black MS pipes (1" to 12" diameter)',
          "Seamless and ERW pipes",
          "IS, ASTM, and international standard compliance",
          "Mill test certificates and material traceability",
        ],
      },
      {
        title: "Pipe Fittings & Connectors",
        points: [
          "Elbows, tees, reducers, caps",
          "Grooved fittings and couplings (Victaulic-type)",
          "Threaded fittings and flanges",
          "Weld-on branch outlets",
        ],
      },
      {
        title: "Fire Protection Components",
        points: [
          "Sprinkler heads (various types and K-factors)",
          "Fire valves (gate, butterfly, check, alarm valves)",
          "Pressure gauges and instrumentation",
          "Hangers, clamps, and support systems",
        ],
      },
      {
        title: "Coatings & Paints",
        points: [
          "Powder coating materials",
          "Industrial paints and primers",
          "Corrosion-resistant coatings",
          "Surface treatment chemicals",
        ],
      },
    ],
  },
  {
    category: "Manufacturing Support Suppliers",
    items: [
      {
        title: "Welding Consumables",
        points: [
          "Welding electrodes and wires",
          "Shielding gases (CO2, Argon mixtures)",
          "Flux and welding accessories",
          "Grinding and cutting discs",
        ],
      },
      {
        title: "Cutting & Machining Supplies",
        points: [
          "Plasma cutting consumables",
          "Threading dies and tools",
          "Grooving machine parts",
          "Drilling and cutting tools",
        ],
      },
      {
        title: "Quality Control Equipment",
        points: [
          "Testing instruments and gauges",
          "Calibration services",
          "NDT equipment and services",
          "Measurement tools",
        ],
      },
      {
        title: "Coatings & Paints",
        points: [
          "Powder coating materials",
          "Industrial paints and primers",
          "Corrosion-resistant coatings",
          "Surface treatment chemicals",
        ],
      },
    ],
  },
  {
    category: "Packaging & Logistics",
    items: [
      {
        title: "Steel Pipes & Tubes",
        points: [
          'Black MS pipes (1" to 12" diameter)',
          "Seamless and ERW pipes",
          "Strapping and binding materials",
          "Identification labels and tags",
        ],
      },
      {
        title: "Logistics Services",
        points: [
          "Transportation and freight services",
          "Heavy equipment movers",
          "Warehousing solutions",
          "Material handling equipment",
        ],
      },
    ],
  },
  {
    category: "Services & Support",
    items: [
      {
        title: "Maintenance & Technical",
        points: [
          "Robotic equipment maintenance",
          "Electrical and automation services",
          "Facility maintenance services",
          "Equipment calibration services",
        ],
      },
      {
        title: "Professional Services",
        points: [
          "Testing and certification agencies",
          "Third-party quality inspection",
          "Engineering consultancy",
          "Training services",
        ],
      },
      {
        title: "IT & Software",
        points: [
          "CAD/CAM software solutions",
          "ERP and inventory management",
          "Production planning software",
          "Documentation management",
        ],
      },
    ],
  },
];

const Categories: React.FC<CategoriesProps> = ({ className }) => {
  return (
    <section className={clsx("bg-gray-50 px-4 py-12", className)}>
      <div className="">
        <h2 className="mb-10 text-5xl font-medium text-gray-900">
          Vendor Categories We&apos;re Looking For
        </h2>

        <div className="mx-auto max-w-[70rem] space-y-10">
          {categories.map((group, indx) => (
            <div
              className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3"
              key={indx}
            >
              <div className="">
                <h3 className="font-urbanist text-4xl font-medium text-gray-900">
                  {group.category}
                </h3>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {group.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100"
                    >
                      <h4 className="mb-3 font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                        {item.points.map((p) => (
                          <li key={p} className="ml-5 list-outside">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
