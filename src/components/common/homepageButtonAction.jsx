"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";


const HomepageButtonAction = ({ id }) => {
  const router = useRouter();

  const handlePush = () => {
    router.push(`/medicine/${id}`);
  };

  return (
    <Button
      onClick={handlePush}
      size="sm"
      className="w-full bg-[rgb(90,191,36)] font-medium hover:bg-[rgb(76,170,30)]"
    >
      View Details
    </Button>
  );
};

export default HomepageButtonAction;
