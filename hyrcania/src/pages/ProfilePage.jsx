"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, User, CreditCard, Check } from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }
        
        const parsedToken = JSON.parse(token);
        const response = await fetch('https://hyrcanianrun.liara.run/api/user/', {
          headers: {
            Authorization: `JWT ${parsedToken.access_token}`,
          },
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.data}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchUserData();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">لطفا شکیبا باشید</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">به مشکل خورد </p>
      </div>
    );
  }

  // Check if required data exists before accessing it
  const eventSignup = userData.event_signup && userData.event_signup.length > 0 
    ? userData.event_signup[0] 
    : null;
    
  const paymentInfos = userData.successful_payment_ref_id && userData.successful_payment_ref_id.length > 0 
    ? userData.successful_payment_ref_id
    : [];

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <h1 className="text-2xl font-bold mb-6">پروفایل شما</h1>

        {/* Personal Information */}
        {eventSignup && (
          <Card className="p-6 mb-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">اطلاعات شخصی</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">نام</p>
                <p className="font-medium">
                  {eventSignup.first_name} {eventSignup.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">شماره تماس</p>
                <p className="font-medium">{eventSignup.phone_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">جنسیت</p>
                <p className="font-medium">{eventSignup.gender === "m" ? "مرد" : "زن"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">کد ملی</p>
                <p className="font-medium">{eventSignup.id_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">استان</p>
                <p className="font-medium">{eventSignup.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">سایز تی شرت</p>
                <p className="font-medium">{eventSignup.T_Shirt_size.toUpperCase()}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Event Information */}
        {userData.event_created_by_you && userData.event_created_by_you.length > 0 && (
          <Card className="p-6 mb-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">اطلاعات مسابقه</h2>
            </div>

            {userData.event_created_by_you.map((event, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant="outline">{event.status.replace(/_/g, " ")}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{event.event_date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Ticket Information */}
        {paymentInfos.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">اطلاعات بلیط</h2>
            </div>

            {paymentInfos.map((paymentInfo, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{paymentInfo.ticket_name}</h3>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">پرداختت شده</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">کد پیگیری: {paymentInfo.ref_id}</p>
                
                {index < paymentInfos.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">جمع کل بلیط های خریداری شده</span>
              <span className="font-medium">{userData.ticket_count}</span>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}