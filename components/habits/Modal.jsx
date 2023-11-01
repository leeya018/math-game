import { useEffect } from "react";
import { useRef } from "react";
import Button from "./Button";
import Title from "./Title";

function Modal({ isShow, title, text, textButton = "", onClick = () => {} }) {
  const buttonRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  }, []);
  return (
    <>
      {isShow && (
        <div
          className="absolute top-0  w-full h-full bg-black
     flex justify-center items-center z-20 bg-gray_dark bg-opacity-75 border-2 border-blue "
        >
          <div
            className="  border-black
       flex justify-center items-center
        w-96 h-64 bg-white relative "
          >
            <div className="flex flex-col justify-between border-2 h-full w-full">
              {/* <h1 className="pt-2 text-center  font-bold ">{title}</h1> */}
              <div className="text-center">
                <Title>{title}</Title>
              </div>
              <div className="pt-1  self-center text-center">{text}</div>
              <div className="flex justify-center">
                <Button
                  position="relative bottom-2"
                  size={"w-[128px] h-[43px]"}
                  color="bg-blue"
                  onClick={onClick}
                >
                  {textButton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
