import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return undefined;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  const display = prefersReducedMotion ? value : count;

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {display.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString("en-IN")}
        {suffix}
      </span>
    </span>
  );
}
