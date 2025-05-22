/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { useScroll, useTransform, m } from "framer-motion";

const FeatureCardAnimated = ({ icon, title, description, delay }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.15, 0.2, 0.7, 0.8, 1],
    [50, 0, -20, 5, 0, 0, -50, -30]
  );

  return (
    <m.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ duration: 0.6, stiffness: 300, damping: 20, delay }}
    >
      <FeatureCard icon={icon} title={title} description={description} />
    </m.div>
  );
};

export default FeatureCardAnimated;
