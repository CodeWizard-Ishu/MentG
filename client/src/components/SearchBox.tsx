import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, AlertCircle } from "lucide-react";
import defaultImage from "../assets/defautProfilePic.jpg";
import { Link } from "react-router-dom";
import BACKEND_URL from "../endpoint";
import { toast } from "react-toastify";

interface Mentor {
  id: number;
  userId: number;
  username: string;
  firstName: string;
  lastName: string | null;
  profilePicture: string | null;
  bio: string | null;
}

const EnhancedSearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Mentor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate search query
  const validateSearchQuery = (query: string): boolean => {
    if (!query.trim()) {
      return true;
    }
    if (query.trim().length < 2) {
      setValidationError("Search term must be at least 2 characters");
      return false;
    }
    if (query.length > 100) {
      setValidationError("Search term is too long (maximum 100 characters)");
      return false;
    }
    const validSearchPattern = /^[a-zA-Z0-9\s.,'-]+$/;
    if (!validSearchPattern.test(query)) {
      setValidationError("Search contains invalid characters");
      return false;
    }
    const sqlInjectionPatterns = [
      /(\b(select|insert|update|delete|from|drop|alter|exec|execute|union|where|or|and)\b)/i,
      /(--|;|\/\*|\*\/|@@)/,
      /('|"|`)\s*(or|and)\s*('|"|`)\s*=\s*('|"|`)/i
    ];
    
    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(query)) {
        setValidationError("Invalid search query");
        return false;
      }
    }
    
    setValidationError(null);
    return true;
  };

  const capitalize = (string : string) => {
    return string.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  const sanitizeInput = (input: string): string => {
    return input.trim();
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const sanitizedQuery = sanitizeInput(searchQuery);
    
    if (!sanitizedQuery) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (!validateSearchQuery(sanitizedQuery)) {
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sanitizedQuery }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          pauseOnHover: false,
          draggable: true,
        });
        return;
      }

      const data = await response.json();
      
      // Validate response data
      if (Array.isArray(data.mentors)) {
        setSearchResults(data.mentors);
      } else {
        setSearchResults([]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setSearchResults([]);
      toast.error(`Error, Check your Connection: ${error.message}`, {
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Validate as user types, but don't show error immediately
    if (value.trim().length >= 2) {
      validateSearchQuery(value);
    } else {
      setValidationError(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchResults([]);
    setShowResults(false);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-8 relative" ref={searchContainerRef}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Find experts by name, skill, or domain"
            value={searchQuery}
            onChange={handleInputChange}
            className={`w-full pl-12 pr-10 py-4 border ${
              validationError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#08286b]"
            } rounded-l-xl shadow-sm focus:outline-none focus:ring-2 transition-all text-base`}
            aria-invalid={validationError ? "true" : "false"}
            aria-describedby={validationError ? "search-error" : undefined}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className={`${
            validationError ? "bg-gray-400 cursor-not-allowed" : "bg-[#08286b] hover:bg-[#08276bcc]"
          } text-white px-6 py-4 rounded-r-xl transition whitespace-nowrap`}
          disabled={!!validationError || !searchQuery.trim()}
        >
          Search
        </button>
      </form>

      {/* Validation Error Message */}
      {validationError && (
        <div 
          id="search-error" 
          className="mt-2 text-red-500 text-sm flex items-center"
          role="alert"
        >
          <AlertCircle size={16} className="mr-1" />
          {validationError}
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[70vh] overflow-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="animate-spin text-blue-500 mr-2" size={24} />
              <span>Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <div className="divide-y divide-gray-100">
                {searchResults.map((mentor) => (
                  <Link
                    to={`/profile/${mentor.username}`}
                    key={mentor.id}
                    className="block hover:bg-blue-50 transition"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-center p-4">
                      <img
                        src={mentor.profilePicture || defaultImage}
                        alt={`${mentor.firstName} ${mentor.lastName || ''}`}
                        className="w-12 h-12 rounded-full object-cover aspect-square border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = defaultImage;
                        }}
                      />
                      <div className="ml-4 text-left">
                        <h4 className="font-medium text-gray-900">
                          {capitalize(mentor.firstName)}{" "}
                          {mentor.lastName ? capitalize(mentor.lastName) : ""}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {mentor.bio || ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchQuery.trim() !== "" ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No mentors found for "{searchQuery}"</p>
              <p className="text-sm text-gray-500 mt-1">
                Try different keywords or browse by category
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBox;