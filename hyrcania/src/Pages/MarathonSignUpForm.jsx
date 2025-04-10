import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useEventSignUp from "@/hooks/useEventSignUp";
import { z } from "zod";

// Define fallback tickets
const fallbackTickets = [
  { id: "5k", title: "5K Race - $30" },
  { id: "10k", title: "10K Race - $45" },
  { id: "half", title: "Half Marathon - $60" },
  { id: "full", title: "Full Marathon - $75" },
];

// Define the validation schema with Zod
const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string(),
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

export default function MinimalistRegistrationForm() {
  const location = useLocation();
  const obj = location.state || { event: { tickets: fallbackTickets } };
  const event = obj.event;
  const tickets = [...(event?.tickets || fallbackTickets)];
  const { eventSignUp } = useEventSignUp();

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

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
      if (!selectedTicket) {
        setErrors((prev) => ({ ...prev, ticket: "Please select a ticket" }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const backendPayload = mapToBackendFormat(formData);
      eventSignUp(selectedTicket, backendPayload);
      setShowSuccessDialog(true);
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Reset form after successful submission if needed
    // setFormData({...initial state});
  };

  // Helper function to convert age to Jalali date
  const convertAgeToJalaliDate = (age) => {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(age, 10);
    return `${birthYear}-01-01`;
  };

  // Map frontend fields to backend fields
  const mapToBackendFormat = (userDetail) => {
    return {
      first_name: userDetail.firstName,
      last_name: userDetail.lastName,
      age: convertAgeToJalaliDate(userDetail.age),
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

  return (
    <>
      <Card className="w-full max-w-lg mx-auto mt-8 bg-white">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6">Registration Form</h1>
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="flex">
                    First Name <span className="text-red-500 ml-1">*</span>
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
                    Last Name <span className="text-red-500 ml-1">*</span>
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
                    Age <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber" className="flex">
                    Phone Number <span className="text-red-500 ml-1">*</span>
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
                    Gender <span className="text-red-500 ml-1">*</span>
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
                      <SelectItem value="m">Male</SelectItem>
                      <SelectItem value="f">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="idNumber" className="flex">
                    ID Number <span className="text-red-500 ml-1">*</span>
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
                    State <span className="text-red-500 ml-1">*</span>
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
                    T-Shirt Size <span className="text-red-500 ml-1">*</span>
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
                      <SelectItem value="xs">XS</SelectItem>
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
              <h2 className="text-lg font-medium">Emergency Contact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="relativeName" className="flex">
                    Relative's Name <span className="text-red-500 ml-1">*</span>
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
                    Relative's Last Name <span className="text-red-500 ml-1">*</span>
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
                  Relative's Phone Number <span className="text-red-500 ml-1">*</span>
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
            {/* Event Tickets Section */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-medium">
                Select Ticket <span className="text-red-500 ml-1">*</span>
              </h2>
              <RadioGroup
                value={selectedTicket}
                onValueChange={setSelectedTicket}
              >
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={ticket.id} id={ticket.id} />
                    <Label htmlFor={ticket.id}>{ticket.title}</Label>
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
            >
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Registration Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-center">
              Thank you for signing up! Your registration has been successfully
              submitted.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={closeSuccessDialog}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}