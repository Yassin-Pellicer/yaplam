import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useSearchStore } from "./context";

export default function useSearch() {
  const [total, setTotal] = useState<String>("0");
  const searchStore = useSearchStore();

  const { t } = useTranslation();
  
  const value = t("postCounter")

  useEffect(() => {
    setTotal(value);
  }, []);

  useEffect(() => {
    
  }, [searchStore.searchTerm])

  return {
    total
  }

}