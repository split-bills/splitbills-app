import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const ProfileCard = () => {
  return (
    <Card className="w-[40rem] p-6">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input placeholder="Username" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input placeholder="Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline">Change Settings</Button>
          <Button variant="destructive">Change Password</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
