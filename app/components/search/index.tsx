import { useSearchStore } from "./context";
import useSearch from "./hooks";
import FilterMenu from "./filter";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const hooks = useSearch();
  const searchContext = useSearchStore();
  
  return (
    <div className="bg-white border-b border-gray-300">
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="md:text-2xl text-xl font-bold tracking-tighter text-black">
            ✒️ Publicaciones Destacadas
          </h1>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-3">
          <div className="relative w-full md:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              className="w-full pl-8 pr-2 py-1 border rounded-lg border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-100"
              placeholder="Search posts..."
              value={searchContext.searchTerm}
              onChange={(e) => searchContext.setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Count + Controls */}
          <div className="flex flex-row gap-4 items-center">
            <span className="text-sm text-gray-600">
              {hooks.total} Publicaciones
            </span>
            
            {/* Filter Menu */}
            <FilterMenu />
            
            {/* Sort buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => searchContext.setSortBy("Latest")}
                className={`px-2 hover:cursor-pointer rounded py-1 text-gray-700 ${
                  searchContext.sortBy === "Latest"
                    ? "outline bg-gray-100"
                    : "hover:bg-gray-200 transition duration-100"
                } text-sm`}
              >
                Latest
              </button>
              <button
                onClick={() => searchContext.setSortBy("Oldest")}
                className={`px-2 hover:cursor-pointer rounded py-1 text-gray-700 ${
                  searchContext.sortBy === "Oldest"
                    ? "outline bg-gray-100"
                    : "hover:bg-gray-200 transition duration-100"
                } text-sm`}
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}