// Gregorian to Jalali conversion
export function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    const jy = gy - 1600
    const jm = gm - 1
    const jd = gd - 1
  
    let j_day_no = 365 * jy + Math.floor(jy / 4) - Math.floor(jy / 100) + Math.floor(jy / 400) + g_d_m[jm] + jd
  
    if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) {
      j_day_no += 1
    }
  
    j_day_no = j_day_no - 79
  
    const j_np = Math.floor(j_day_no / 12053)
    j_day_no = j_day_no % 12053
  
    let jy1 = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461)
    j_day_no = j_day_no % 1461
  
    if (j_day_no >= 366) {
      jy1 += Math.floor((j_day_no - 1) / 365)
      j_day_no = (j_day_no - 1) % 365
    }
  
    let i = 0
    for (i = 0; i < 11 && j_day_no >= jalaliMonthDays(jy1, i + 1); ++i) {
      j_day_no -= jalaliMonthDays(jy1, i + 1)
    }
  
    const jm1 = i + 1
    const jd1 = j_day_no + 1
  
    return { year: jy1, month: jm1, day: jd1 }
  }
  
  // Jalali to Gregorian conversion
  export function jalaliToGregorian(jy, jm, jd) {
    const jy1 = jy - 979
    const jm1 = jm - 1
    const jd1 = jd - 1
  
    let j_day_no = 365 * jy1 + Math.floor(jy1 / 33) * 8 + Math.floor(((jy1 % 33) + 3) / 4)
    for (let i = 0; i < jm1; ++i) {
      j_day_no += jalaliMonthDays(jy, i + 1)
    }
  
    j_day_no += jd1
  
    let g_day_no = j_day_no + 79
  
    let gy = 1600 + 400 * Math.floor(g_day_no / 146097)
    g_day_no = g_day_no % 146097
  
    let leap = true
    if (g_day_no >= 36525) {
      g_day_no--
      gy += 100 * Math.floor(g_day_no / 36524)
      g_day_no = g_day_no % 36524
  
      if (g_day_no >= 365) {
        g_day_no++
      } else {
        leap = false
      }
    }
  
    gy += 4 * Math.floor(g_day_no / 1461)
    g_day_no = g_day_no % 1461
  
    if (g_day_no >= 366) {
      leap = false
      g_day_no--
      gy += Math.floor(g_day_no / 365)
      g_day_no = g_day_no % 365
    }
  
    let i = 0
    // Changed from const to let to allow modification
    let g_day_no_inc = g_day_no
    for (i = 0; g_day_no_inc >= gregorianMonthDays(gy, i + 1, leap); i++) {
      g_day_no_inc -= gregorianMonthDays(gy, i + 1, leap)
    }
  
    const gm = i + 1
    const gd = g_day_no_inc + 1
  
    return { year: gy, month: gm, day: gd }
  }
  
  // Helper function to get days in Jalali month
  function jalaliMonthDays(jy, jm) {
    if (jm <= 6) return 31
    if (jm <= 11) return 30
    if (isJalaliLeapYear(jy)) return 30
    return 29
  }
  
  // Helper function to get days in Gregorian month
  function gregorianMonthDays(gy, gm, leap) {
    const g_days_in_month = [31, 28 + (leap ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return g_days_in_month[gm - 1]
  }
  
  // Check if Jalali year is leap year
  export function isJalaliLeapYear(jy) {
    const remainder = jy % 33
    return [1, 5, 9, 13, 17, 22, 26, 30].includes(remainder)
  }