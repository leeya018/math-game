import { makeAutoObservable } from "mobx";
import { addRecordApi, getAllUsersRecordsApi, getRecordsApi } from "api";
function findWinners(items) {
  let winners = {};
  items.forEach((item) => {
    for (let key in item.records) {
      if (!winners[key]) {
        winners[key] = { name: item.name, score: item.records[key] };
      } else if (item.records[key] > winners[key].score) {
        winners[key] = { name: item.name, score: item.records[key] };
      }
    }
  });
  return winners;
}

class Math {
  records = [];
  allUsersRecords = [];

  constructor() {
    makeAutoObservable(this);
  }

  addRecord = async (record) => {
    await addRecordApi(record);
    let tmpRecs = { ...this.records };
    tmpRecs[record.level] = record.score;
    this.records = tmpRecs;
  };
  getRecords = async () => {
    this.records = await getRecordsApi();
  };
  getAllUsersRecords = async () => {
    const totalUsers = await getAllUsersRecordsApi();
    console.log(findWinners(totalUsers));
    this.allUsersRecords = findWinners(totalUsers);
  };
}

export const mathStore = new Math();
