import { useEffect, useRef, useState } from "react";
import { modalNames, modalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import Title from "ui/Title";

import StandardButton from "ui/button/standard";
import CloseButton from "ui/button/close";

import { sleep } from "util";
import { timeTotal } from "pages";

const StartGameModal = observer(({ inputRef, setTimerGame, setCountWins }) => {
  const { closeModal, modalName } = modalStore;
  const [time, setTime] = useState(3);

  useEffect(() => {
    // You can also add event listener to document or specific element
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      start();
    }
  };
  const start = async (e) => {
    let i = 3;
    while (i > 0) {
      i--;
      setTime(i);
      await sleep(1000);
    }
    closeModal();
    setCountWins(0);
    setTimerGame(timeTotal);
    setTime(3);
    inputRef.current?.focus();
  };

  return (
    <>
      <div
        className={`absolute h-screen top-0 left-0
        right-0 bottom-0 bg-grayb2 
        flex justify-center items-center z-10 bg-opacity-70 visible  ${
          modalName === modalNames.StartGame ? "visible" : "invisible"
        }`}
      >
        <div className="absolute bg-white left-1/2 top-1/2 transform  -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-md text-black">
          <div>
            <Title className="mb-4">{"Game Over"}</Title>
            {time < 3 && (
              <div className="flex justify-center">starting in : {time}</div>
            )}
            <CloseButton onClick={() => closeModal()} />

            <div className="flex justify-center gap-4 mt-4">
              {time == 3 && (
                <StandardButton
                  className="bg-red-500 px-4 hover:bg-gray_dark"
                  onClick={start}
                >
                  Start
                </StandardButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default StartGameModal;
