import { useState } from "react";
import { MoreVertical, Star, Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import BACKEND_URL from "../endpoint";

interface FeedbackReportMenuProps {
  mentorId: number;
  mentorName: string;
  meetingDateTime: string;
}

const FeedbackReportMenu = ({
  mentorId,
  mentorName,
  meetingDateTime,
}: FeedbackReportMenuProps) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [report, setReport] = useState("");
  const token = sessionStorage.getItem("userToken") ?? "";

  const resetFeedbackForm = () => {
    setRating(0);
    setFeedback("");
  };

  const resetReportForm = () => {
    setReport("");
  };

  const handleFeedbackSubmit = async () => {
    // Prepare the feedback data
    const feedbackData = {
      mentorId,
      menteeId: sessionStorage.getItem("userId"), // Replace with actual mentee ID from your context or props
      score: rating,
      feedback: feedback,
    };

    try {
      // Make a POST request to submit the feedback
      const response = await fetch(`${BACKEND_URL}/api/rating`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      // Optionally, handle the response data
      const result = await response.json();
      console.log("Feedback submitted successfully:", result);

      // Reset form and close dialog
      resetFeedbackForm();
      setFeedbackOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally show an error message to the user
    }
  };

  const handleReportSubmit = () => {
    console.log({ mentorId, report });
    resetReportForm();
    setReportOpen(false);
  };

  return (
    <>
      {/* Dropdown Menu - Now with responsive touch targets */}
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

      {/* Feedback Dialog - Responsive sizing and padding */}
      <Dialog
        open={feedbackOpen}
        onOpenChange={(newOpen) => {
          setFeedbackOpen(newOpen);
          if (!newOpen) resetFeedbackForm();
        }}
      >
        <DialogContent className="w-[95vw] max-w-md mx-auto sm:w-full p-4 sm:p-6 rounded-xl">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Share Your Feedback for {mentorName}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Meeting on {new Date(meetingDateTime).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            {/* Star Rating - Responsive sizes */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-medium">Rating</label>
              <div className="flex gap-1 sm:gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none touch-none p-1 sm:p-2"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text - Responsive text sizes */}
            <div className="space-y-2 sm:space-y-3">
              <label
                htmlFor="feedback"
                className="text-sm sm:text-base font-medium"
              >
                Your Feedback
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-y"
              />
            </div>

            {/* Buttons - Responsive spacing and sizing */}
            <div className="flex justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
              <Button
                variant="outline"
                onClick={() => setFeedbackOpen(false)}
                className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={rating === 0}
                className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog - Responsive sizing and padding */}
      <Dialog
        open={reportOpen}
        onOpenChange={(newOpen) => {
          setReportOpen(newOpen);
          if (!newOpen) resetReportForm();
        }}
      >
        <DialogContent className="w-[95vw] max-w-md mx-auto sm:w-full p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Submit Report for Session with {mentorName}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Please describe the issue you'd like to report
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            <div className="space-y-2 sm:space-y-3">
              <label
                htmlFor="report"
                className="text-sm sm:text-base font-medium"
              >
                Report Details
              </label>
              <Textarea
                id="report"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Describe the issue..."
                className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-y"
              />
            </div>

            <div className="flex justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
              <Button
                variant="outline"
                onClick={() => setReportOpen(false)}
                className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReportSubmit}
                disabled={!report.trim()}
                className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackReportMenu;
