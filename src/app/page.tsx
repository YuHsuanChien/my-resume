import Banner from '@/components/home/banner';
import Portfolio from '@/components/home/portfolio';
import AboutMe from '@/components/home/aboutme';
import Skill from '@/components/home/skill';

export default function Home() {
  return (
    <section className="mx-auto flex min-h-screen flex-col items-center justify-between">
      <Banner />
      <Skill />
      <Portfolio />
      <AboutMe />
    </section>
  );
}
