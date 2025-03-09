import { useState } from "react";
import { MoreVertical, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Modal } from "../components/ui/modal";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Bounce, toast } from "react-toastify";
import BACKEND_URL from "../endpoint";

interface ReportMenuProps {
  menteeId: number;
  menteeName: string;
}

const ReportMenu = ({ menteeId, menteeName }: ReportMenuProps) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [report, setReport] = useState("");

  const mentorId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";

  const resetForm = () => {
    setReport("");
  };

  const handleSubmit = async () => {
    try {
      const reportData = {
        menteeId,
        mentorId: mentorId,
        report: report
      }

      const response = await fetch(`${BACKEND_URL}/api/reportMeeting/${mentorId}`, {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      toast.success("Report submitted successfully", {
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error submitting feedback: ${error.message}`,{
        position: "bottom-right",
        pauseOnHover: false,
        transition: Bounce,
      });
    } finally {
      resetForm();
      setReportOpen(false);
    }
  };

  return (
    <>
      {/* Dropdown Menu - Responsive sizing */}
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
            onClick={() => setReportOpen(true)}
            className="py-2 sm:py-3 cursor-pointer"
          >
            <Flag className="mr-2 h-4 w-4" />
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Report Dialog */}
      <Modal
        isOpen={reportOpen}
        onClose={() => {
          setReportOpen(false);
          resetForm();
        }}
        title={`Submit Report for Session with ${menteeName}`}
        description="Please describe the issue you'd like to report"
      >
        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
          {/* Report Details - Responsive sizing */}
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
              placeholder="Please provide more details about the issue..."
              className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base resize-y"
            />
          </div>

          {/* Buttons - Responsive spacing */}
          <div className="flex justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              variant="outline"
              onClick={() => setReportOpen(false)}
              className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!report.trim()}
              className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
            >
              Submit Report
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReportMenu;
