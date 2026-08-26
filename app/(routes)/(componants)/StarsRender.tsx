import { Star } from "lucide-react";

type RenderStarsProps = {
  rating: number;
  interactive?: boolean;
  setRating?: (value: number) => void;
  hoverRating?: number;
  setHoverRating?: (value: number) => void;
};

const RenderStars = ({
  rating,
  interactive = false,
  setRating,
  hoverRating = 0,
  setHoverRating,
}: RenderStarsProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && setRating?.(star)}
          onMouseEnter={() => interactive && setHoverRating?.(star)}
          onMouseLeave={() => interactive && setHoverRating?.(0)}
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-all`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= (hoverRating || rating)
                ? "fill-[#fbbf24] text-[#fbbf24]"
                : "fill-gray-200 text-gray-200"
            } ${interactive ? "hover:scale-110 transition-transform" : ""}`}
          />
        </button>
      ))}
    </div>
  );
};

export default RenderStars;
