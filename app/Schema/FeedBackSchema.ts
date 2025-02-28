import { z } from "zod";

export const feedBackSchema = z.object({
  overallRating: z.number().min(1).max(5),
  likeMost: z.enum(
    ["userInterface", "features", "easeOfUse", "performance", "support"],
    {
      required_error: "Please select what you like most about ProTrack.",
    }
  ),
  generalFeedback: z.string().min(10, "Please provide more detailed feedback."),
  wouldRecommend: z.enum(["yes", "no"], {
    required_error: "Please indicate if you would recommend ProTrack.",
  }),
});
