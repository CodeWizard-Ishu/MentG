import { useState } from 'react';
import { MoreVertical, Star, Flag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const FeedbackReportMenu = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState('');

  const resetFeedbackForm = () => {
    setRating(0);
    setFeedback('');
  };

  const resetReportForm = () => {
    setReport('');
  };

  const handleFeedbackSubmit = () => {
    console.log({ rating, feedback });
    resetFeedbackForm();
    setFeedbackOpen(false);
  };

  const handleReportSubmit = () => {
    console.log({ report });
    resetReportForm();
    setReportOpen(false);
  };

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFeedbackOpen(true)}>
            <Star className="mr-2 h-4 w-4" />
            Leave Feedback
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReportOpen(true)}>
            <Flag className="mr-2 h-4 w-4" />
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Feedback Dialog */}
      <Dialog 
        open={feedbackOpen} 
        onOpenChange={(newOpen) => {
          setFeedbackOpen(newOpen);
          if (!newOpen) resetFeedbackForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              Help us improve by sharing your experience
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Star Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                Your Feedback
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setFeedbackOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={rating === 0}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog 
        open={reportOpen} 
        onOpenChange={(newOpen) => {
          setReportOpen(newOpen);
          if (!newOpen) resetReportForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Report</DialogTitle>
            <DialogDescription>
              Please describe the issue you'd like to report
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label htmlFor="report" className="text-sm font-medium">
                Report Details
              </label>
              <Textarea
                id="report"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Describe the issue..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setReportOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReportSubmit}
                disabled={!report.trim()}
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