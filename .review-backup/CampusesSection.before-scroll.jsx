import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";
import SectionHeading from "./shared/SectionHeading";

const campuses = [
  { name: "Calicut", address: "Azhakodi Temple Road, near MGI International School", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/calicut" },
  { name: "Vadakara", address: "Edodi, Vadakara", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/vadakara" },
  { name: "Kannur", address: "5th Floor, Capitol Mall, Thana", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900", path: "/campuses/kannur" },
  { name: "Manjeri", address: "Manjeri Town, Malappuram", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/manjeri" },
  { name: "Kottakkal", address: "Pullat Tower, Parappur Main Road", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/kottakkal" },
  { name: "Perinthalmanna", address: "Moossakkutty Bus Stand Road", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900", path: "/campuses/perinthalmanna" },
  { name: "Thrissur", address: "Mahatma Nagar / East Fort area", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900", path: "/campuses/thrissur" },
  { name: "Kochi", address: "Medical Centre Road, Vennala", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900", path: "/campuses/kochi" },
];

// CAMPUSES - INFINITE MOVING CAROUSEL
export default function CampusesSection() {
  return (
    <section className="overflow-hidden bg-[#F7F8FC] py-20 lg:py-28">

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <SectionHeading
            eyebrow="Our campuses"
            title="A place to learn, connect and grow."
            description="Explore our campus locations and find a learning environment that works for you."
          />

          <Link
            to="/campuses"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#6678A8] transition hover:text-[#26345C]"
          >
            Explore campuses <FiArrowUpRight />
          </Link>

        </div>
      </div>

      {/* Campus carousel */}
      <div className="relative mt-12 overflow-hidden">

        {/* Left white fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#F7F8FC] via-[#F7F8FC]/90 to-transparent sm:w-28 lg:w-40" />

        {/* Moving cards */}
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >

          {[...campuses, ...campuses].map((campus, index) => (
            <motion.div
              key={`${campus.name}-${index}`}
              whileHover={{ y: -8, scale: 1.015 }}
              aria-hidden={index >= campuses.length ? true : undefined}
              className="group relative mr-6 h-[330px] w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl sm:h-[370px] sm:w-[340px]"
            >

              <Link
                to={campus.path}
                tabIndex={index >= campuses.length ? -1 : undefined}
                className="absolute inset-0 block"
                aria-label={`Explore ${campus.name} campus`}
              >

                {/* Campus image */}
                <img
                  src={campus.image}
                  alt={`${campus.name} campus`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18233F]/90 via-[#26345C]/20 to-transparent transition-opacity duration-500 group-hover:from-[#18233F]/95" />

                {/* Campus details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-7">

                  <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D9DEEC]">
                    <FiMapPin className="text-sm" />
                    Catalyst Education Campus
                  </p>

                  <div className="flex items-end justify-between gap-3">

                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                        {campus.name}
                      </h3>

                      <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/80">
                        {campus.address}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#26345C] transition-all duration-300 group-hover:bg-[#6678A8] group-hover:text-white group-hover:rotate-45">
                      <FiArrowUpRight className="text-lg" />
                    </span>

                  </div>
                </div>

              </Link>
            </motion.div>
          ))}

        </motion.div>

        {/* Right white fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#F7F8FC] via-[#F7F8FC]/90 to-transparent sm:w-28 lg:w-40" />

      </div>
    </section>
  );
}
