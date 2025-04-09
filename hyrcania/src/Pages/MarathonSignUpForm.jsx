import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export default function MinimalistRegistrationForm() {
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
    relativePhoneNumber: ""
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check all fields
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", formData);
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
            <h1 className="text-2xl font-bold text-center mb-6">Registration Form</h1>
            
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
                    required
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
                    onValueChange={(value) => handleSelectChange("tShirtSize", value)}
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
                    <p className="text-red-500 text-xs mt-1">{errors.tShirtSize}</p>
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
                    required
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
                  required
                />
                {errors.relativePhoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.relativePhoneNumber}</p>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end p-6 pt-0">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Registration Successful!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-center">
              Thank you for signing up! Your registration has been successfully submitted.
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