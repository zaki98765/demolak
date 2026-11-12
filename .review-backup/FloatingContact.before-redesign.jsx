
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const CALL_NUMBER = "+91XXXXXXXXXX";

export default function FloatingContact() {
  const message = encodeURIComponent(
    "Hi Catalyst Education, I would like to know more about your courses."
  );

  return (
    <div className="fixed bottom-6 right-5 z-[999] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center hover:gap-3 overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.3)] transition-all duration-300 ease-out hover:w-44 hover:justify-start hover:px-5 hover:shadow-xl"
      >
        <FaWhatsapp className="h-7 w-7 shrink-0" />

        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[100px] group-hover:opacity-100">
          WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${CALL_NUMBER}`}
        aria-label="Call Catalyst Education"
        className="group flex h-14 w-14 items-center justify-center hover:gap-3 overflow-hidden rounded-full bg-[#10294B] text-white shadow-[0_8px_25px_rgba(16,41,75,0.3)] transition-all duration-300 ease-out hover:w-44 hover:justify-start hover:px-5 hover:shadow-xl"
      >
        <FiPhoneCall className="h-6 w-6 shrink-0" />

        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[100px] group-hover:opacity-100">
          Contact Us
        </span>
      </a>

    </div>
  );
}
