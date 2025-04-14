import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gregorianToJalali } from "@/lib/jalali-utils"

import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useEventSignUp from "@/hooks/useEventSignUp";
import { z } from "zod";
import PersianDatePicker from "@/components/ui/persian-date-picker";
import { toast } from "sonner";
import MarathonTicket from "@/components/marathon-ticket";

// Define the validation schema with Zod
const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.any(), // Changed from z.string().nonempty to accept Date object
  phoneNumber: z.string().min(1, "Phone number is required"),
  gender: z.enum(["m", "f"], { message: "Gender is required" }),
  idNumber: z.string().min(1, "ID number is required"),
  state: z.string().min(1, "State is required"),
  tShirtSize: z.string().min(1, "T-shirt size is required"),
  relativeName: z.string().min(1, "Relative's name is required"),
  relativeLastName: z.string().min(1, "Relative's last name is required"),
  relativePhoneNumber: z.string().min(1, "Relative's phone number is required"),
  is_paid: z.boolean(),
});

// Fallback tickets in case they're not provided in location state
const fallbackTickets = [
  { id: "1", title: "Marathon 5K", price: 150000 },
  { id: "2", title: "Marathon 10K", price: 250000 },
  { id: "3", title: "Marathon 21K", price: 350000 }
];

export default function MinimalistRegistrationForm() {
  const location = useLocation();
  const obj = location.state || { event: { tickets: fallbackTickets } };
  const event = obj.event;
  const tickets = [...(event?.tickets || fallbackTickets)];
  const { eventSignUp, loading: signupLoading, error: signupError, duplicateSignup } = useEventSignUp();
  
  // Set default date to 30 years ago instead of current date
  const thirtyYearsAgo = new Date();
  thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30);
  const [date, setDate] = useState(thirtyYearsAgo);
  
  // Initialize form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    gender: "m", // Set default gender
    idNumber: "",
    state: "",
    tShirtSize: "",
    relativeName: "",
    relativeLastName: "",
    relativePhoneNumber: "",
    is_paid: false,
  });
  
  // Change from selectedTicket object to selectedTicketId
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showDuplicateSignupDialog, setShowDuplicateSignupDialog] = useState(false);

  // Get the selected ticket object using the ID
  const selectedTicket = selectedTicketId ? tickets.find(t => t.id === selectedTicketId) : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      registrationSchema.parse(formData);
      if (!selectedTicketId) {
        setErrors((prev) => ({ ...prev, ticket: "لطفا یک بلیط برای ثبت نام انتخاب کنید " }));
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmationDialog(true);
    }
  };

  const handleFinalSubmit = async () => {
    setShowConfirmationDialog(false);
    try {
      const backendPayload = mapToBackendFormat(formData);
      await eventSignUp(selectedTicketId, backendPayload);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.data?.detail === "قبلا برای این بلیط ثبت نام کردی") {
        setShowDuplicateSignupDialog(true);
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage || 'ثبت نام به مشکل خورد');
      }
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };
  
  const closeDuplicateSignupDialog = () => {
    setShowDuplicateSignupDialog(false);
  };

  // Format Persian date for display in confirmation dialog
  const formatPersianDate = () => {
    const { year, month, day } = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
  };
  
  // Map frontend fields to backend fields
  const mapToBackendFormat = (userDetail) => {
    const { year, month, day } = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      first_name: userDetail.firstName,
      last_name: userDetail.lastName,
      age: formattedDate,  // Using formatted Persian date
      phone_number: userDetail.phoneNumber,
      gender: userDetail.gender,
      id_number: userDetail.idNumber,
      state: userDetail.state,
      T_Shirt_size: userDetail.tShirtSize,
      relativ_name: userDetail.relativeName,
      relativ_last_name: userDetail.relativeLastName,
      relativ_phone_number: userDetail.relativePhoneNumber,
      is_paid: userDetail.is_paid,
    };
  };

  // Get gender display text
  const getGenderText = (gender) => {
    return gender === 'm' ? 'مرد' : 'زن';
  };

  // Get T-shirt size display text
  const getTShirtSizeText = (size) => {
    return size.toUpperCase();
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto mt-8 bg-white">
        <form onSubmit={handlePreSubmit}>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6"> فرم ثبت نام</h1>
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">اطلاعات شخصی</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="flex">
                    نام <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="flex">
                    نام خانوداگی <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="age" className="flex">
                    تاریخ تولد <span className="text-red-500 ml-1">*</span>
                  </Label>
                  
                  <PersianDatePicker 
                    date={date} 
                    setDate={setDate}
                    minDate={new Date(1900, 0, 1)} // Allow dates back to 1900
                    maxDate={new Date()} // Don't allow future dates
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber" className="flex">
                    شماره تماس <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="gender" className="flex">
                    جنسیت <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger
                      id="gender"
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">مرد</SelectItem>
                      <SelectItem value="f">زن</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="idNumber" className="flex">
                    کد ملی <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className={errors.idNumber ? "border-red-500" : ""}
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="state" className="flex">
                    استان <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tShirtSize" className="flex">
                    سایز تی شرت <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    value={formData.tShirtSize}
                    onValueChange={(value) => handleSelectChange("tShirtSize", value)}
                  >
                    <SelectTrigger
                      id="tShirtSize"
                      className={errors.tShirtSize ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tShirtSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.tShirtSize}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Emergency Contact */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-medium">اطلاعات اظطراری</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="relativeName" className="flex">
                    نام آشنا <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="relativeName"
                    name="relativeName"
                    value={formData.relativeName}
                    onChange={handleInputChange}
                    className={errors.relativeName ? "border-red-500" : ""}
                  />
                  {errors.relativeName && (
                    <p className="text-red-500 text-xs mt-1">{errors.relativeName}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="relativeLastName" className="flex">
                    نام خانوداگی آشنا <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="relativeLastName"
                    name="relativeLastName"
                    value={formData.relativeLastName}
                    onChange={handleInputChange}
                    className={errors.relativeLastName ? "border-red-500" : ""}
                  />
                  {errors.relativeLastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.relativeLastName}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="relativePhoneNumber" className="flex">
                  شماره تماس آشنا <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="relativePhoneNumber"
                  name="relativePhoneNumber"
                  value={formData.relativePhoneNumber}
                  onChange={handleInputChange}
                  className={errors.relativePhoneNumber ? "border-red-500" : ""}
                />
                {errors.relativePhoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.relativePhoneNumber}</p>
                )}
              </div>
            </div>
            {/* Event Tickets Section - FIXED */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-medium">
                انتخاب بلیط <span className="text-red-500 ml-1">*</span>
              </h2>
              <RadioGroup
                value={selectedTicketId}
                onValueChange={setSelectedTicketId}
                className="space-y-3"
              >
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className={`relative border rounded-lg p-2 transition-all ${
                      selectedTicketId === ticket.id 
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500" 
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="flex-shrink-0 pt-1">
                        <RadioGroupItem 
                          value={ticket.id} 
                          id={`ticket-${ticket.id}`} 
                          className="h-5 w-5"
                        />
                      </div>
                      <div className="flex-grow">
                        <Label 
                          htmlFor={`ticket-${ticket.id}`} 
                          className="block w-full cursor-pointer"
                        >
                          <MarathonTicket ticket={ticket}/>
                        </Label>
                      </div>
                    </div>
                    
                    {/* Visual indicator for selected ticket */}
                    {selectedTicketId === ticket.id && (
                      <div className="absolute top-2 right-2 rounded-full bg-blue-600 text-white p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
              {errors.ticket && (
                <p className="text-red-500 text-xs">{errors.ticket}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6 pt-0">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={signupLoading}
            >
              {signupLoading ? (
                <>
                  <span className="mr-2">پردازش</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                </>
              ) : (
                'بررسی اطلاعات'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              تایید اطلاعات
            </DialogTitle>
            <DialogDescription className="text-center">
              لطفا اطلاعات وارد شده را بررسی و تایید کنید
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4 max-h-80 overflow-y-auto">
            {/* Personal Information */}
            <div className="border-b pb-3">
              <h3 className="font-medium mb-2">اطلاعات شخصی</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold">نام:</span>
                </div>
                <div>{formData.firstName}</div>
                
                <div>
                  <span className="font-semibold">نام خانوادگی:</span>
                </div>
                <div>{formData.lastName}</div>
                
                <div>
                  <span className="font-semibold">تاریخ تولد:</span>
                </div>
                <div>{formatPersianDate()}</div>
                
                <div>
                  <span className="font-semibold">شماره تماس:</span>
                </div>
                <div>{formData.phoneNumber}</div>
                
                <div>
                  <span className="font-semibold">جنسیت:</span>
                </div>
                <div>{getGenderText(formData.gender)}</div>
                
                <div>
                  <span className="font-semibold">کد ملی:</span>
                </div>
                <div>{formData.idNumber}</div>
                
                <div>
                  <span className="font-semibold">استان:</span>
                </div>
                <div>{formData.state}</div>
                
                <div>
                  <span className="font-semibold">سایز تی شرت:</span>
                </div>
                <div>{getTShirtSizeText(formData.tShirtSize)}</div>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="border-b pb-3">
              <h3 className="font-medium mb-2">اطلاعات اظطراری</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold">نام آشنا:</span>
                </div>
                <div>{formData.relativeName}</div>
                
                <div>
                  <span className="font-semibold">نام خانوادگی آشنا:</span>
                </div>
                <div>{formData.relativeLastName}</div>
                
                <div>
                  <span className="font-semibold">شماره تماس آشنا:</span>
                </div>
                <div>{formData.relativePhoneNumber}</div>
              </div>
            </div>
            
            {/* Ticket Information */}
            <div>
              <h3 className="font-medium mb-2">اطلاعات بلیط</h3>
              <div className="text-sm">
                {selectedTicket ? (
                  <div className="p-2 border rounded-md">
                    <p><span className="font-semibold">عنوان:</span> {selectedTicket.title}</p>
                    {selectedTicket.price && (
                      <p><span className="font-semibold">قیمت:</span> {selectedTicket.price.toLocaleString()} تومان</p>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500">بلیطی انتخاب نشده است</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={closeConfirmationDialog}
            >
              ویرایش اطلاعات
            </Button>
            <Button
              onClick={handleFinalSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={signupLoading}
            >
              {signupLoading ? (
                <>
                  <span className="mr-2">در حال ثبت</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                </>
              ) : (
                'تایید و ثبت نام'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              ثبت نام با موفقیت انجام شد
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-center">
              برای ثبت نامت خیلی ممنونم قهرمان 
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={closeSuccessDialog}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Duplicate Signup Dialog */}
      <Dialog open={showDuplicateSignupDialog} onOpenChange={setShowDuplicateSignupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              ثبت نام قبلا انجام شده
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
            <p className="text-center">
              شما قبلا برای این بلیت ثبت‌نام کرده‌اید. امکان ثبت‌نام مجدد برای یک بلیت وجود ندارد.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={closeDuplicateSignupDialog}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}