import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import { ReactComponent as ContentCreatorImage } from "../images/content-creator.svg";

const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
const defaultEmailError = "You gotta fill this, you know&hellip;";
function Homepage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [
    isEmailSubmissionSuccessful,
    setIsEmailSubmissionSuccessful,
  ] = useState(false);
  useEffect(() => {
    setEmailError("");
  }, [email]);
  return (
    <div className="w-100">
      <div className={`${styles.polygon} container-fluid`}>
        <section
          className={`${styles.navbar} row d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 py-4`}
        >
          <h1 className="w-75 text-center mt-2 mt-md-0 mb-0">
            we are what we <span className="text-primary">code</span>
          </h1>
        </section>
        <section
          className={`${styles.explainer} row`}
          style={{ marginTop: "6rem" }}
        >
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-row justify-content-center justify-content-md-end">
            <ContentCreatorImage
              className="w-75"
              style={{ height: "min-content" }}
            />
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center">
            <div>
              <h2>
                <motion.i
                  initial={{
                    rotate: -180,
                  }}
                  animate={{
                    y: [-4, -2, -4],
                    transition: {
                      type: "spring",
                      duration: 1.25,
                      repeat: Infinity,
                    },
                  }}
                  className="fas fa-fighter-jet"
                ></motion.i>
                &nbsp;&nbsp;<span className="text-primary">tech</span> moves
                fast
              </h2>
              <p
                style={{
                  fontWeight: 300,
                  lineHeight: "1.75",
                  letterSpacing: "2px",
                }}
              >
                catch up with 1 newsletter a week
                <br />
                exclusively for &lt;200 people till Q2 2021
              </p>
              <form
                action="https://wearewhatwecode.us1.list-manage.com/subscribe/post?u=e7174b918aa867c451ebf93de&amp;id=eabe22d86b"
                method="post"
                className="position-relative"
                target="_blank"
                noValidate
              >
                <div className="d-flex flex-column flex-md-row">
                  <input
                    className={`${emailError ? "invalid" : ""}`}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    placeholder="email address"
                    required
                    disabled={disableInput}
                  />
                  <button
                    type="button"
                    disabled={disableInput}
                    onClick={() => {
                      if (emailPattern.test(email)) {
                        setDisableInput(true);
                        fetch(
                          "https://us-central1-we-are-what-we-code.cloudfunctions.net/new-subscriber",
                          {
                            method: "POST",
                            body: JSON.stringify({ email }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                          .then((res) => {
                            setIsEmailSubmissionSuccessful(res.ok);
                            if (res.ok) {
                              return Promise.resolve(null);
                            }
                            return res.json();
                          })
                          .then((res) => {
                            if (res) {
                              setEmailError(res.message);
                            }
                            setDisableInput(false);
                          });
                      } else {
                        setEmailError(defaultEmailError);
                      }
                    }}
                    className="btn btn-primary ml-0 ml-md-2 mt-2 mt-md-0"
                  >
                    subscribe
                  </button>
                </div>
                <div
                  className={`invalid-feedback position-absolute d-flex ${
                    emailError && !isEmailSubmissionSuccessful
                      ? "visible"
                      : "invisible"
                  }`}
                  dangerouslySetInnerHTML={{ __html: emailError }}
                ></div>
                <div
                  className={`valid-feedback position-absolute d-flex ${
                    isEmailSubmissionSuccessful ? "visible" : "invisible"
                  }`}
                >
                  You're in. Watch out for the next issue!
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
