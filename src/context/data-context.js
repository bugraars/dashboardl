"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const localData = localStorage.getItem("dashboardData");
      if (localData) {
        setData(JSON.parse(localData));
      } else {
        const res = await fetch("https://demotrainiq.com/case/dashboard");
        const result = await res.json();
        setData(result);
        localStorage.setItem("dashboardData", JSON.stringify(result));
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
