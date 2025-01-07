import { useState } from "react";
import { MoreVertical, Flag } from "lucide-react";
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

interface ReportMenuProps {
  menteeId: number;
  menteeName: string;
}

const ReportMenu = ({ menteeId, menteeName }: ReportMenuProps) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [report, setReport] = useState("");

  const resetForm = () => {
    setReport("");
  };

  const handleSubmit = () => {
    console.log({ menteeId, report });
    resetForm();
    setReportOpen(false);
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

      {/* Report Dialog - Responsive sizing and spacing */}
      <Dialog
        open={reportOpen}
        onOpenChange={(newOpen) => {
          setReportOpen(newOpen);
          if (!newOpen) resetForm();
        }}
      >
        <DialogContent className="w-[95vw] max-w-md mx-auto sm:w-full p-4 sm:p-6 rounded-xl">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Submit Report for Session with {menteeName}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Please describe the issue you'd like to report
            </DialogDescription>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportMenu;
