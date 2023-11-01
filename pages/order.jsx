import React from "react";
let counter = 0;
let workTime = 2000;
let breakTime = 300;
let foodTime = 5000;
let endTime = 20000;
export default function order() {
  const timeTo = async (time, mission) => {
    console.log(mission);
    console.log(mission);
    await sleep(time);
  };

  const water = async (amount) => {
    console.log("need to drink " + amount + " water");
    console.log("need to drink " + amount + " water");
  };
  const sleep = (time) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(), [time])
    );
  };

  const startSession = async () => {
    while (counter < endTime) {
      await timeTo(workTime, "work");
      water(4);

      await timeTo(breakTime, "break");
      counter += breakTime + workTime;
      if ((breakTime + workTime) * 4 === counter) {
        await timeTo(foodTime, "food");
      }
    }
    alert("go home");
  };
  return (
    <div>
      <h1>oreder</h1>
      <button onClick={startSession}>click to start </button>
    </div>
  );
}
