import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free shipping", text: "On every order above ₹1,999." },
  { icon: RotateCcw, title: "7-day returns", text: "Not the right fit? Send it back." },
  { icon: ShieldCheck, title: "Secure payments", text: "UPI, cards, net banking and COD." },
  { icon: Headphones, title: "Real support", text: "Chat or call, 10am to 7pm." },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why shop with Velora" className="border-t border-denim/10">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-4 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-10 lg:py-14">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-denim text-chalk">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-[15px] font-bold">{title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-ink/65">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
