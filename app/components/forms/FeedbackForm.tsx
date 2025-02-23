"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Star } from "lucide-react";

const formSchema = z.object({
  overallRating: z.number().min(1).max(5),
  easeOfUse: z.number().min(1).max(5),
  features: z.number().min(1).max(5),
  design: z.number().min(1).max(5),
  likeMost: z.string({
    required_error: "Please select what you like most about ProTrack.",
  }),
  improvements: z
    .array(z.string())
    .min(1, "Please select at least one area for improvement."),
  generalFeedback: z.string().min(10, "Please provide more detailed feedback."),
  wouldRecommend: z.enum(["yes", "no"], {
    required_error: "Please indicate if you would recommend ProTrack.",
  }),
});

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

export function FeedbackForm() {
  const [overallRating, setOverallRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overallRating: 0,
      easeOfUse: 0,
      features: 0,
      design: 0,
      likeMost: "",
      improvements: [],
      generalFeedback: "",
      wouldRecommend: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission here
    console.log(values);
  }

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto p-6 border rounded-lg shadow-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">
          ProTrack Feedback
        </h2>
        <p className="text-gray-600">Help us improve your experience</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="overallRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Rating</FormLabel>
                <FormControl>
                  <StarRating
                    rating={overallRating}
                    onRatingChange={(rating) => {
                      setOverallRating(rating);
                      field.onChange(rating);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["easeOfUse", "features", "design"].map((aspect) => (
              <FormField
                key={aspect}
                control={form.control}
                name={aspect as "easeOfUse" | "features" | "design"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {aspect
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onRatingChange={(rating) => field.onChange(rating)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormField
            control={form.control}
            name="likeMost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you like most about ProTrack?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select what you like most" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="userInterface">
                      User Interface
                    </SelectItem>
                    <SelectItem value="features">Features</SelectItem>
                    <SelectItem value="easeOfUse">Ease of Use</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="improvements"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Areas for improvement
                  </FormLabel>
                  <FormDescription>Select all that apply.</FormDescription>
                </div>
                {[
                  "userInterface",
                  "features",
                  "easeOfUse",
                  "performance",
                  "support",
                ].map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="improvements"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="generalFeedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share any additional thoughts or suggestions..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wouldRecommend"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Would you recommend ProTrack to others?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 dark:text-white hover:bg-purple-700"
          >
            Submit Feedback
          </Button>
        </form>
      </Form>
    </div>
  );
}
