import axios from "axios";
import { makeAutoObservable } from "mobx";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

class User {
  photoURL = "";
  displayName = "";
  uid = "";
  token = "";
  believes = {};

  constructor() {
    makeAutoObservable(this);
    this.loadState();
  }

  setBelief(value) {
    this.belief = value;
  }

  setDisplayName(value) {
    this.displayName = value;
  }
  loadState() {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = window.localStorage.getItem("user");
      if (user !== null && user !== undefined) {
        this.photoURL = JSON.parse(user).photoURL;
        this.displayName = JSON.parse(user).displayName;
        this.uid = JSON.parse(user).uid;
        this.token = JSON.parse(user).token;
        console.log("loadState => " + this.displayName);
      }
    }
  }

  saveState() {
    console.log("saveState");
    if (typeof window !== "undefined" && window.localStorage) {
      const user = {
        photoURL: this.photoURL,
        displayName: this.displayName,
        uid: this.uid,
        token: this.token,
      };
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }

  setLoginUser = (user) => {
    this.photoURL = user.photoURL;
    this.displayName = user.displayName;
    this.uid = user.uid;
  };
  resetLoginUser = () => {
    this.photoURL = "";
    this.displayName = "";
    this.uid = "";
  };

  hasToken = () => {
    return this.token !== undefined && this.token;
  };

  setToken = (newToken) => {
    this.token = newToken;
  };
  removeToken = () => {
    localStorage.removeItem("token");
  };

  addUserApi = async (user) => {
    console.log(user);

    const userRef = doc(db, "users", userStore.uid);

    // Finally, update the balance in the database
    return setDoc(userRef, {
      name: user.displayName,
      uid: user.uid,
      created_date: new Date(),
      balance: 0,
      transactions: [],
      products: [],
    });
  };
}

export const userStore = new User();
