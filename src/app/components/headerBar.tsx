"use client";
import { useSidebarStore } from "@/stores/inedex";

export default function HeaderBar() {
	const url: Array<{
		name: string;
		link: string;
	}> = [
		{ name: "AboutMe", link: "#AboutMe" },
		{ name: "Portfolio", link: "#Portfolio" },
		{ name: "ContactMe", link: "#contactUs" },
	];

	const { isOpen, toggle } = useSidebarStore();

	return (
		<section className='w-screen fixed z-10 bg-black lg:px-6 xl:px-12 2xl:px-16'>
			<div className='flex justify-between items-center py-2 container'>
				<div className='h1 text-white'>JK.chien</div>
				<div>
					<ul className='hidden lg:block'>
						{url.map((item) => (
							<li key={item.name} className='text-white inline-block px-4'>
								<a href={item.link}>{item.name}</a>
							</li>
						))}
					</ul>
					<div
						className='lg:hidden relative w-[44px] h-[44px] group'
						onClick={toggle}>
						<span
							className={`absolute w-[34px] h-[4px] bg-white left-[5px] rounded-[30px] transition-all duration-300  ${
								isOpen
									? "rotate-45 top-[calc(50%-3.5px)]"
									: "top-[calc(50%-12px)]"
							}`}></span>
						<span
							className={`absolute w-[34px] h-[4px] bg-white  left-[5px] rounded-[30px] transition-all -translate-y-[50%]   ${
								isOpen ? "rotate-45 top-[calc(50%-2px)]" : "top-1/2"
							}`}></span>
						<span
							className={`absolute w-[34px] h-[4px] bg-white  left-[5px] rounded-[30px] transition-all ${
								isOpen
									? "-rotate-45 top-[calc(50%-3px)]"
									: "top-[calc(50%+8px)]"
							}`}></span>
					</div>
				</div>
			</div>
		</section>
	);
}
