import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import defaultImage from "../assets/defautProfilePic.jpg";
import { Link } from "react-router-dom";

interface Mentor {
  id: number;
  userId: number;
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
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Capitalize first letter of each word
  const capitalize = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Handle search submission
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const response = await fetch(`https://search-box-iomr.onrender.com/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      setSearchResults(data.mentors || []);
    } catch (error) {
      console.error("Error searching mentors:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle outside clicks to close search results
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

  // Clear results when input changes
  useEffect(() => {
    setSearchResults([]);
    setShowResults(false);
  }, [searchQuery]);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#08286b] transition-all text-base"
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
          className="bg-[#08286b] text-white px-6 py-4 rounded-r-xl hover:bg-[#08276bcc] transition whitespace-nowrap"
        >
          Search
        </button>
      </form>

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
                    to={`/profile/${mentor.userId}`}
                    key={mentor.id}
                    className="block hover:bg-blue-50 transition"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-center p-4">
                      <img
                        src={mentor.profilePicture || defaultImage}
                        alt={`${mentor.firstName} ${mentor.lastName || ''}`}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
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