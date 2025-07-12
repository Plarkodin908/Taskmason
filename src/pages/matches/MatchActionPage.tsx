
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Calendar, CheckSquare, User } from "lucide-react";
import Loading from "@/components/ui/loading";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

type ActionType = "connect" | "message" | "schedule";

const MatchActionPage = () => {
  const { matchId, action } = useParams<{ matchId: string; action: ActionType }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch match data
    const fetchData = async () => {
      setTimeout(() => {
        setMatchData({
          id: matchId,
          name: "Emma Watson",
          avatar: "https://i.pravatar.cc/150?img=1",
          title: "Frontend Developer",
          skills: ["React", "JavaScript", "CSS", "UX Design"],
          rating: 4.9,
        });
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, [matchId]);

  const getActionContent = () => {
    if (!matchData) return null;

    switch (action) {
      case "connect":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Connect with {matchData.name}</h2>
              <p className="text-white/70">
                Send a connection request to start collaborating with {matchData.name}
              </p>
            </div>
            
            <Card className="bg-forest-light border border-mint/10 p-6">
              <div className="space-y-4">
                <label className="block text-white/80 font-medium">Add a personal message</label>
                <textarea 
                  className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white min-h-[120px]"
                  placeholder={`Hi ${matchData.name}, I'd like to connect with you...`}
                />
                <Button className="w-full bg-mint hover:bg-mint/90 text-forest hover-scale">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Send Connection Request
                </Button>
              </div>
            </Card>
          </div>
        );
        
      case "message":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Message {matchData.name}</h2>
              <p className="text-white/70">
                Start a conversation with {matchData.name}
              </p>
            </div>
            
            <Card className="bg-forest-light border border-mint/10 p-6">
              <div className="space-y-4">
                <div className="bg-forest p-4 rounded-md border border-mint/10 h-[240px] flex items-center justify-center">
                  <p className="text-white/50">No previous messages</p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    className="flex-1 bg-forest border border-mint/20 rounded-md p-3 text-white"
                    placeholder="Type your message..."
                  />
                  <Button className="bg-mint hover:bg-mint/90 text-forest hover-scale">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );
        
      case "schedule":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Schedule with {matchData.name}</h2>
              <p className="text-white/70">
                Book a learning or mentoring session with {matchData.name}
              </p>
            </div>
            
            <Card className="bg-forest-light border border-mint/10 p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Date</label>
                    <input 
                      type="date"
                      className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-medium mb-2">Time</label>
                    <input 
                      type="time"
                      className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 font-medium mb-2">Session Topic</label>
                  <input 
                    type="text"
                    className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <Button className="w-full bg-mint hover:bg-mint/90 text-forest hover-scale">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            </Card>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <p className="text-white/70">Invalid action</p>
            <Button 
              className="mt-4 bg-mint hover:bg-mint/90 text-forest hover-scale"
              onClick={() => navigate('/matches')}
            >
              Back to Matches
            </Button>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <RefinedPageLayout title="Match Action" backUrl="/matches">
        <div className="flex flex-col items-center justify-center py-20">
          <Loading text="Loading match details..." />
        </div>
      </RefinedPageLayout>
    );
  }

  return (
    <RefinedPageLayout title={`${action ? action.charAt(0).toUpperCase() + action.slice(1) : 'Action'} - ${matchData?.name || 'Match'}`} backUrl="/matches">
      {matchData ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={matchData.avatar} alt={matchData.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{matchData.name}</h1>
              <p className="text-white/70">{matchData.title}</p>
            </div>
          </div>
          
          {getActionContent()}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-forest-light p-4 inline-block rounded-full mb-4">
            <User className="h-8 w-8 text-mint/40" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Match not found</h2>
          <p className="text-white/70 mb-6">
            We couldn't find the match you're looking for.
          </p>
          <Button 
            className="bg-mint hover:bg-mint/90 text-forest hover-scale"
            onClick={() => navigate('/matches')}
          >
            Back to Matches
          </Button>
        </div>
      )}
    </RefinedPageLayout>
  );
};

export default MatchActionPage;
