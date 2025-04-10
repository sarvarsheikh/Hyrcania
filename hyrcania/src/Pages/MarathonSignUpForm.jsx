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
import { Checkbox } from "@/components/ui/checkbox";
import { Title } from "@radix-ui/react-alert-dialog";
import useEventSignUp from "@/hooks/useEventSignUp";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


// Define fallback tickets in case event prop is missing
const fallbackTickets = [
  { id: "5k", label: "5K Race - $30" },
  { id: "10k", label: "10K Race - $45" },
  { id: "half", label: "Half Marathon - $60" },
  { id: "full", label: "Full Marathon - $75" },
];

export default function MinimalistRegistrationForm() {
  const location = useLocation();
  const obj = location.state;
  const event = obj.event;
  console.log(event.link);
  console.log(event.tickets);
  const tickets = [...event.tickets];
  const { eventSignUp } = useEventSignUp();

  // Initialize state with all required fields including tickets array
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    gender: "",
    idNumber: "",
    state: "",
    tShirtSize: "",
    relativeName: "",
    relativeLastName: "",
    relativePhoneNumber: "",
    is_paid: false

  });


  const [errors, setErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Use event tickets if available, otherwise use fallback

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user selects an option
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTicketChange = (ticketId) => {
    setFormData((prev) => {
      const updatedTickets = prev.tickets.includes(ticketId)
        ? prev.tickets.filter((id) => id !== ticketId)
        : [...prev.tickets, ticketId];

      return { ...prev, tickets: updatedTickets };
    });

    // Clear ticket error if any
    if (errors.tickets) {
      setErrors((prev) => ({ ...prev, tickets: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check all required fields
    Object.keys(formData).forEach((key) => {
      if (key !== "tickets" && !formData[key]) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    });

    // Check if at least one ticket is selected
    if (formData.tickets.length === 0) {
      newErrors.tickets = "Please select at least one ticket type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      eventSignUp()



      setShowSuccessDialog(true);
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Reset form after successful submission if needed
    // setFormData({...initial state});
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto mt-8 bg-white">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Registration Form
            </h1>

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
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
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
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
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
                    required
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
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
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
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                    required
                  >
                    <SelectTrigger
                      id="gender"
                      className={errors.gender ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
                    required
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.idNumber}
                    </p>
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
                    required
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
                    onValueChange={(value) =>
                      handleSelectChange("tShirtSize", value)
                    }
                    required
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tShirtSize}
                    </p>
                  )}
                </div>
              </div>
            </div>

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
                    required
                  />
                  {errors.relativeName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.relativeName}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="relativeLastName" className="flex">
                    Relative's Last Name{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="relativeLastName"
                    name="relativeLastName"
                    value={formData.relativeLastName}
                    onChange={handleInputChange}
                    className={errors.relativeLastName ? "border-red-500" : ""}
                    required
                  />
                  {errors.relativeLastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.relativeLastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="relativePhoneNumber" className="flex">
                  Relative's Phone Number{" "}
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="relativePhoneNumber"
                  name="relativePhoneNumber"
                  value={formData.relativePhoneNumber}
                  onChange={handleInputChange}
                  className={errors.relativePhoneNumber ? "border-red-500" : ""}
                  required
                />
                {errors.relativePhoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.relativePhoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Event Tickets Section */}

            <RadioGroup defaultValue="option-one">
              {tickets.map((ticket) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ticket.title} id={ticket.id} />

                  <lable>{ticket.title}</lable>
                </div>
              ))}
            </RadioGroup>
          </CardContent>

          <CardFooter className="flex justify-end p-6 pt-0">
            <Button
              onClick={handleSubmit}
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
