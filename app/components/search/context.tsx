import { create } from "zustand";
import i18next from "i18next";

type SearchResult = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
  tags: string[];
  image: string;
  technologies: string[];
};

type SearchState = {
  allPosts: SearchResult[];
  searchResults: SearchResult[];
  searchTerm: string;
  sortBy: string;
  tags: string[];
  technologies: [string, string][];
  setSearchTerm: (term: string) => void;
  setSortBy: (key: string) => void;
  setTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  refreshData: () => void;
  setTechnologies: (tags: [string, string][]) => void;
  toggleTechnology: (tag: [string, string]) => void;
};

// helper to load translations
function loadData() {
  const rawPosts = i18next.t("posts", { returnObjects: true }) as Record<
    string,
    SearchResult
  >;
  return {
    allPosts: Object.values(rawPosts),
  };
}

export const useSearchStore = create<SearchState>((set, get) => {
  const { allPosts } = loadData();

  return {
    allPosts,
    searchResults: allPosts,
    searchTerm: "",
    sortBy: "Latest",
    tags: [],
    technologies: [],

    setTags: (tags) => set({ tags }),

    setTechnologies: (technologies) => set({ technologies: technologies }),

    toggleTechnology: (technology: [string, string]) =>
      set((state) => {
        const exists = state.technologies.some(
          (t) => t[0] === technology[0] && t[1] === technology[1]
        );

        const newTechnologies = exists
          ? state.technologies.filter(
            (t) => !(t[0] === technology[0] && t[1] === technology[1])
          )
          : [...state.technologies, technology];

        const newResults = state.allPosts.filter((post) =>
          newTechnologies.every(([tech, icon]) =>
            post.technologies.some((t) => t[0] === tech && t[1] === icon)
          )
        );

        return { technologies: newTechnologies, searchResults: newResults };
      }),

    toggleTag: (tag) =>
      set((state) => {
        const newTags = state.tags.includes(tag)
          ? state.tags.filter((t) => t !== tag)
          : [...state.tags, tag];
        const newResults = state.allPosts.filter((post) =>
          newTags.every((tag) => post.tags.includes(tag))
        );
        return { tags: newTags, searchResults: newResults };
      }),

    setSortBy: (key) =>
      set((state) => {
        const results = [...state.allPosts].sort((a, b) => {
          if (key === "Oldest") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          } else {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
        });
        return { sortBy: key, searchResults: results };
      }),

    setSearchTerm: (term) =>
      set((state) => {
        if (term === "") {
          return { searchTerm: term, searchResults: state.allPosts };
        }
        const results = state.allPosts.filter(
          (result) =>
            result.title.toLowerCase().includes(term.toLowerCase()) ||
            result.excerpt.toLowerCase().includes(term.toLowerCase())
        );
        return { searchTerm: term, searchResults: results };
      }),

    refreshData: () => {
      const { allPosts } = loadData();
      set((state) => ({
        allPosts,
        searchResults:
          state.searchTerm === ""
            ? allPosts
            : allPosts.filter(
              (result) =>
                result.title
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase()) ||
                result.excerpt
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase())
            ),
      }));
    },
  };
});

i18next.on("languageChanged", () => {
  useSearchStore.getState().refreshData();
});
