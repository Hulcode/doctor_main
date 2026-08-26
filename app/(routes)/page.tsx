import Hero from "./(layout)/Hero";
import BookingSection from "@/app/(routes)/(layout)/BookingSection";
import ReviewsSection from "./(layout)/Reviews";
export default function Home() {
  return (
    <>
      <Hero />

      <BookingSection />

      <ReviewsSection />
    </>
  );
}
