import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { mathStore } from "mobx/mathStore";

const convertObjectToArray = (obj) => {
  return Object.keys(obj).map((key) => ({
    level: parseInt(key, 10),
    name: obj[key].name,
    score: obj[key].score,
  }));
};
const Table = observer(() => {
  useEffect(() => {
    mathStore.getAllUsersRecords();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <table className="text-center border-2 border-white w-[30%]">
        <thead className="border-2 border-white">
          <tr className="flex justify-around items-center">
            <th className="flex justify-center items-center  cursor-pointer">
              <div>{"level"}</div>
            </th>
            <th className="flex justify-center items-center  cursor-pointer">
              <div>{"name"}</div>
            </th>
            <th className="flex justify-center items-center  cursor-pointer">
              <div>{"score"}</div>
            </th>
          </tr>
        </thead>

        <tbody className="">
          {convertObjectToArray(mathStore.allUsersRecords).map((rc, index) => (
            <tr key={index} className="flex justify-around border">
              <td className="">{rc.level}</td>
              <td className="">{rc.name}</td>
              <td className="">{rc.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
