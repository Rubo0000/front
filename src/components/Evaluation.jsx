import React from "react";
import "../styles/Evaluation.css"; 

const Evaluation = ({ evaluationContent }) => {
  return (
    <div className="evaluation">
      <h2 className="evaluation-title">Evaluation</h2>
      <p className="evaluation-content">{evaluationContent}</p>
    </div>
  );
};

export default Evaluation;
