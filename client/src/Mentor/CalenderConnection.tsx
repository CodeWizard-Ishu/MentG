import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Bounce, toast } from "react-toastify";
import BACKEND_URL from "../endpoint";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import googleImage from "../assets/google-calendar-icon.png";
import Spinner from "../components/ui/Spinner";

interface CalendarConnection {
  provider: string;
  email: string;
  profilePicture?: string;
}

interface CalendarIntegrationProps {
  onConnectionChange?: (isConnected: boolean) => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  onConnectionChange,
}) => {
  const [connection, setConnection] = useState<CalendarConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCalendarConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCalendarConnections = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/calendar/connections/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.googleConnection) {
          setConnection({
            provider: "google",
            email: data.googleConnection.email,
            profilePicture: data.googleConnection.profilePicture,
          });
          onConnectionChange?.(true);
        } else {
          onConnectionChange?.(false);
        }
      }
    } catch (error) {
      console.error("Error fetching calendar connections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateGoogleOAuth = async () => {
    try {
      // Get the current URL for redirect after OAuth
      const currentUrl = window.location.href;
      
      // Redirect to backend OAuth URL with current URL as redirect parameter
      window.location.href = `${BACKEND_URL}/api/auth/google/connect?userId=${userId}&redirectUrl=${encodeURIComponent(currentUrl)}`;
    } catch (error) {
      toast.error(`Failed to initiate Google Calendar connection : ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
  };

  const disconnectCalendar = async (provider: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/calendar/disconnect/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setConnection(null);
        onConnectionChange?.(false);
        toast.success("Calendar disconnected successfully", {
          position: "bottom-right",
          pauseOnHover: false,
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(`Failed to disconnect calendar : ${error}`, {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    }
  };

  // Check if we're returning from OAuth connection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const connectionStatus = urlParams.get('connected');
    
    if (connectionStatus === 'success') {
      toast.success('Google Calendar Connected Successfully!', {
        position: 'bottom-right'
      });
      fetchCalendarConnections();
      
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (connectionStatus === 'error') {
      toast.error('Failed to connect Google Calendar', {
        position: 'bottom-right'
      });
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);


  return (
    <div className="mb-10 ml-2">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-7 h-7" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            Connect your Calendar
          </h2>
        </div>
        <p className="ml-2 text-xs sm:text-sm">
          (Your 1:1 session events will be created in your calendar)
        </p>
      </div>
      {isLoading ? (
        <Spinner clasName="flex justify-start m-10" />
      ) : (
        <div className="flex">
          {connection ? (
            <div className="flex items-center space-x-4 bg-gray-100 p-2 rounded-lg">
              <Avatar>
                <AvatarImage src={connection.profilePicture} alt="Profile" />
                <AvatarFallback>
                  {connection.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{connection.email}</p>
                <p className="text-xs text-gray-500">Google Calendar</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => disconnectCalendar("google")}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Add Calendar <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center"
                  onSelect={initiateGoogleOAuth}
                >
                  <img src={googleImage} alt="image" className="mr-2 h-4 w-4" />{" "}
                  Google Calendar
                </DropdownMenuItem>
                {/* Future extension for Outlook */}
                <DropdownMenuItem disabled>
                  Outlook Calendar (Coming Soon)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarIntegration;
