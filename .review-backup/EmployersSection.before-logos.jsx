import { motion } from "motion/react";
import Reveal from "./shared/Reveal";
import SectionHeading from "./shared/SectionHeading";

const employers = [
  "Deloitte",
  "EY",
  "KPMG",
  "PwC",
  "Accenture",
  "Amazon",
  "Microsoft",
  "Infosys",
  "Tata Consultancy Services",
  "Wipro",
  "HCLTech",
  "Cognizant",
  "Capgemini",
  "IBM",
  "Tech Mahindra",
];

// EMPLOYER BRAND SHOWCASE
export default function EmployersSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Career possibilities"
          title="Build skills for a world of opportunities."
          description="Professional qualifications can open pathways into accounting, consulting, technology and business. Explore some examples of globally recognised employers."
          center
        />

        <Reveal>
          <div className="mt-12 rounded-3xl border border-slate-100 bg-[#F7F8FC] px-5 py-10 sm:px-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Examples of recognised global employers
            </p>
            <div className="relative mt-9 overflow-hidden">
              <motion.div
                className="flex w-max items-center py-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              >
                {[...employers, ...employers].map((employer, index) => (
                  <div key={`${employer}-${index}`} aria-hidden={index >= employers.length ? true : undefined} className="mr-14 min-w-[120px] text-center text-xl font-extrabold tracking-tight text-slate-400 transition hover:text-[#26345C] sm:text-2xl">
                    {employer}
                  </div>
                ))}
              </motion.div>
            </div>
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Employer names are illustrative examples only and do not imply a verified placement partnership.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
