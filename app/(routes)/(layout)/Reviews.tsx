import { prisma } from "@/lib/prisma";
import ReviewsCarousel from "../(componants)/ReviewsCarousel";

const ReviewsSection = async () => {
  // Fetch doctor
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <section
        id="reviews"
        dir="rtl"
        className="relative overflow-hidden bg-[#f7fafc] py-24"
      >
        <div className="p-10 text-center">
          <p className="text-red-500">⚠️ لم يتم العثور على طبيب.</p>
        </div>
      </section>
    );
  }

  // Fetch approved reviews
  const reviewsData = await prisma.review.findMany({
    where: {
      doctorId: doctor.id,
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Format reviews
  const reviews = reviewsData.map((review) => ({
    id: review.id,
    name: review.name,
    rating: review.stars,
    text: review.content,
  }));

  return <ReviewsCarousel reviews={reviews} />;
};

export default ReviewsSection;
