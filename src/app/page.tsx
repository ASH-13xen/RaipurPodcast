import { AboutHost } from "@/components/abouthost/AboutTheHost";
import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header/Header";
import LandingHero from "@/components/hero/ImageComp";
import SlidingHero from "@/components/hero/SlidingHero";
import { PodcastCategories } from "@/components/podcastCategories/PodcastCategories";
import { RecentEpisodes } from "@/components/recentepisode/RecentEpisodes";
import StaggeredTestimonials from "@/components/testimonials";
export default function Home() {
  return (
    <>
      <SlidingHero />
      <FeaturedEpisode />
      <RecentEpisodes />
      <StaggeredTestimonials />
      <Footer />
    </>
  );
}
