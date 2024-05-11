import { useEffect, useState } from "react";
import { getFields } from "@/lib/data.ts";

export const useFields = () => {
  const [fields, setFields] = useState<Fields>({
    professions: [],
    procedures: [],
    sesamVitales: [],
    cities: [],
    agreements: [],
  });

  useEffect(() => {
    getFields().then((fields) => {
      setFields(fields);
    });
  }, []);

  return fields;
};
