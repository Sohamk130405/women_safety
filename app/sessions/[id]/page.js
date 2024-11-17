"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// Dynamically import Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function SOS() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await fetch(`/api/session/${id}`);
        const data = await res.json();
        setSession(data.session);
        setLocations(data.locations);
      } catch (err) {
        console.error(err);
        setError("Error fetching session data");
      }
    };

    fetchSessionData();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!session) {
    return <p>Loading session data...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">SOS Details - Session {id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Session Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Device ID:</strong> {session.device_id}
            </p>
            <p>
              <strong>User:</strong> {session.name}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(session.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge
                variant={session.is_sos_triggered ? "destructive" : "default"}
              >
                {session.is_enable && session.is_sos_triggered
                  ? "SOS Triggered"
                  : session.is_enable
                  ? "Active"
                  : "Ended"}
              </Badge>
            </p>
          </div>
          <div>
            <p>
              <strong>SOS Location:</strong>
            </p>
            {locations.length > 0 && (
              <>
                <p>
                  <strong>Latitude:</strong>{" "}
                  {locations[locations.length - 1]?.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong>{" "}
                  {locations[locations.length - 1]?.longitude}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Pass locations and session to the Leaflet map */}
          <LeafletMap locations={locations} session={session} />
        </CardContent>
      </Card>
    </div>
  );
}
