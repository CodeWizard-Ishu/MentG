import { useEffect, useState } from "react";
import BACKEND_URL from "../endpoint";
import TestimonialCard from "../components/ui/TestimonialCard";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import { Check, ChevronLeft, ChevronRight, Filter, Quote, SortDesc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isMentor: boolean;
  isActive: boolean;
}

interface Mentee {
  user: User;
}

interface Testimonial {
  id: number;
  mentorId: number;
  menteeId: number;
  score: number;
  feedback: string;
  createdAt: string;
  mentee: Mentee;
}

interface PaginatedResponse {
  ratings: Testimonial[];
  totalPages: number;
  currentPage: number;
  totalRatings: number;
}

const capitalize = (string : string) => {
  return string.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

const Testimonials = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRatings, setTotalRatings] = useState(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("most-recent");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken") ?? "";
  const limit = 10;

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: sortOrder,
      });
      
      if (filterRating !== null) {
        queryParams.append('rating', filterRating.toString());
      }
      
      const response = await fetch(
        `${BACKEND_URL}/api/getRating/${userId}?${queryParams.toString()}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      
      const data: PaginatedResponse = await response.json();

      if (!response.ok) {
        setTestimonials([]);
        setTotalPages(0);
        setTotalRatings(0);
      } else {
        setTestimonials(data.ratings);
        setTotalPages(data.totalPages);
        setTotalRatings(data.totalRatings);
      }
    } catch (error) {
      toast.error(`${error}`, {
        pauseOnHover: false,
        draggable: true,
      });
      setTestimonials([]);
      setTotalPages(0);
      setTotalRatings(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId, page, filterRating, sortOrder, limit]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const ratingOptions = [
    { value: null, label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4 Stars' },
    { value: 3, label: '3 Stars' },
    { value: 2, label: '2 Stars' },
    { value: 1, label: '1 Star' },
  ];

  const sortOptions = [
    { value: 'most-recent', label: 'Most Recent' },
    { value: 'highest-rating', label: 'Highest Rating' },
    { value: 'lowest-rating', label: 'Lowest Rating' },
  ];

  return (
    <div className="min-h-screen px-3">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Your Testimonials</h1>
          <p className="text-sm text-gray-600 mt-2">
            See what your mentees are saying about your guidance and support.
          </p>
        </div>

        {/* Stats and filters section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm text-gray-600">Total Testimonials: </span>
            <span className="font-medium text-gray-900">{totalRatings}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Rating
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Rating Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ratingOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.label}
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setFilterRating(option.value);
                      setPage(1);
                    }}
                  >
                    {option.label}
                    {filterRating === option.value && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                <SortDesc className="w-4 h-4 mr-2" />
                Sort By
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setSortOrder(option.value);
                      setPage(1);
                    }}
                  >
                    {option.label}
                    {sortOrder === option.value && <Check className="w-4 h-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Testimonials grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner clasName="text-blue-600" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Quote className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Testimonials Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {filterRating !== null 
                ? `You don't have any ${filterRating}-star testimonials yet.` 
                : "You don't have any testimonials yet. As you work with mentees, their feedback will appear here."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={`${capitalize(testimonial.mentee.user.firstName)} ${capitalize(testimonial.mentee.user.lastName)}`}
                  testimonial={testimonial.feedback}
                  rating={testimonial.score}
                  createdAt={formatDate(testimonial.createdAt)}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`flex items-center px-3 py-1 rounded border ${page === 1 ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </button>
                
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{page}</span>
                  <span className="text-gray-500"> of {totalPages}</span>
                </div>
                
                <button 
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`flex items-center px-3 py-1 rounded border ${page === totalPages ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonials;