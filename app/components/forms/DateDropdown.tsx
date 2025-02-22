"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface DatePickerProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export function DatePicker<T extends FieldValues>({ field }: DatePickerProps<T>) {
//   const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger id="date" asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? (
            format(new Date(field.value), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent id="date" className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value ? new Date(field.value) : undefined}
          onSelect={(date) => field.onChange(date?.toISOString() ?? "")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
