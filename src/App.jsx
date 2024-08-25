import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import { UserProvider } from "./components/UserContext";

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  async function fetchArtwork(keyword) {
    const artworkData = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`
    ).then(async (res) => {
      const data = await res.json();
      const newResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${data["objectIDs"][0]}`
      );
      const newData = await newResponse.json();
      return newData;
    });

    setArtwork(artworkData);
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<UserForm />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}
