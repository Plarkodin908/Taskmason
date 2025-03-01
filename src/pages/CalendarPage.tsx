
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Video } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Web Development Mentorship",
      with: "Jane Smith",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "video"
    },
    {
      id: 2,
      title: "Portfolio Review",
      with: "Alex Johnson",
      date: "Tomorrow",
      time: "10:30 AM - 11:30 AM",
      type: "video"
    },
    {
      id: 3,
      title: "React Performance Workshop",
      with: "Maria Rodriguez",
      date: "Dec 15, 2023",
      time: "1:00 PM - 3:00 PM",
      type: "video"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-forest-light border border-mint/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">December 2023</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                  Today
                </Button>
                <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                  Month
                </Button>
                <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                  Week
                </Button>
                <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                  Day
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-mint/10"
              classNames={{
                day_selected: "bg-mint text-forest hover:bg-mint hover:text-forest focus:bg-mint focus:text-forest",
                day_today: "bg-forest text-white border border-mint/30",
                head_cell: "text-mint font-semibold",
                cell: "text-white",
                day: "text-white hover:bg-mint/10 focus:bg-mint/10"
              }}
            />
            
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Selected Day Events</h3>
              <div className="bg-forest p-4 rounded-lg border border-mint/10">
                <div className="flex items-center gap-4">
                  <div className="bg-mint/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Web Development Mentorship</p>
                    <p className="text-white/70 text-sm">2:00 PM - 3:00 PM with Jane Smith</p>
                  </div>
                  <Button className="ml-auto bg-mint hover:bg-mint/90 text-forest">Join</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="bg-forest-light border border-mint/10 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h2>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="p-4 rounded-lg bg-forest border border-mint/10"
                >
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm mt-2">
                    <User className="h-4 w-4" />
                    <span>{event.with}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{event.date}, {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Video className="h-4 w-4" />
                    <span>Video Call</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-mint/20 text-mint hover:bg-mint/10"
                    >
                      Reschedule
                    </Button>
                    <Button className="flex-1 bg-mint hover:bg-mint/90 text-forest">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-6 bg-forest border border-mint/20 text-mint hover:bg-forest-light"
            >
              Schedule New Session
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
