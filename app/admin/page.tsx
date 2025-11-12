"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactAttempts, clearContactAttempts, exportContactsAsCSV, ContactAttempt } from "@/lib/analytics";
import { Download, Trash2, RefreshCw } from "lucide-react";

export default function AdminPage() {
  const [contacts, setContacts] = useState<ContactAttempt[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const loadContacts = () => {
    setContacts(getContactAttempts().reverse()); // Show newest first
  };

  useEffect(() => {
    // Simple password check - in production, this should be server-side
    const savedAuth = localStorage.getItem("admin_auth");
    if (savedAuth === "ai_labs_admin_2024") {
      setIsAuthorized(true);
      loadContacts();
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password - change this to something secure
    if (password === "aiengineerlabs2024") {
      localStorage.setItem("admin_auth", "ai_labs_admin_2024");
      setIsAuthorized(true);
      loadContacts();
    } else {
      alert("Invalid password");
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all contact attempts? This cannot be undone.")) {
      clearContactAttempts();
      loadContacts();
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to view contact attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Access Admin Panel</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Engineer Labs Admin</h1>
        <p className="text-muted-foreground">Contact attempts stored locally in browser</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={loadContacts} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={exportContactsAsCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button onClick={handleClear} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No contact attempts yet</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contact.name || "No name"}</CardTitle>
                    <CardDescription>{contact.email || "No email"}</CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    <div>{new Date(contact.timestamp).toLocaleString()}</div>
                    <div className="font-medium">{contact.service}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{contact.message || "No message"}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Source: {contact.source} | ID: {contact.id}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
