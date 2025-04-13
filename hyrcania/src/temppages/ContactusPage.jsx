import React from "react";

function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12">ارتباط با ما</h1>

          <div className="border-t-2 border-white pt-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-mono uppercase text-sm">آدرس</div>
              <address className="not-italic font-mono text-lg">
                <p>همه جا هستیم</p>
              </address>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-mono uppercase text-sm">ایمیل</div>
              <p className="font-mono text-lg">amirnoralahi144@gmail.com</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-mono uppercase text-sm">شماره تماس</div>
              <p className="font-mono text-lg">09919510956</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-mono uppercase text-sm">ساعت پاسخگویی</div>
              <div className="font-mono text-lg">
                <p>هر موقع که دوست داشتی به جز نصف شبا</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;