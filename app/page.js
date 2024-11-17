import RootLayout from "./layout";
import { Shield, MapPin, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Empowering Women's Safety</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Our innovative GPS-based solution provides real-time tracking and
          immediate assistance in emergencies.
        </p>
        <Button size="lg" asChild>
          <a href="#features">Learn More</a>
        </Button>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Why Women's Safety Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Ensuring Peace of Mind
            </h3>
            <p className="text-muted-foreground">
              Our project aims to provide women with a sense of security and
              confidence as they navigate their daily lives, knowing that help
              is just a button press away.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Rapid Response in Emergencies
            </h3>
            <p className="text-muted-foreground">
              With real-time GPS tracking and instant SOS alerts, we enable
              quick and effective responses to potential safety threats,
              potentially saving lives.
            </p>
          </div>
        </CardContent>
      </Card>

      <section id="features" className="space-y-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Real-time GPS Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Accurate location tracking for precise monitoring and
                assistance.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Instant SOS Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                One-touch SOS button for immediate help in emergency situations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Admin Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dedicated admin panel for overseeing active sessions and
                responding to alerts.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
