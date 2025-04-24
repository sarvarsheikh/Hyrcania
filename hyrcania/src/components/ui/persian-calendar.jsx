"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { gregorianToJalali, jalaliToGregorian } from "@/lib/jalali-utils"

function PersianCalendar({
  mode = "single",
  selected,
  onSelect,
  className,
  initialFocus,
}) {
  // Get current Persian date
  const today = new Date()
  const persianToday = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate())

  // State for current view
  const [viewDate, setViewDate] = React.useState(() => {
    if (selected) {
      const { year, month } = gregorianToJalali(selected.getFullYear(), selected.getMonth() + 1, selected.getDate())
      return { year, month }
    }
    return { year: persianToday.year, month: persianToday.month }
  })

  // Persian month names
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

  // Get days in month
  const daysInMonth = getDaysInJalaliMonth(viewDate.year, viewDate.month)

  // Get first day of month (0 = Saturday in Persian calendar)
  const firstDayOfMonth = getFirstDayOfJalaliMonth(viewDate.year, viewDate.month)

  // Navigate to previous month
  const previousMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 }
      }
      return { year: prev.year, month: prev.month - 1 }
    })
  }

  // Navigate to next month
  const nextMonth = () => {
    setViewDate((prev) => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 }
      }
      return { year: prev.year, month: prev.month + 1 }
    })
  }

  // Check if a date is selected
  const isSelected = (year, month, day) => {
    if (!selected) return false

    const selectedPersian = gregorianToJalali(selected.getFullYear(), selected.getMonth() + 1, selected.getDate())

    return selectedPersian.year === year && selectedPersian.month === month && selectedPersian.day === day
  }

  // Check if a date is today
  const isToday = (year, month, day) => {
    return persianToday.year === year && persianToday.month === month && persianToday.day === day
  }

  // Handle date selection
  const handleSelect = (year, month, day) => {
    if (onSelect) {
      const gregorian = jalaliToGregorian(year, month, day)
      const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day)
      onSelect(date)
    }
  }

  // Generate years for select (20 years before and after current year)
  const startYear = 1300
  const endYear = persianToday.year + 6
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" className="h-7 w-7 p-0" onClick={previousMonth}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">ماه قبل</span>
        </Button>
        <div className="flex items-center gap-1">
          <Select
            value={viewDate.month.toString()}
            onValueChange={(value) => setViewDate((prev) => ({ ...prev, month: parseInt(value) }))}
          >
            <SelectTrigger className="h-7 w-[110px]">
              <SelectValue>{persianMonths[viewDate.month - 1]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {persianMonths.map((month, index) => (
                <SelectItem key={month} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={viewDate.year.toString()}
            onValueChange={(value) => setViewDate((prev) => ({ ...prev, year: parseInt(value) }))}
          >
            <SelectTrigger className="h-7 w-[70px]">
              <SelectValue>{viewDate.year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="h-7 w-7 p-0" onClick={nextMonth}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">ماه بعد</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs leading-6 text-muted-foreground">
        <div>ش</div>
        <div>ی</div>
        <div>د</div>
        <div>س</div>
        <div>چ</div>
        <div>پ</div>
        <div>ج</div>
      </div>
      <div className="grid grid-cols-7 text-center mt-2">
        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-0 text-center text-sm" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const isSelectedDay = isSelected(viewDate.year, viewDate.month, day)
          const isTodayDay = isToday(viewDate.year, viewDate.month, day)

          return (
            <div key={`day-${day}`} className="p-0 text-center text-sm">
              <Button
                variant="ghost"
                className={cn(
                  "h-9 w-9 p-0 font-normal",
                  isSelectedDay && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isTodayDay && !isSelectedDay && "border border-primary",
                )}
                onClick={() => handleSelect(viewDate.year, viewDate.month, day)}
              >
                {day}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Get days in Jalali month
function getDaysInJalaliMonth(year, month) {
  if (month <= 6) return 31
  if (month <= 11) return 30
  return isJalaliLeapYear(year) ? 30 : 29
}

// Check if Jalali year is leap year
function isJalaliLeapYear(year) {
  const remainder = year % 33
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(remainder)
}

// Get first day of Jalali month (0 = Saturday, 6 = Friday)
function getFirstDayOfJalaliMonth(year, month) {
  // Convert to Gregorian
  const gregorian = jalaliToGregorian(year, month, 1)

  // Create Date object
  const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day)

  // Get day of week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay()

  // Convert to Persian calendar (0 = Saturday, 6 = Friday)
  return (dayOfWeek + 1) % 7
}

export default PersianCalendar