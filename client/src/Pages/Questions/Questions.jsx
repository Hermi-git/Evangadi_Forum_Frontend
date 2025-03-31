import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import { FaGreaterThan, FaUser } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import classes from "./Questions.module.css";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        const response = await axiosBase.get("questions/all-questions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched questions:", response.data);
        setQuestions(response.data.result ? response.data.result : []);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    if (token) getQuestions();
  }, [token, navigate]);

  return (
    <div className={classes.container}>
      {loading ? (
        <BeatLoader color="#36d7b7" />
      ) : error ? (
        <p className={classes.err}>{error}</p>
      ) : questions.length === 0 ? (
        <p className={classes.message}>No questions available!</p>
      ) : (
        questions.map((question) => (
          <div
            className={classes.question_container}
            key={question.id || question.title}
            onClick={() =>
              navigate("/answers", {
                state: {
                  questionId: question.questionid,
                  title: question.title,
                  description: question.description,
                },
              })
            }
          >
            <div className={classes.user_info}>
              <FaUser className={classes.icon} />
              <p className={classes.username}>{question.username || "Unknown"}</p>
            </div>

            <p className={classes.title}>{question.title}</p>

            <div className={classes.greaterthan}>
              <FaGreaterThan />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Questions;
