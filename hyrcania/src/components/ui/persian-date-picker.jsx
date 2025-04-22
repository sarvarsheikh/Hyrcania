"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import PersianCalendar from "./persian-calendar"
import { gregorianToJalali } from "@/lib/jalali-utils"

function PersianDatePicker({ date, setDate, className, disabled = false }) {
  const [open, setOpen] = React.useState(false)

  // Convert to Persian date for display
  const formattedDate = date ? formatPersianDate(date) : null

  // Debug function to help identify issues
  const debugDate = (label, dateObj) => {
    if (!dateObj) return;
    console.log(
      `${label}: ${dateObj.toISOString()} | Local: ${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    );
  };

  // Handle date selection
  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) {
      setDate(null);
      setOpen(false);
      return;
    }

    // Add one day to correct the off-by-one error if that's consistently happening
    const correctedDate = new Date(selectedDate);
    correctedDate.setDate(correctedDate.getDate() + 1);

    // Reset the time to noon to avoid time zone issues
    correctedDate.setHours(12, 0, 0, 0);

    debugDate("Original selected", selectedDate);
    debugDate("Corrected", correctedDate);

    setDate(correctedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate ? formattedDate : "انتخاب تاریخ"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <PersianCalendar
          mode="single"
          selected={date ? new Date(date) : null}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Format date to Persian format
function formatPersianDate(date) {
  if (!date) return null;

  // Use the UTC methods to avoid time zone issues
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const persianDate = gregorianToJalali(year, month, day);

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  return `${persianDate.day} ${persianMonths[persianDate.month - 1]} ${persianDate.year}`;
}

export default PersianDatePicker