// "use client";
// import { useState } from "react";

// import Nogoals from "@/info/Nogoals";
import React from "react";
// import AddGoalForm from "@/app/components/forms/AddgoalForm";
import FeedbackForm from "@/app/components/forms/FeedbackForm";
// import SuccessModal from "@/info/SuccessMsg";

export default function FeedbackPage() {
  // const [showModal, setShowModal] = useState(true);
  // console.log(`showModal: ${showModal}`);

  // const handleAddGoalClick = () => {
  //   setShowModal(true);
  // };

  return (
    <div>
      {/* <Nogoals
        text="goals"
        buttonText="Add new goal"

        onClick={handleAddGoalClick}
      />
      {showModal && <AddGoalForm setShowModal={setShowModal} />} */}
      <FeedbackForm />
      {/* {showModal && <SuccessModal text="Project" setShowModal={setShowModal} />} */}

      {/* <SuccessModal text="Project" setShowModal={handleAddGoalClick} /> */}
    </div>
  );
}
