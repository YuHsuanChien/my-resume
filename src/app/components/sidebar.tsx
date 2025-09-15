"use client";
import { useSidebarStore } from "@/stores/inedex";
import { useEffect, useRef } from "react";

export default function Sidebar() {
	const { isOpen, toggle } = useSidebarStore();

	const sideBarEl = useRef<HTMLDivElement>(null);

	/**
	 * 監聽視窗大小，關閉 sidebar
	 */
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				if (isOpen) {
					toggle(); // 關閉 sidebar
				}
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen, toggle]);

	/**
	 * 使用useEffect 監聽點擊事件
	 * 點擊不包含 sidebar 的地方就關起來
	 */
	useEffect(() => {
		// 只有當 sidebar 開啟時才添加監聽器
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			// ✅ 修正3: 正確處理 event.target 類型
			const target = event.target as Node;

			if (sideBarEl.current && !sideBarEl.current.contains(target)) {
				toggle();
			}
		}

		// 延遲添加監聽器，避免立即觸發
		const timeoutId = setTimeout(() => {
			document.addEventListener("click", handleClickOutside);
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isOpen, toggle]);

	return (
		<div
			ref={sideBarEl}
			className={`fixed top-0 right-0 w-64 h-screen bg-gray-800 text-white p-4 transition-all duration-500
 ${isOpen ? "translate-x-0" : "translate-x-[110%]"}`}>
			{/* X icon */}
			<div className='flex justify-end'>
				<button
					onClick={toggle}
					className='relative w-8 h-8 flex items-center justify-center focus:outline-none'
					aria-label='Close sidebar'>
					<span className='absolute block w-6 h-0.5 bg-white rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all'></span>
					<span className='absolute block w-6 h-0.5 bg-white rounded left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all'></span>
				</button>
			</div>
		</div>
	);
}
