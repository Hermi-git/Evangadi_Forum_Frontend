import React, { useState, useEffect } from "react";
import axiosBase from "../../axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { IoMdArrowRoundForward } from "react-icons/io";
import classes from "./Answer.module.css";
import Footer from "../../components/Footer/Footer";

function Answer() {
  const navigate = useNavigate()
  const location = useLocation();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { questionId, title, description } = location.state || {};
  const [answerText, setAnswerText] = useState("");
  const token = localStorage.getItem("token");

  async function handlePostAnswer(e) {
  e.preventDefault();
  try {
    await axiosBase.post(
      `/answers/${questionId}/add-answer`,
      { answer: answerText }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Answer posted successfully!");
    setAnswerText("");
    navigate("/");
  } catch (error) {
    console.error("Error posting answers", error.response?.data || error.message);
    alert(error.response?.data?.msg || "Failed to post the answer. Please try again.");
  }
}


  useEffect(() => {
    if (!questionId) return;

    const fetchAnswers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosBase.get(`/answers/${questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnswers(response.data);
      } catch (err) {
        setError("Failed to fetch answers.");
        console.error("Error fetching answers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId, token]);

  return (
    <div>
    <div className={classes.answer_container}>
      <div className={classes.question}>
        <h2>Question</h2>
        <h3><IoMdArrowRoundForward />{title}</h3>
        <p>Description: {description}</p>
      </div>
      <div className={classes.get_answers}>
        <h2>Answers from the community</h2>
        {loading ? (
          <BeatLoader color="#36d7b7" />
        ) : error ? (
          <p className={classes.err}>{error}</p>
        ) : answers.length === 0 ? (
          <p className={classes.message}>No answers available!</p>
        ) : (
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <div className={classes.user_info}>
                <FaUser className={classes.icon} />
                <p className={classes.username}>{answer.username || "Unknown"}</p>
                </div>
                <div>{answer.answer}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.post_answer}>
        <h2>Post your answer below!</h2>
        <form onSubmit={handlePostAnswer}>
          <textarea
            placeholder="Enter your answer"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button type="submit">Post your Answer</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Answer;
