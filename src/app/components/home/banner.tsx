"use client";
import React, { use, useEffect } from "react";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin);

export default function Banner() {
	const container = React.useRef<HTMLElement>(null);
	const JKiconEl = React.useRef<HTMLImageElement | null>(null);
	const dotsEl = React.useRef<(HTMLDivElement | null)[]>([]);

	// useEffect(() => {
	// 	const el = JKiconEl.current;
	// 	if (el) {
	// 		el.style.transition = "transform 0.25s cubic-bezier(1,0,0.2,1)";
	// 	}

	// 	/**
	// 	 * 滑鼠移動時判斷是否接近 JKiconEl，接近則讓 JKiconEl 閃避（移動），離開則回原位。
	// 	 * @param e MouseEvent 滑鼠事件
	// 	 */

	// 	/**
	// 	 * 使用節流優化的版本 - 進一步提升性能
	// 	 */
	// 	let isAnimating = false; // 🚦 動畫狀態標記，避免過度頻繁執行

	// 	function handleMouseMoveOptimized(e: MouseEvent) {
	// 		// ❌ 節流控制：如果正在執行動畫或元素不存在，直接跳過
	// 		if (isAnimating || !JKiconEl.current) return;

	// 		isAnimating = true; // 🔒 標記開始執行動畫

	// 		// 🎯 使用 requestAnimationFrame 確保動畫在瀏覽器最佳時機執行
	// 		requestAnimationFrame(() => {
	// 			// 🔍 二次檢查元素是否存在（安全性考量）
	// 			if (!JKiconEl.current) {
	// 				isAnimating = false; // 🔓 釋放動畫鎖
	// 				return;
	// 			}

	// 			// 📏 取得元素的位置和尺寸資訊
	// 			const rect = JKiconEl.current.getBoundingClientRect();
	// 			// 🖱️ 取得滑鼠當前座標
	// 			const mouseX = e.clientX;
	// 			const mouseY = e.clientY;

	// 			// 🎯 計算元素中心點座標
	// 			const centerX = rect.left + rect.width / 2;
	// 			const centerY = rect.top + rect.height / 2;

	// 			// 📐 計算滑鼠到元素中心的直線距離（畢達哥拉斯定理）
	// 			const distance = Math.sqrt(
	// 				Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
	// 			);

	// 			const threshold = 200; // 🎚️ 閾值：觸發閃避的距離範圍

	// 			if (distance < threshold) {
	// 				// 🏃‍♂️ 滑鼠太近了！開始閃避...

	// 				// ➡️ 計算從滑鼠指向元素中心的方向向量
	// 				const dx = centerX - mouseX;
	// 				const dy = centerY - mouseY;

	// 				// 📏 計算向量長度（用於正規化）
	// 				const len = Math.sqrt(dx * dx + dy * dy) || 1; // || 1 避免除以零

	// 				// 🎨 使用緩動函數讓移動更自然
	// 				const intensity = Math.min(1, (threshold - distance) / threshold); // 0~1 的強度
	// 				const easeOut = 1 - Math.pow(1 - intensity, 3); // cubic ease-out 緩動

	// 				// 🎯 計算最終要移動的距離
	// 				// (dx/len) = 正規化後的方向向量
	// 				// (threshold - distance) = 基礎移動距離
	// 				// easeOut = 緩動係數
	// 				const moveX = (dx / len) * (threshold - distance) * easeOut;
	// 				const moveY = (dy / len) * (threshold - distance) * easeOut;

	// 				// ⚡ 執行閃避動畫（硬體加速 + 快速過渡）
	// 				JKiconEl.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
	// 				JKiconEl.current.style.transition = "transform 0.08s ease-out";
	// 			} else {
	// 				// 😌 滑鼠離遠了，回到原位
	// 				JKiconEl.current.style.transform = "translate3d(0, 0, 0)";
	// 				JKiconEl.current.style.transition =
	// 					"transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // 緩慢回原位
	// 			}

	// 			isAnimating = false; // 🔓 釋放動畫鎖
	// 		});
	// 	}
	// 	document.addEventListener("mousemove", handleMouseMoveOptimized);
	// 	return () => {
	// 		if (JKiconEl.current) JKiconEl.current.style.transform = "";
	// 		document.removeEventListener("mousemove", handleMouseMoveOptimized);
	// 	};
	// }, []);

	/**
	 * 使用 GSAP 的 useGSAP Hook 來處理動畫效果
	 * 當組件進入視圖時，JKiconEl 會從下方淡入並移動到原位
	 */
	useGSAP(() => {
		const el = JKiconEl.current;
		const dots = dotsEl.current;
		const tl = gsap.timeline();
		if (!el) return;

		tl.from(el, {
			delay: 0,
			opacity: 0,
			y: -200,
			duration: 1.5, // 稍微延長時間讓彈跳更明顯
			ease: "bounce.out", // 內建的彈跳效果
		});
		tl.to(el, {
			rotateZ: 5,
			duration: 0.3,
			ease: "power3.out",
		});

		//把 dots 變數做foreach來做為時間線動畫
		dots.forEach((dot) => {
			if (!dot) return;
			tl.to(dot, {
				opacity: 1,
				duration: 0.5,
				ease: "power3.out",
			});
		});

		tl.to(dots, {
			opacity: 0,
			duration: 0.5,
			ease: "power3.out",
		});

		tl.to(el, {
			rotateZ: 0,
			duration: 0.3,
			ease: "power3.out",
		});

		tl.to(".talk", {
			opacity: 1,
			scale: 1,
			duration: 0.5,
			ease: "power3.out",
		});
	});

	return (
		<section
			className='w-full h-screen min-h-[600px] 2xl:min-h-[900px] overflow-hidden relative flex flex-col items-center justify-center before:content-[""] before:absolute before:inset-0 before:bg-[url("/banner/bg-banner.jpg")] before:bg-cover before:bg-center before:bg-no-repeat before:brightness-50 before:z-[-1]'
			ref={container}>
			<div className='relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 xl:w-64 xl:h-64 2xl:w-80 2xl:h-80'>
				<img
					ref={JKiconEl}
					className='w-full h-full object-contain'
					src='/banner/avataaars.png'
				/>
				{/* 白色點點 */}
				<div className='absolute top-0 right-0 flex justify-start items-center gap-6'>
					{Array(3)
						.fill(null)
						.map((_, index) => {
							return (
								<div
									key={index}
									ref={(el) => {
										dotsEl.current[index] = el;
									}}
									className='w-3 h-3 rounded-full bg-white opacity-0 dot'></div>
							);
						})}
				</div>

				{/* 嗨 */}
				<div className='absolute -top-10 -right-10 flex justify-start items-center gap-6 opacity-0 scale-0 talk'>
					<div className='relative w-25 h-25 bg-white border border-white rounded-full before:content-[""] before:absolute before:bottom-[-5px] before:left-3 before:rotate-30 before:w-0 before:h-0 before:border-l-[15px] before:border-r-[15px] before:border-t-[15px] before:border-l-transparent before:border-r-transparent before:border-t-white'>
						<p className='relative top-1/2 left-19 -translate-x-1/2 -translate-y-1/2 text-4xl font-medium text-gray-800'>
							Hi
						</p>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-10  text-white'>
				<h2 className='h2'>Jackall</h2>
				<h5 className='h4 md:mt-3 xl:mt-5'>I&apos;m a Front-end engineer</h5>
			</div>
			<ul className='flex justify-center items-center space-x-6 text-3xl text-white mt-10'>
				<li className='ig'>
					<a target='_blank' href='https://www.instagram.com/yushuanomg/'>
						<FaInstagram className='text-4xl text-white hover:scale-125 transition-transform duration-200' />
					</a>
				</li>
				<li className='fb'>
					<a
						target='_blank'
						href='https://www.facebook.com/profile.php?id=100002306538316&locale=zh_TW'>
						<FaFacebook className='text-4xl text-white hover:scale-125 transition-transform duration-200' />
					</a>
				</li>
				<li className='github'>
					<a target='_blank' href='https://github.com/YuHsuanChien'>
						<FaGithub className='text-4xl text-white hover:scale-125 transition-transform duration-200' />
					</a>
				</li>
			</ul>
		</section>
	);
}
