import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Runner from "@/components/images/maratho.jpeg";

export default function MarathonSignUpForm() {
  const [formData, setFormData] = useState({
    ticket: "",
    user: "",
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    gender: "",
    insurancePic: null,
    idPic: null,
    state: "",
    tShirtSize: "",
    relativeName: "",
    relativeLastName: "",
    relativePhoneNumber: "",
    isPaid: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files?.[0] }));
    }
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, isPaid: checked }));
  };

  const handleSubmit = (action) => {
    // Here you would handle the form submission based on the action
    console.log("Form submitted with action:", action);
    console.log("Form data:", formData);

    if (action === "saveAndAddAnother") {
      // Reset form
      setFormData({
        ticket: "",
        user: "",
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        gender: "",
        insurancePic: null,
        idPic: null,
        state: "",
        tShirtSize: "",
        relativeName: "",
        relativeLastName: "",
        relativePhoneNumber: "",
        isPaid: false,
      });
    }
  };

  const setToday = () => {
    const today = new Date();
    const age = today.getFullYear() - 2000; // Example default age of someone born in 2000
    setFormData((prev) => ({ ...prev, age: age.toString() }));
  };

  return (
    <Card className="w-full mt-12 bg-[#353535] border-none shadow-none">
      <CardContent className="relative px-4">
        <img
          className="absolute left-0 right-0 w-full h-full object-cover opacity-25 pointer-events-none"
          style={{ zIndex: 0 }}
          src={Runner}
          alt="image"
        />
        <div
          className="absolute left-0 right-0 w-full h-full bg-[#353535] opacity-70 pointer-events-none"
          style={{
            boxShadow: "inset -19px -200px 228px 15px rgba(53,53,53,1)",
            zIndex: 1
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 20 }}>
          <h1 className="text-4xl font-bold text-white">
            Sign Up for European Running Championships
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ticket and User */}
            <div className="space-y-1">
              <Label htmlFor="ticket" className="text-gray-300 text-sm">
                Ticket:
              </Label>
              <Select
                value={formData.ticket}
                onValueChange={(value) => handleSelectChange("ticket", value)}
              >
                <SelectTrigger className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-400 text-gray-200">
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="user" className="text-gray-300 text-sm">
                User:
              </Label>
              <Select
                value={formData.user}
                onValueChange={(value) => handleSelectChange("user", value)}
              >
                <SelectTrigger className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-400 text-gray-200">
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                  <SelectItem value="user3">User 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-gray-300 text-sm">
                First name:
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-gray-300 text-sm">
                Last name:
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="age" className="text-gray-300 text-sm">
                Age:
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={setToday}
                  className="flex items-center space-x-1 bg-transparent border border-gray-400 text-gray-200 hover:bg-gray-900 rounded-sm h-9 px-2"
                >
                  <span>Today</span>
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Note: You are 5.5 hours ahead of server time.
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phoneNumber" className="text-gray-300 text-sm">
                Phone number:
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="gender" className="text-gray-300 text-sm">
                Gender:
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-400 text-gray-200">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="insurancePic" className="text-gray-300 text-sm">
                Insurance pic:
              </Label>
              <Input
                id="insurancePic"
                type="file"
                onChange={(e) => handleFileChange(e, "insurancePic")}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9 file:bg-gray-900 file:text-gray-200 file:border-0 file:h-full file:rounded-none file:mr-2"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="idPic" className="text-gray-300 text-sm">
                ID pic:
              </Label>
              <Input
                id="idPic"
                type="file"
                onChange={(e) => handleFileChange(e, "idPic")}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9 file:bg-gray-900 file:text-gray-200 file:border-0 file:h-full file:rounded-none file:mr-2"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="state" className="text-gray-300 text-sm">
                State:
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="tShirtSize" className="text-gray-300 text-sm">
                T-Shirt size:
              </Label>
              <Select
                value={formData.tShirtSize}
                onValueChange={(value) =>
                  handleSelectChange("tShirtSize", value)
                }
              >
                <SelectTrigger className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-400 text-gray-200">
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="xxl">XXL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-gray-400 my-2" />

          {/* Emergency Contact Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="relativeName" className="text-gray-300 text-sm">
                  Relative name:
                </Label>
                <Input
                  id="relativeName"
                  name="relativeName"
                  value={formData.relativeName}
                  onChange={handleInputChange}
                  className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="relativeLastName"
                  className="text-gray-300 text-sm"
                >
                  Relative last name:
                </Label>
                <Input
                  id="relativeLastName"
                  name="relativeLastName"
                  value={formData.relativeLastName}
                  onChange={handleInputChange}
                  className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="relativePhoneNumber"
                  className="text-gray-300 text-sm"
                >
                  Relative phone number:
                </Label>
                <Input
                  id="relativePhoneNumber"
                  name="relativePhoneNumber"
                  value={formData.relativePhoneNumber}
                  onChange={handleInputChange}
                  className="bg-transparent border border-gray-400 text-gray-200 rounded-sm h-9"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPaid"
              checked={formData.isPaid}
              onCheckedChange={handleCheckboxChange}
              className="border-gray-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 rounded-sm"
            />
            <Label htmlFor="isPaid" className="text-gray-200 text-sm">
              Is paid
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 px-4 pb-4">
        <Button
          onClick={() => handleSubmit("save")}
          className="bg-gray-900 hover:bg-gray-800 text-gray-200 rounded-sm h-9 px-4 border border-gray-400"
        >
          SAVE
        </Button>
        <Button
          onClick={() => handleSubmit("saveAndAddAnother")}
          className="bg-gray-900 hover:bg-gray-800 text-gray-200 rounded-sm h-9 px-4 border border-gray-400"
        >
          Save and add another
        </Button>
        <Button
          onClick={() => handleSubmit("saveAndContinueEditing")}
          className="bg-gray-900 hover:bg-gray-800 text-gray-200 rounded-sm h-9 px-4 border border-gray-400"
        >
          Save and continue editing
        </Button>
      </CardFooter>
    </Card>
  );
}