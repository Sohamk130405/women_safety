"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  
  useEffect(() => {
    const fetchSesions = async () => {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        setSessions(data.sessions);
        console.log(data.sessions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSesions();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Active Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length > 0 &&
              sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.id}</TableCell>
                  <TableCell>{session.name}</TableCell>
                  <TableCell>
                    {new Date(session.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        session.is_enable && session.is_sos_triggered
                          ? "destructive"
                          : session.is_enable
                          ? "default"
                          : "secondary"
                      }
                    >
                      {session.is_enable && session.is_sos_triggered
                        ? "SOS Triggered"
                        : session.is_enable
                        ? "Active"
                        : "Ended"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/sessions/${session.id}`}
                      className="text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
