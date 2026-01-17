"use client";

import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import AnchorCard from "./AnchorCard";

// --- Utility Helper ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Configuration & Variants ---

const bentoGridVariants = cva(
  "relative grid gap-3 md:gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          /* --- MOBILE LAYOUT (Compact 1-2-2 Grid) --- */
          /* Changed to 3 rows total to save vertical space. 
             Row 1: 180px (Feature)
             Row 2: 120px (Split)
             Row 3: 120px (Split) 
             Total Content Height: ~420px + gaps -> Fits easily on mobile. */
          grid-cols-2 grid-rows-[180px_120px_120px]

          /* --- DESKTOP LAYOUT (Original 8 Columns) --- */
          md:grid-cols-8 md:grid-rows-[1fr_0.5fr_0.5fr_1fr]
          
          /* 1st Child: Full width mobile / Col-span-6 Desktop */
          [&>*:first-child]:col-span-2 md:[&>*:first-child]:col-span-6 md:[&>*:first-child]:row-span-3
          
          /* 2nd Child: Half width mobile / Col-span-2 Desktop */
          [&>*:nth-child(2)]:col-span-1 md:[&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 
          
          /* 3rd Child: Half width mobile / Col-span-2 Desktop */
          [&>*:nth-child(3)]:col-span-1 md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 
          
          /* 4th Child: NOW Half width mobile / Col-span-3 Desktop */
          [&>*:nth-child(4)]:col-span-1 md:[&>*:nth-child(4)]:col-span-3
          
          /* 5th Child: NOW Half width mobile / Col-span-3 Desktop */
          [&>*:nth-child(5)]:col-span-1 md:[&>*:nth-child(5)]:col-span-3
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// --- Context ---

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component",
    );
  }
  return context;
}

// --- Sub-Components ---

const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        // Mobile: 150vh, Desktop: 300vh
        className={cn(
          "relative min-h-[150vh] md:min-h-[300vh] w-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  );
});
BentoGrid.displayName = "BentoGrid";

const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();

    const translate = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ translate, scale, ...style }}
        {...props}
      />
    );
  },
);
BentoCell.displayName = "BentoCell";

const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);

    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.4 ? "absolute" : "fixed",
    );

    return (
      <motion.div
        ref={ref}
        className={cn(
          "left-1/2 top-1/2 size-fit w-full max-w-[90%] md:max-w-none",
          className,
        )}
        style={{
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    );
  },
);
ContainerScale.displayName = "ContainerScale";

// --- Main Exported Component ---

const IMAGES = [
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2388&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2264&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=2368&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=700&auto=format&fit=crop",
];

const ScrollImageGrid = () => {
  return (
    <ContainerScroll className="bg-slate-950 bg-[linear-gradient(to_right,#7e22ce20_1px,transparent_1px),linear-gradient(to_bottom,#7e22ce20_1px,transparent_1px)] bg-[size:24px_24px]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full pt-20 px-4 md:pt-32 md:px-12 overflow-hidden pb-10">
        {IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-2xl shadow-purple-900/20 border border-slate-800 bg-slate-900"
          >
            <img
              className="size-full object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-500"
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="z-10 pointer-events-none mt-5">
        <div className="flex items-center justify-center w-full">
          <AnchorCard />
        </div>
      </ContainerScale>
    </ContainerScroll>
  );
};

export default ScrollImageGrid;
