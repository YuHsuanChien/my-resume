'use client';
import { IoIosArrowRoundDown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillIcon {
  id: string;
  name: string;
  svg: string;
}

export default function Skill() {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [skillsData, setSkillsData] = useState<SkillIcon[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('/json/skill.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSkillsData(data);
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (skillsData.length === 0) return;

    // 使用 setTimeout 確保 DOM 已經渲染完成
    const timer = setTimeout(() => {
      const icons = iconsRef.current.filter(Boolean);
      const container = containerRef.current;

      if (icons.length > 0 && container) {
        // 取得容器的尺寸
        const containerRect = container.getBoundingClientRect();

        // 對每個 icon 設定從容器右下角到它們各自位置的動畫
        icons.forEach((icon) => {
          if (!icon) return;

          // 取得每個 icon 在 grid 中的最終位置
          const iconRect = icon.getBoundingClientRect();
          const containerLeft = containerRect.left;
          const containerTop = containerRect.top;

          // 計算從容器右下角到 icon 最終位置的距離
          const containerRightBottom = {
            x: containerRect.width - 48, // 容器寬度減去 icon 寬度 (48px)
            y: containerRect.height - 48, // 容器高度減去 icon 高度 (48px)
          };

          const iconFinalPosition = {
            x: iconRect.left - containerLeft - 16, // 減去 padding
            y: iconRect.top - containerTop - 16, // 減去 padding
          };

          // 設定初始位置（容器右下角）
          gsap.set(icon, {
            x: containerRightBottom.x - iconFinalPosition.x,
            y: containerRightBottom.y - iconFinalPosition.y,
            opacity: 0,
            scale: 0.3,
          });
        });

        // 創建飛入動畫
        gsap.to(icons, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1, // 每個 icon 延遲 0.1 秒
          ease: 'back.out(0.8)',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            // play - 當第一次進入觸發區域時：播放動畫
            // none - 當離開觸發區域時：什麼都不做
            // none - 當反向滾動重新進入觸發區域時：什麼都不做
            // reverse - 當反向滾動離開觸發區域時：反向播放動畫
          },
        });
      }
    }, 100); // 延遲 100ms 確保 DOM 渲染完成

    return () => clearTimeout(timer);
  }, [skillsData]); // 依賴於 skillsData，當資料載入後執行動畫

  
  return (
    <section className="w-full flex flex-col pb-20" ref={sectionRef}>
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
              <div className="w-16 h-16 border-2 border-white rounded-full bg-white shadow-lg shadow-white/30 flex justify-center items-center group">
                <IoIosArrowRoundDown className="text-4xl text-black group-hover:scale-125 transition-transform duration-200" />
              </div>
            </div>
          </div>
          {/* 技能icon排列 */}
          <div
            ref={containerRef}
            className="p-4 col-span-5 grid grid-cols-6 grid-rows-4 place-items-center relative"
          >
            {skillsData.map((item, index) => {
              return (
                <div
                  className="w-12 h-12"
                  data-icon={item.name}
                  ref={(el) => {
                    iconsRef.current[index] = el;
                  }}
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: item.svg.replace(/className=/g, 'class='),
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
