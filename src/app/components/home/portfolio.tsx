"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Pic {
	name: string;
	url: string;
}

export default function Portfolio() {
	const pics: Pic[] = [
		{
			name: "CICD",
			url: "/portfolio/cicd.png",
		},
		{
			name: "gx",
			url: "/portfolio/gx.png",
		},
		{
			name: "gcp",
			url: "/portfolio/gcp.png",
		},
		{
			name: "Hofit",
			url: "/portfolio/Hofit.png",
		},
		{
			name: "xsg",
			url: "/portfolio/xsg.png",
		},
		{
			name: "stock",
			url: "/portfolio/stock.png",
		},
		{
			name: "CICD2",
			url: "/portfolio/cicd.png",
		},
		{
			name: "gx2",
			url: "/portfolio/gx.png",
		},
		{
			name: "Hofit2",
			url: "/portfolio/Hofit.png",
		},
	];

	const container = React.useRef<HTMLDivElement>(null);
	const wrapper = React.useRef<HTMLElement>(null);
	const imgRefs = React.useRef<(HTMLDivElement | null)[]>([]);

	/**
	 * 作品集圖片牆放大縮小
	 */
	useGSAP(() => {
		const el = container.current;
		const wrapperEl = wrapper.current;
		const middlePic = imgRefs.current[4];

		if (!middlePic) return;

		const rectBefore = el!.getBoundingClientRect();
		console.log("容器原始尺寸：", rectBefore);

		gsap.set(el, {
			rowGap: "100px",
			columnGap: "200px",
			width: rectBefore.width * 2,
			height: rectBefore.height * 2,
		});

		// 測量放大後的格子尺寸
		const rect = middlePic.getBoundingClientRect();
		console.log("放大後格子尺寸：", rect);

		const newDiv = document.createElement("div");
		newDiv.className =
			"newDiv bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center";
		el?.appendChild(newDiv);

		const newSpan = document.createElement("span");
		newSpan.className = "newSpanEl text-white text-2xl";
		newSpan.textContent = "作品集...";
		newDiv.appendChild(newSpan);

		gsap.set(".newDiv", {
			width: rect.width * 2,
			height: rect.height * 2,
		});

		gsap.set(middlePic, { opacity: 0 });

		gsap.set(".newSpanEl", { opacity: 1 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapperEl,
				start: "center center",
				end: "+=200%",
				pin: wrapperEl,
				scrub: 0.5,
				pinSpacing: true,
				markers: false,
			},
		});

		tl.to(el, {
			rowGap: "10px",
			columnGap: "35px",
			width: rectBefore.width,
			height: rectBefore.height,
			onComplete: () => {
				// 動畫完成後測量實際的格子尺寸
				const finalRect = middlePic.getBoundingClientRect();
				console.log("動畫完成後的實際格子尺寸：", finalRect);
			},
		})
			.to(
				".newSpanEl",
				{
					opacity: 0,
					duration: 0.5,
				},
				-0.4
			)
			.to(
				".newDiv",
				{
					width: rect.width / 2, // 因為容器縮小到 1/3，格子也會縮小到相應比例
					height: rect.height / 2,
					duration: 1.5,
				},
				-0.4
			)
			.to(".newDiv", { opacity: 0, duration: 0.01 })
			.to(middlePic, { opacity: 1, duration: 0.01 });

		/**
		 * 中間行向下滑動，不再pin
		 */
		const moveEls = gsap.utils.toArray<HTMLElement>(".moveEl");
		moveEls.forEach((el) => {
			gsap.to(el, {
				y: 100,
				delay: -0.5,
				scrollTrigger: {
					trigger: wrapperEl,
					start: "480px center",
					end: "bottom top",
					scrub: true,
					markers: true,
				},
			});
		});
	});

	return (
		<section
			className='text-center text-3xl text-gray-700 w-full h-screen overflow-hidden relative bg-amber-100/30 brightness-70'
			ref={wrapper}>
			<div
				className='grid grid-cols-3 grid-rows-3 w-full h-full gap-10 px-3 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				ref={container}>
				{pics.map((pic, index) => {
					return (
						<div
							key={pic.name}
							ref={(el) => {
								imgRefs.current[index] = el;
							}}
							className={`${
								index === 1 || index === 4 || index === 7 ? "moveEl" : ""
							}`}>
							<img
								src={pic.url}
								alt={pic.name}
								className='object-cover w-full h-full shadow-lg'
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
}
