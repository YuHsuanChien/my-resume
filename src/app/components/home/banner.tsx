import {
	FaGithub,
	FaInstagram,
	FaFacebook,
	FaArrowAltCircleDown,
} from "react-icons/fa";

export default function Banner() {
	return (
		<section className='w-full h-screen min-h-[600px] overflow-hidden relative bg-[url("/banner/bg-banner.jpg")] bg-cover bg-center bg-no-repeat flex flex-col items-center'>
			<div className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 xl:w-64 xl:h-64 2xl:w-80 2xl:h-80 mt-25 lg:mt-50'>
				<img
					className='w-full h-full object-contain'
					src='/banner/avataaars.png'
				/>
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

			{/* <div className='mt-12 lg:mt-10 2xl:mt-8'>
				<a
					href='#AboutMe'
					className='flex flex-col items-center justify-center animate-bounce'>
					<p className='text-xl lg:text-2xl text-white'>active</p>
					<FaArrowAltCircleDown className='text-xl lg:text-2xl text-white' />
				</a>
			</div> */}
		</section>
	);
}
