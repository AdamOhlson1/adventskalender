import { useState, useRef, useEffect } from "react";
import SantaVideo from "../assets/SantaVideo.mp4";
import Logo from "../assets/ess-group-logo.webp";
import QuestionPic from "../assets/thumbnail_image.png";
import React from "react";

const Dec7 = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [guessResult, setGuessResult] = useState(null);
  const questionRef = useRef(null);

  const handleButtonClick = () => {
    setShowQuestion(true);
  };

  const handleGuess = (isCorrect) => {
    if (guessResult !== null) return;
    setGuessResult(isCorrect);
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
    <section
      style={{
        backgroundColor: "rgb(180, 0, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div>
        <video
          width="450px"
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

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <button
          style={{
            marginTop: "5px",
            fontSize: "30px",
            backgroundColor: "rgb(0, 118, 0)",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
          onClick={handleButtonClick}
        >
          Lucka 1
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
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Fråga för den 1:a december:</h2>

          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={QuestionPic}
              alt="Söt bild"
              style={{
                width: "500px",
                borderRadius: "10px",
              }}
            />

            <p
              style={{
                fontSize: "20px",
                position: "absolute",
                top: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "8px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Fråga 1: Vem är yngst i IT gänget?
            </p>
            <div>
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
                Adam
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
                Jesper
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
                Jesper
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dec7;
