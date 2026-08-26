import { prisma } from "@/lib/prisma";
import ReviewsContent from "../(componants)/ReviewsContent";

const Reviews = async () => {
  // Fetch doctor
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <section
        id="reviews"
        dir="rtl"
        className="relative py-14 bg-gradient-to-b from-white to-[#f7fafc] overflow-hidden"
      >
        <div className="p-10 text-center">
          <p className="text-red-500">⚠️ لم يتم العثور على طبيب.</p>
        </div>
      </section>
    );
  }

  // Fetch approved reviews from database
  const reviews = await prisma.review.findMany({
    where: {
      doctorId: doctor.id,
      status: "APPROVED", // Only show approved reviews
    },

    orderBy: {
      createdAt: "desc", // Latest reviews first
    },
  });

  // Transform reviews to match the expected format
  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    name: review.name,
    rating: review.stars,
    date: review.createdAt.toISOString().split("T")[0],
    comment: review.content,
    likes: 0, // Placeholder since we don't have likes in DB
  }));

  return (
    <ReviewsContent initialReviews={formattedReviews} doctorId={doctor.id} />
  );
};

export default Reviews;
