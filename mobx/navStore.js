import { makeAutoObservable } from "mobx";

class Nav {
  activeNavItem = "Game";

  constructor() {
    makeAutoObservable(this);
  }
  setActiveNavItem = (navItem) => {
    this.activeNavItem = navItem;
  };
}

export const navStore = new Nav();
