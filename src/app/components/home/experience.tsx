'use client';

import { useState, useRef, useEffect } from 'react';
import { TbWriting } from 'react-icons/tb';
import { MdEventNote } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { useExperienceAlertStore } from '@/stores/inedex';

export default function Experience() {
  const experienceData = [
    {
      id: 1,
      title: 'Brand Designer',
      type: 'brand_designer',
      description:
        'Creating visual identities and brand experiences that resonate with audiences.',
      icon: TbWriting,
    },
    {
      id: 2,
      title: 'Event Planner',
      type: 'event_planner',
      description:
        'Organizing memorable events with attention to detail and creativity.',
      icon: MdEventNote,
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      type: 'full_stack_developer',
      description:
        'Building end-to-end web solutions with modern technologies and best practices.',
      icon: FaCode,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const setExperienceAlertIsOpen = useExperienceAlertStore(
    (state) => state.setExperienceAlertIsOpen,
  );
  const setType = useExperienceAlertStore((state) => state.setType);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % experienceData.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prev) => (prev - 1 + experienceData.length) % experienceData.length,
      );
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getCardStyle = (index: number) => {
    // 在 SSR 時返回基本樣式,避免 hydration 不一致
    if (!isMounted) {
      return {
        width: '300px',
        height: '350px',
        opacity: 0.8,
        zIndex: 1,
      };
    }

    const totalCards = experienceData.length;
    const angle =
      ((index - currentIndex + totalCards) % totalCards) * (360 / totalCards);
    const radius = 400; // 軸心半徑

    // 計算 3D 位置
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;

    // 判斷是否為當前卡片
    const isCurrent = index === currentIndex;
    const isHovered = index === hoveredIndex;
    const scale = isCurrent ? 1 : 0.8;
    const opacity = isCurrent ? 1 : 0.5;

    return {
      width: '250px',
      height: '300px',
      transform: isHovered
        ? `translate3d(${x}px, 0px, ${z}px) rotateY(${-angle}deg)  scale(${scale})`
        : `translate3d(${x}px, 0px, ${z}px) rotateY(${-angle}deg)  scale(${scale})`,
      opacity,
      zIndex: isCurrent ? 10 : 1,
      boxShadow: isHovered
        ? 'inset 0 0 64px 0px #00E5FF'
        : isCurrent
        ? 'inset 0 0 54px 0px #00D9FF'
        : 'inset 0 0 54px 0px #6366F1',
      border: isCurrent ? '3px solid #00D9FF' : '2px solid transparent',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <section className="w-full flex flex-col pb-20 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col justify-center items-center">
        <div className="w-[60px] h-[60px] mb-6">
          <img
            src="experience/star.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-white text-6xl font-bold mb-8">EXPERIENCE</h2>
        <p className="text-white text-base text-center max-w-2xl mb-8">
          Though not from a computer science background, my web design
          experience helps me connect technology with user experience as a
          full-stack engineer.
        </p>

        {/* 3D 卡片容器 */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{
              perspective: '2000px',
              perspectiveOrigin: 'center center',
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {experienceData.map((item, index) => (
                <div
                  key={item.id}
                  className="absolute p-8 rounded-xl shadow-2xl transition-all duration-600 ease-out"
                  style={getCardStyle(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="flex flex-col items-center justify-center h-full absolute inset-0"
                    style={{
                      WebkitFontSmoothing: 'antialiased',
                      textRendering: 'optimizeLegibility',
                    }}
                  >
                    <div className="p-3 mb-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-4xl">
                      <item.icon />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 text-center">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 text-center px-4">
                      {item.description}
                    </p>
                    <button
                      className="mt-4 relative group px-6 py-2 bg-gradient-to-r from-purple-900/50 via-indigo-800/40 to-pink-900/50 border border-purple-400/60 rounded-lg transition-all duration-300 hover:from-purple-600/60 hover:via-indigo-500/50 hover:to-pink-600/60 hover:border-purple-300/80 hover:shadow-lg hover:shadow-purple-500/40 overflow-hidden cursor-pointer"
                      style={{
                        WebkitFontSmoothing: 'antialiased',
                        textRendering: 'optimizeLegibility',
                      }}
                      onClick={() => {
                        setExperienceAlertIsOpen(true);
                        setType(item.type);
                      }}
                    >
                      {/* 科技感背景動畫 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

                      {/* 按鈕文字 */}
                      <span className="relative z-10 text-purple-200 font-medium text-sm group-hover:text-white transition-colors duration-300">
                        Read More
                      </span>

                      {/* 科技感邊框動畫 */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-pink-400 to-transparent"></div>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 控制按鈕 */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all z-20 backdrop-blur-sm"
            disabled={isAnimating}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all z-20 backdrop-blur-sm"
            disabled={isAnimating}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* 指示器 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {experienceData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 600);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
