import { useState, useRef, useEffect } from "react";
import SantaVideo from "../assets/SantaVideo.mp4";
import Logo from "../assets/ess-group-logo.webp";
import QuestionPic from "../assets/thumbnail_image.png";
import React from "react";
require("dotenv").config();

const Dec3 = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [guessResult, setGuessResult] = useState(null);
  const [email, setEmail] = useState(""); // Ny state för e-postadress
  const [emailError, setEmailError] = useState(false); // Ny state för att hålla koll på om e-posten är felaktig
  const questionRef = useRef(null);

  const handleButtonClick = () => {
    if (email) {
      setShowQuestion(true);
      setEmailError(false); // Återställ felindikator om e-post är korrekt
    } else {
      setEmailError(true); // Sätt felindikator om e-postfältet är tomt
    }
  };

  const handleGuess = async (isCorrect) => {
    if (guessResult !== null) return;
    setGuessResult(isCorrect);

    // Skicka gissning och e-post till servern
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          guess: isCorrect ? "Rätten att bli bortglömd" : "Wrong answer", // Anpassa gissningens logik
          isCorrect: isCorrect,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Bekräftelse från servern
      } else {
        console.error("Failed to save answer.");
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (questionRef.current && !questionRef.current.contains(event.target)) {
        setShowQuestion(false);
      }
    };

    if (showQuestion) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQuestion]);

  return (
    <div
      style={{
        backgroundColor: "rgb(255, 51, 51)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        width: "full",
      }}
    >
      <div>
        <video
          width="300px"
          autoPlay
          loop
          muted
          style={{
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <source src={SantaVideo} type="video/mp4" />
          Din webbläsare stödjer inte video.
        </video>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          width: "full",
        }}
      >
        <input
          style={{
            padding: "20px 40px",
            margin: "20px",
            borderRadius: "10px",
            border: emailError ? " 2px solid black" : "none",
          }}
          placeholder="Enter email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <button
          style={{
            fontSize: "30px",
            backgroundColor: "rgb(0, 118, 0)",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          onClick={handleButtonClick}
        >
          Lucka 3
          <img
            src={Logo}
            alt="ESS Logo"
            style={{
              width: "200px",
              display: "block",
            }}
          />
        </button>
      </div>

      {showQuestion && (
        <div
          ref={questionRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
            backgroundColor: "rgba(255, 255, 255)",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Fråga för den 3:a december:</h2>

          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={QuestionPic}
              alt="Söt bild"
              style={{
                width: "300px",
                borderRadius: "10px",
                marginTop: "30px",
              }}
            />

            <p
              style={{
                fontSize: "20px",
                position: "absolute",
                top: "1px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255)",
                padding: "4px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Fråga 3: Vilken heter rätten som ger GDPR individer när det gäller
              att få sina personuppgifter raderade från en organisations
              databas?
            </p>
            <div>
              <button
                style={{
                  backgroundColor:
                    guessResult !== null
                      ? false
                        ? "green"
                        : "red"
                      : "rgb(0, 118, 0, 0.7)",
                  border: "none",
                  borderRadius: "5px",
                  padding: "20px",
                  margin: "20px",
                  cursor: guessResult !== null ? "not-allowed" : "pointer",
                  opacity: guessResult !== null ? 1 : 1,
                }}
                onClick={() => handleGuess(false)}
                disabled={guessResult !== null}
              >
                Rätten till tillgång
              </button>
              <button
                style={{
                  backgroundColor:
                    guessResult !== null
                      ? false
                        ? "green"
                        : "red"
                      : "rgb(0, 118, 0, 0.7)",
                  border: "none",
                  borderRadius: "5px",
                  padding: "20px",
                  margin: "20px",
                  cursor: guessResult !== null ? "not-allowed" : "pointer",
                  opacity: guessResult !== null ? 1 : 1,
                }}
                onClick={() => handleGuess(false)}
                disabled={guessResult !== null}
              >
                Rätten till rättelse
              </button>
              <button
                style={{
                  backgroundColor:
                    guessResult !== null
                      ? true
                        ? "limegreen"
                        : "red"
                      : "rgb(0, 118, 0, 0.7)",
                  border: "none",
                  borderRadius: "5px",
                  padding: "20px",
                  margin: "20px",
                  cursor: guessResult !== null ? "not-allowed" : "pointer",
                  opacity: guessResult !== null ? 1 : 1,
                }}
                onClick={() => handleGuess(true)}
                disabled={guessResult !== null}
              >
                Rätten att bli bortglömd
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dec3;
