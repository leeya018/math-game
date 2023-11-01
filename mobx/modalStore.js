import { makeAutoObservable } from "mobx";
export const modalNames = {
  StartGame: "StartGame",
};
class Modal {
  modalName = "";

  constructor() {
    makeAutoObservable(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal = () => {
    this.modalName = "";
  };
  openModal = (name) => {
    this.modalName = name;
  };
}

export const modalStore = new Modal();
