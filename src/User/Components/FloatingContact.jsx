import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

/*
  FLOATING CONTACT BUTTONS (WhatsApp + Call)
  Number from catalysthub.in ("Call Now"). Confirm the WhatsApp number is the
  same line; change WHATSAPP_NUMBER if it differs. Digits only, with country code.
*/
const CALL_NUMBER = "+919745200500";
const CALL_DISPLAY = "+91 97452 00500";
const WHATSAPP_NUMBER = "919745200500";
const WHATSAPP_MESSAGE = "Hi Catalyst Education, I would like to know more about your courses.";

const actions = [
  {
    key: "whatsapp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    external: true,
    label: "Chat on WhatsApp",
    sublabel: "Ask us anything about courses",
    icon: FaWhatsapp,
    iconSize: 26,
    button:
      "bg-[#25D366] shadow-[0_10px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_34px_rgba(37,211,102,0.55)] focus-visible:ring-[#25D366]/40",
    pulse: "bg-[#25D366]",
  },
  {
    key: "call",
    href: `tel:${CALL_NUMBER}`,
    external: false,
    label: "Call us",
    sublabel: CALL_DISPLAY,
    icon: FiPhoneCall,
    iconSize: 21,
    button:
      "bg-gradient-to-br from-[#10294B] to-[#1762B5] shadow-[0_10px_28px_rgba(16,41,75,0.40)] hover:shadow-[0_14px_34px_rgba(23,98,181,0.50)] focus-visible:ring-[#1762B5]/40",
  },
];

export default function FloatingContact() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[90] flex animate-[fab-in_0.6s_cubic-bezier(0.16,1,0.3,1)_both] flex-col items-end gap-3 sm:bottom-8 sm:right-8"
    >
      {actions.map(({ key, href, external, label, sublabel, icon: Icon, iconSize, button, pulse }) => (
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={`${label}${key === "call" ? ` ${sublabel}` : ""}`}
          className={`group relative isolate flex h-12 w-12 items-center justify-center rounded-full text-white ring-4 ring-white/70 transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 ease-out hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 sm:h-14 sm:w-14 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${button}`}
        >
          {/* Soft attention pulse (WhatsApp only, off for reduced motion) */}
          {pulse && (
            <span
              aria-hidden="true"
              className={`absolute inset-0 -z-10 animate-[fab-pulse_2.6s_ease-out_infinite] rounded-full ${pulse} motion-reduce:hidden`}
            />
          )}

          <Icon size={iconSize} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-[-8deg]" />

          {/* Label slides out on hover / keyboard focus (desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[calc(100%+14px)] top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-2xl border border-[#E2EAF5] bg-white px-4 py-2.5 text-left opacity-0 shadow-[0_12px_30px_rgba(16,41,75,0.16)] transition-[color,background-color,border-color,box-shadow,opacity,translate,scale,rotate,width,background-position] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
          >
            <span className="block text-sm font-bold text-[#10294B]">{label}</span>
            <span className="block text-xs text-[#52617D]">{sublabel}</span>
            {/* pointer */}
            <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-[#E2EAF5] bg-white" />
          </span>
        </a>
      ))}
    </nav>
  );
}
