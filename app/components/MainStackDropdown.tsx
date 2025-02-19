"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ControllerRenderProps } from "react-hook-form"; // Import type
import { projectSchema } from "../Schema/AddProjectFormSchema";
import { z } from "zod";

type formValues = z.infer<typeof projectSchema>;

type MainStackDropdownProps = {
  field: ControllerRenderProps<formValues, "mainStack">;
};

const techStacks = ["React", "Next.js", "Flutter", "Java", "Node.js", "Python"];

export function MainStackDropdown({ field }: MainStackDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState<string[]>(
    field.value || []
  );

  const handleSelect = (stack: string) => {
    if (selectedStacks.includes(stack)) {
      // Remove stack if already selected
      const updatedStacks = selectedStacks.filter((s) => s !== stack);
      setSelectedStacks(updatedStacks);
      field.onChange(updatedStacks);
    } else if (selectedStacks.length < 3) {
      // Add new stack if under limit
      const updatedStacks = [...selectedStacks, stack];
      setSelectedStacks(updatedStacks);
      field.onChange(updatedStacks);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStacks.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedStacks.map((stack) => (
                <Badge key={stack} variant="secondary">
                  {stack}
                </Badge>
              ))}
            </div>
          ) : (
            "Select Main Stack"
          )}
          <ChevronsUpDown className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search stack..." />
          <CommandList>
            <CommandEmpty>No stack found.</CommandEmpty>
            {techStacks.map((stack) => (
              <CommandItem key={stack} onSelect={() => handleSelect(stack)}>
                {stack}
                <Check
                  className={`ml-auto ${
                    selectedStacks.includes(stack) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
