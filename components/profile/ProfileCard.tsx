"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

interface ProfileDetails {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfileCard = () => {
  const [details, setDetails] = useState<ProfileDetails>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/profile/details",
          { withCredentials: true }
        );
        setDetails(response.data);
      } catch (err: any) {
        console.error("Error fetching Details:", err);
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        }
      }
    };
    fetchDetails();
  }, []);

  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const patchChanges = async () => {
    if (!details.first_name || !details.last_name) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.patch(
        "http://localhost:8080/profile/details",
        details,
        { withCredentials: true }
      );
      console.log(response.data);
      setIsEditable(false);
    } catch (err: any) {
      console.error("Error posting Details:", err);
    }
  };

  return (
    <Card className="mx-auto max-w-sm self-center m-16">
      <CardHeader>
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>
          Update your account details or password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first_name"
                placeholder=""
                value={details.first_name}
                readOnly={!isEditable}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last_name"
                placeholder=""
                value={details.last_name}
                readOnly={!isEditable}
                onChange={handleChange}
                disabled={!isEditable}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder=""
              value={details.email}
              disabled={true}
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="destructive">Change Password</Button>
            {!isEditable && (
              <Button variant="outline" onClick={handleToggleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
            )}
            {isEditable && (
              <Button variant="outline" onClick={patchChanges}>
                <Pencil className="mr-2 h-4 w-4" />
                Save Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
