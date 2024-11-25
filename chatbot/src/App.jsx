import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDusjUTAuGypndRGen_tyNUwQk_B_tpH24",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      {/* Header Section */}
      <nav className="header">
        <div className="header-container">
          <h1 className="header-title">AI POWERED GPT</h1>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="image-container">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.STpsa_NQRqmxX_rkr4_tIgHaHa&pid=Api&P=0&h=180"
              alt="Chat AI Logo"
              className="favicon"
            />
          </div>
          <h1 className="welcome animate-bounce">Welcome</h1>
          <p className="description">AI Chatbot For Your Quries.</p>
          <form onSubmit={generateAnswer} className="form">
            <textarea
              required
              className="textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything"
            ></textarea>
            <button
              type="submit"
              className={`submit-button ${generatingAnswer ? "disabled" : ""}`}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? "Generating..." : "Generate answer"}
            </button>
          </form>
        </div>

        {/* Answer Section */}
        <div className="answer-container">
          <ReactMarkdown className="answer">{answer}</ReactMarkdown>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 ChatGPT. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </>
  );
}

export default App;
