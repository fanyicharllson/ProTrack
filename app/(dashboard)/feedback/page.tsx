"use client";
import { useState } from "react";

import Nogoals from "@/info/Nogoals";
import React from "react";
import AddGoalForm from "@/app/components/forms/AddgoalForm";
// import FeedbackForm from "@/app/components/forms/FeedbackForm";

export default function FeedbackPage() {
  const [showModal, setShowModal] = useState(false);
  console.log(`showModal: ${showModal}`);

  const handleAddGoalClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Nogoals
        text="goals"
        buttonText="Add new goal"
        onClick={handleAddGoalClick}
      />
      {showModal && <AddGoalForm setShowModal={setShowModal} />}
      {/* <FeedbackForm /> */}
    </div>
  );
}
