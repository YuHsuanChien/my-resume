'use client';
import { IoIosArrowRoundDown } from 'react-icons/io';

export default function Skill() {
  return (
    <section className="w-full flex flex-col border border-2 border-dashed border-white py-32">
      <div className="max-w-7xl w-full mx-auto flex flex-col">
        <p className="text-white">_____ My Skill?</p>
        <div className=" w-full flex justify-between items-center text-white">
          {/* 左邊文字 */}
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-3xl font-black mt-4">
              WHAT I&#39;M<br></br>OFFERING
            </h2>
          </div>
          {/* 中間的內容 */}
          <div>
            <p>
              Specialized in full-stack web development <br></br>with hands-on
              experience in GCP cloud architecture, Docker, and CI/CD pipelines
            </p>
          </div>
          {/* 右邊內容 */}
          <div>
            <button
              data-slot="button"
              className="inline-flex relative uppercase border font-mono cursor-pointer items-center has-[&gt;svg]:px-3 justify-center gap-2 whitespace-nowrap font-medium ease-out transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))] bg-background border-primary text-primary-foreground [&amp;&gt;[data-border]]:bg-primary [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#EBB800] hover:shadow-[#EBB800]/80 h-10 px-6 text-base border-yellow-400"
              style={{ '--poly-roundness': '16px' } as React.CSSProperties}
            >
              <span
                data-border="top-left"
                className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2 bg-yellow-500"
                style={
                  { '--h': '32px', '--hh': '6.5px' } as React.CSSProperties
                }
              ></span>
              <span
                data-border="bottom-right"
                className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2 bg-yellow-400"
                style={
                  { '--h': '32px', '--hh': '6.5px' } as React.CSSProperties
                }
              ></span>
              [ALL SKILLS]
            </button>
          </div>
        </div>
        {/* 下方技能 */}
        <div className="grid grid-cols-6">
          {/* 左側裝飾 */}
          <div className="flex justify-start pl-4 py-10">
            <div className="flex flex-col items-center gap-6">
              <span className="text-white text-xs [writing-mode:vertical-rl] rotate-180">
                SCROLL DOWN
              </span>
              <span className="inline-block w-[1px] h-[100px] bg-white"></span>
              <div className="w-16 h-16 border border-white border-2 rounded-full bg-white shadow-lg shadow-white/30 flex justify-center items-center group">
                <IoIosArrowRoundDown className="text-4xl text-black group-hover:scale-125 transition-transform duration-200" />
              </div>
            </div>
          </div>
          {/* 技能icon排列 */}
          <div className="p-4 border border-white col-span-5"></div>
        </div>
      </div>
    </section>
  );
}
