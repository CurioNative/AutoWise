"use client";

import { useAuth, UserRole } from "@/app/contexts/auth-context";
import { AutoWiseIcon } from "../icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const { login, selectedRole, setSelectedRole } = useAuth();

  const handleLogin = () => {
    login(selectedRole);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <AutoWiseIcon className="size-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to AutoWise</CardTitle>
        <CardDescription>
          Select a user role to sign in to the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">User Role</Label>
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value as UserRole)}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle-owner">Vehicle Owner</SelectItem>
              <SelectItem value="service-center">
                Service Center Staff
              </SelectItem>
              <SelectItem value="oem">OEM Engineer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
