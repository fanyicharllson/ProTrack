"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
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
// import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Star } from "lucide-react";
import { memo } from "react";
import { feedBackSchema } from "@/app/Schema/FeedBackSchema";
import Message from "../message";
import Loadingspin from "../loadingspin";

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

const FeedbackForm = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof feedBackSchema>>({
    resolver: zodResolver(feedBackSchema),
    defaultValues: {
      overallRating: 0,
      likeMost: undefined,
      generalFeedback: "",
      wouldRecommend: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof feedBackSchema>) => {
    setSuccessMessage("");
    setErrorMessage("");

    const response = await fetch("api/feedback/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        overallRating: values.overallRating,
        likeMost: values.likeMost,
        generalFeedback: values.generalFeedback,
        wouldRecommend: values.wouldRecommend,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage(data.message);
      form.reset();
    } else {
      setErrorMessage("Something went wrong. Please try again.");
      form.reset();
    }
  };

  return (
    <>
      {successMessage && <Message type="success" message={successMessage} />}
      {errorMessage && <Message type="error" message={errorMessage} />}
      <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md max-sm-500:w-[92%]">
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-purple-700">
            ProTrack Feedback
          </h2>
          <p className="text-gray-600 text-sm">
            Help us improve your experience
          </p>
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
              name="generalFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>General Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share any additional thoughts or suggestions..."
                      className="resize-none text-sm"
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
              className="w-full bg-purple-600 dark:text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-30"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-4">
                 <Loadingspin/>
                  <span>Submiting feedback...</span>
                </div>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default memo(FeedbackForm);
