import Timer from "components/math/Timer";
import React, { useState, useEffect, useRef } from "react";
import useSound from "hooks/useSound";
import AnimatedImage from "components/math/AnimatedImage";
import { generateRandomNumbers } from "util";
import { addRecordApi, initUserRecordsApi } from "api";
import { mathStore } from "mobx/mathStore";
import Table from "components/math/Table";
import { observer } from "mobx-react-lite";
import { userStore } from "mobx/userStore";
import { useRouter } from "next/router";
import { navStore } from "mobx/navStore";
import NavSelect from "ui/NavSelect";
import WorldRecs from "components/math/worldRecs";
import NavTop from "components/math/NavTop";
import StartGameModal from "components/math/Modal/StartGame";
import { modalNames, modalStore } from "mobx/modalStore";
import useSocket from "hooks/useSocket";
import PlayerScore from "components/math/PlayerScore";

export const timeTotal = 60;
const index = observer(() => {
  const [num1, setNum1] = useState(20);
  const [num2, setNum2] = useState(2);
  const [operator, setOperator] = useState("+");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  //
  const { response, sendMessage } = useSocket();
  const [responseObj, setResponseObj] = useState([]);

  //
  const [time, setTime] = useState(timeTotal);
  const [countWins, setCountWins] = useState(0);
  const [showTrophy, setShowTrophy] = useState(false);
  //
  const [level, setLevel] = useState(1);
  const { sound, playSound } = useSound("/win.wav");
  const router = useRouter();

  const { activeNavItem, setActiveNavItem } = navStore;
  const { openModal, modalName } = modalStore;

  useEffect(() => {
    if (response) {
      const obj = {
        [response.name]: response.score,
      };
      setResponseObj((prev) => ({ ...prev, ...obj }));
    }
  }, [response]);
  console.log({ responseObj });
  useEffect(() => {
    if (!userStore.uid) {
      router.push("/login");
    }
    // initUserRecordsApi();
    mathStore.getRecords();
    // addRecordApi({ score: 2, level: 1 });
    inputRef?.current?.focus();
  }, []);
  useEffect(() => {
    if (time == 0) {
      if (parseInt(mathStore.records[level]) < countWins) {
        playSound();
        setShowTrophy(true);
        mathStore.addRecord({ level, score: countWins });
        setTimeout(() => {
          setShowTrophy(false);
          openModal(modalNames.StartGame);
        }, 3000);
      } else {
        openModal(modalNames.StartGame);
      }
    }
  }, [time]);

  useEffect(() => {
    // You can also add event listener to document or specific element
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    setTime(timeTotal);
  }, [level]);

  const handleScroll = (e) => {
    setLevel(e.target.value); // update the level state with the new value
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setError(false);
    let answer = eval(`${num1}${operator}${num2}`);

    if (parseInt(e.target.value) === answer) {
      setCountWins((prev) => prev + 1);
      sendMessage(userStore.displayName, countWins + 1);
      const { firstNumber, operator, secondNumber } =
        generateRandomNumbers(level);

      setNum1(firstNumber);
      setNum2(secondNumber);
      setOperator(operator);
      setUserInput("");
    } else if (e.target.value.length === answer.toString().length) {
      setError(true);
      setTimeout(() => setError(false), 1000);
      setUserInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Shift") {
      setUserInput((prev) => prev.substring(0, prev.length - 1));
    }
  };

  return (
    <div className="flex flex-col items-center   h-[100vh] bg-blue_dark text-white">
      <StartGameModal
        inputRef={inputRef}
        setTimerGame={setTime}
        setCountWins={setCountWins}
      />
      {/* get squrer */}
      <div>
        {Object.keys(responseObj).length > 0 &&
          Object.keys(responseObj).map((key) => (
            <PlayerScore key={key} name={key} score={responseObj[key]} />
          ))}
      </div>

      <NavTop />
      {showTrophy && <AnimatedImage />}

      <div className="mt-16">
        <div>Best Score : {mathStore.records[level]}</div>
        <div>Your Score : {countWins}</div>
        <Timer time={time} setTime={setTime} />
        <div className=" flex flex-col justify-center">
          <input
            type="range"
            min="1"
            max="5" // Set the range as 0-100. You can adjust this as needed.
            value={level}
            onChange={handleScroll} // handle the scroll event to update the level state
          />
          <div>level : {level}</div>
        </div>
      </div>
      <NavSelect
        className="mt-3"
        items={{
          WorldRecords: "WorldRecords",
          MyRecords: "MyRecords",
          Game: "Game",
        }}
        active={activeNavItem}
        setActive={setActiveNavItem}
      />

      {/* Table */}
      {activeNavItem === "MyRecords" && <Table />}
      {activeNavItem === "Game" && (
        <InputGame
          num2={num2}
          operator={operator}
          num1={num1}
          userInput={userInput}
          handleKeyDown={handleKeyDown}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          error={error}
        />
      )}
      {activeNavItem === "WorldRecords" && <WorldRecs />}

      {/* <Table /> */}
      {/* the game */}
    </div>
  );
});

export default index;

function InputGame({
  num2,
  operator,
  num1,
  userInput,
  handleKeyDown,
  inputRef,
  handleInputChange,
  error,
}) {
  return (
    <div className="flex justify-center relative top-44 w-full">
      <div>
        {num1} {operator} {num2} =
      </div>
      <div className="flex justify-center">
        <input
          className="appearance-none border-none rounded-md focus:ring-0 focus:border-none text-black "
          type="number"
          value={userInput}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          onChange={handleInputChange}
          onBlur={() => inputRef.current.focus()}
        />
        <div className="w-10">
          {error && (
            <span style={{ color: "red", paddingRight: "10px" }}>X</span>
          )}
        </div>
      </div>
    </div>
  );
}
