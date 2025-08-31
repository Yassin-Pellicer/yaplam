import { t } from "i18next";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";

export const Carousel = ({ items }: any) => {
  const baseX = useMotionValue(0);
  const itemHeight = 300;
  const totalHeight = items.length * itemHeight;

  useAnimationFrame((t) => {
    baseX.set((t / 20) % (totalHeight + itemHeight / 2 - 20));
  });

  return (
    <div className="flex relative items-center justify-center h-[300px] overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
            rgb(57, 119, 212) 0%, 
            transparent 5%, 
            transparent 95%, 
            rgb(50, 104, 196) 100%)`,
        }}
      />
      <motion.div
        className="flex flex-row gap-6"
        style={{
          x: useTransform(baseX, (val) => -(val + itemHeight / 2)),
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="w-[300px] bg-blue-200 h-[300px] rounded-xl shadow-xl border border-gray-200 px-6 py-4 flex flex-col justify-center relative"
          >
            {item.incoming === true && (
              <div className="absolute top-4 right-4 flex flex-row items-center justify-center gap-2 bg-green-100 w-fit rounded-full px-1 text-black font-bold tracking-tighter border-2 border-red-500">
                <div className="relative h-2 w-2 rounded-full bg-red-500 animate-pulse">
                  <div className="absolute h-2 w-2 rounded-full bg-red-500 animate-[ping_0.75s_infinite]"></div>
                </div>
                <span className="text-xs">{t("carousel.dev")}</span>
              </div>
            )}
            <div className="text-8xl mb-4 text-center border-b border-black pb-4">
              {item.emoji}
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {item.title}
            </div>
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};