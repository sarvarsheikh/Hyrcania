import React from "react";

function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="border-b border-black py-6">
        <div className="container mx-auto px-4">
          <a href="/" className="text-2xl font-bold tracking-tighter">
            هیرکانی
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-5xl font-black mb-12 tracking-tight">شرایط استفاده</h1>

        <div className="grid gap-12 max-w-3xl">
          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۱. پذیرش شرایط</h2>
            <p className="text-lg leading-relaxed">
              با دسترسی و استفاده از وب‌سایت و خدمات هیرکانی، شما تأیید می‌کنید که این شرایط استفاده را خوانده، درک کرده و قبول کرده‌اید.
              در صورتی که با هیچ بخشی از این شرایط موافق نیستید، نباید از خدمات ما استفاده کنید.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۲. ثبت‌نام و مشارکت</h2>
            <p className="text-lg leading-relaxed mb-4">۲.۱ شما باید هنگام ثبت‌نام برای ماراتن‌ها، اطلاعات دقیق، به‌روز و کامل ارائه دهید.</p>
            <p className="text-lg leading-relaxed mb-4">۲.۲ ثبت‌نام تنها با پرداخت کامل هزینه‌های مربوطه تکمیل می‌شود.</p>
            <p className="text-lg leading-relaxed mb-4">۲.۳ با ثبت‌نام، شما تأیید می‌کنید که از نظر جسمانی برای شرکت در ماراتن آماده هستید.</p>
            <p className="text-lg leading-relaxed">۲.۴ شرکت‌کنندگان باید به تمامی قوانین مسابقه و دستورالعمل‌های داوران پایبند باشند.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۳. مالکیت معنوی</h2>
            <p className="text-lg leading-relaxed">
              تمام محتوای وب‌سایت هیرکانی، از جمله متن‌ها، گرافیک‌ها، لوگوها و تصاویر، متعلق به هیرکانی است و تحت قوانین کپی‌رایت محافظت می‌شود.
              استفاده غیرمجاز ممنوع است.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۴. محدودیت مسئولیت</h2>
            <p className="text-lg leading-relaxed mb-4">۴.۱ شرکت در ماراتن‌ها شامل خطرات ذاتی است. شما با مسئولیت خود شرکت می‌کنید.</p>
            <p className="text-lg leading-relaxed mb-4">۴.۲ هیرکانی در قبال هرگونه آسیب، خسارت یا ضررهای ناشی از شرکت در مسابقه مسئول نیست.</p>
            <p className="text-lg leading-relaxed">۴.۳ ما حق لغو یا تغییر رویدادها را به دلیل شرایط پیش‌بینی‌نشده بدون مسئولیت داریم.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۵. سیاست بازپرداخت</h2>
            <p className="text-lg leading-relaxed mb-4">۵.۱ هزینه‌های ثبت‌نام غیرقابل بازگشت هستند مگر در موارد مشخص شده در سیاست بازپرداخت ما.</p>
            <p className="text-lg leading-relaxed">۵.۲ انتقال ثبت‌نام به فرد دیگر ممکن است تحت شرایط خاص مجاز باشد.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۶. حریم خصوصی</h2>
            <p className="text-lg leading-relaxed">
              اطلاعات شخصی شما مطابق با سیاست حفظ حریم خصوصی ما جمع‌آوری و استفاده می‌شود. با استفاده از خدمات ما، شما به این جمع‌آوری و استفاده رضایت می‌دهید.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۷. تغییرات</h2>
            <p className="text-lg leading-relaxed">
              هیرکانی حق تغییر این شرایط استفاده را در هر زمان دارد. استفاده مداوم از خدمات ما پس از این تغییرات به معنای پذیرش شرایط به‌روز شده است.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 uppercase">۸. قانون حاکم</h2>
            <p className="text-lg leading-relaxed">
              این شرایط استفاده مطابق با قوانین قابل اجرا اداره و تفسیر می‌شوند. هرگونه اختلاف باید در دادگاه‌های دارای صلاحیت بررسی شود.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-black pt-8">
          <p className="text-lg">آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </main>

      <footer className="border-t border-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-6 md:mb-0">
              <p className="text-xl font-bold mb-2">هیرکانی</p>
              <p className="text-sm">برگزاری ماراتن با کیفیت</p>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="/" className="hover:underline">خانه</a>
              <a href="/events" className="hover:underline">رویدادها</a>
              <a href="/contact" className="hover:underline">تماس</a>
              <a href="/privacy" className="hover:underline">سیاست حفظ حریم خصوصی</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-sm">© {new Date().getFullYear()} هیرکانی. کلیه حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsOfUse;
