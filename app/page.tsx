"use client";

import BalanceCard from "@/components/home/BalanceCard";
import Transactions from "@/components/home/Transactions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/home/name`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setFirstName(response.data.first_name);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        let errorFirstName = "Error fetching user data";

        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        }

        if (err.response && err.response.status === 404) {
          errorFirstName = "User not found";
        }

        setFirstName(errorFirstName);
      });
  }, []);

  return (
    <div className="p-4">
      <p className="text-3xl font-bold tracking-normal mt-8 mb-4">
        <span className="">Hello</span>, {firstName ? firstName + "!" : ""}
      </p>
      <div className="flex flex-row gap-20">
        <BalanceCard />
        <Transactions />
      </div>
    </div>
  );
}
