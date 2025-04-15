import { useState } from "react";
import { MoreVertical, Star, Flag } from "lucide-react";
import { Modal } from "../components/ui/modal";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";
import Spinner from "../components/ui/Spinner";

interface FeedbackReportMenuProps {
  mentorId: number;
  mentorName: string;
  meetingDateTime: string;
}

const FeedbackReportMenu: React.FC<FeedbackReportMenuProps> = ({
  mentorId,
  mentorName,
  meetingDateTime,
}) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const menteeId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const resetFeedbackForm = () => {
    setRating(0);
    setFeedback("");
    setHoveredRating(0);
  };

  const resetReportForm = () => {
    setReport("");
  };

  const handleFeedbackSubmit = async () => {
    const feedbackData = {
      mentorId,
      menteeId: menteeId,
      score: rating,
      feedback: feedback,
    };
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/rating/${menteeId}`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      toast.success("Feedback submitted successfully", {
        pauseOnHover: false,
        draggable: true,
      });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      resetFeedbackForm();
      setFeedbackOpen(false);
      setLoading(false);
    }
  };

  const handleReportSubmit = async () => {
    const reportData = {
      menteeId: menteeId,
      mentorId,
      report: report
    }
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/reportMeeting/${menteeId}`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      toast.success("Report submitted successfully", {
        pauseOnHover: false,
        draggable: true,
      });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      resetReportForm();
      setReportOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 touch-none"
          >
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 sm:w-56">
          <DropdownMenuItem
            onClick={() => setFeedbackOpen(true)}
            className="py-2 sm:py-3 cursor-pointer"
          >
            <Star className="mr-2 h-4 w-4" />
            Leave Feedback
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setReportOpen(true)}
            className="py-2 sm:py-3 cursor-pointer"
          >
            <Flag className="mr-2 h-4 w-4" />
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          resetFeedbackForm();
        }}
        title={`Share Your Feedback for ${mentorName}`}
        description={`Meeting on ${new Date(meetingDateTime).toLocaleString()}`}
      >
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <label className="text-sm font-medium sm:text-base">Rating</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none touch-none p-2"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="feedback" className="text-sm font-medium sm:text-base">
              Your Feedback
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              className="min-h-[100px] resize-y text-sm sm:text-base"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setFeedbackOpen(false)}
              className="px-4 py-2 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleFeedbackSubmit}
              disabled={rating === 0}
              className="px-4 py-2 text-sm sm:text-base w-36"
            >
              {loading ? <Spinner /> : "Submit Feedback"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Report Modal */}
      <Modal
        isOpen={reportOpen}
        onClose={() => {
          setReportOpen(false);
          resetReportForm();
        }}
        title={`Submit Report for Session with ${mentorName}`}
        description="Please describe the issue you'd like to report"
      >
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <label htmlFor="report" className="text-sm font-medium sm:text-base">
              Report Details
            </label>
            <Textarea
              id="report"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Describe the issue..."
              className="min-h-[100px] resize-y text-sm sm:text-base"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setReportOpen(false)}
              className="px-4 py-2 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReportSubmit}
              disabled={!report.trim()}
              className="px-4 py-2 text-sm sm:text-base w-36"
            >
              {loading ? <Spinner /> : "Submit Report"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackReportMenu;