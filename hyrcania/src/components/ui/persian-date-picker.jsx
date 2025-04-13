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

  // Convert date to Gregorian for internal use
  const gregorianDate = date ? new Date(date) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate ? <span dir="rtl">{formattedDate}</span> : <span>انتخاب تاریخ</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <PersianCalendar
          mode="single"
          selected={gregorianDate}
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Format date to Persian format
function formatPersianDate(date) {
  const { year, month, day } = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate())

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
  ]

  return `${day} ${persianMonths[month - 1]} ${year}`
}

export default PersianDatePicker