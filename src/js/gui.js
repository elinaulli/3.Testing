import mirIcon from "../img/mir.png";
import maestroIcon from "../img/maestro.png";
import visaIcon from "../img/visa.png";
import unionPayIcon from "../img/unionpay.png";
import CardDetector from "../js/CardDetector.js";
import LuhnValidator from "../js/LuhnValidator.js";

export default class Gui {
  constructor() {
    this.detector = new CardDetector();
    this.currentCard = null;
  }

  init() {
    this.containerCard = document.querySelector(".container-card");
    this.cardNumber = document.getElementById("cardNumber");
    this.validateBtn = document.getElementById("validateBtn");
    this.result = document.getElementById("result");

    this.createCards();
    this.setupEvents();
  }

  createCards() {
    const cards = [
      { type: "visa", name: "VISA", icon: visaIcon },
      { type: "mastercard", name: "MASTERCARD", icon: maestroIcon },
      { type: "mir", name: "МИР", icon: mirIcon },
      { type: "unionpay", name: "UnionPay", icon: unionPayIcon },
    ];

    cards.forEach((card) => {
      const img = document.createElement("img");
      img.src = card.icon;
      img.dataset.type = card.type;
      img.classList.add("card-img");
      img.alt = card.name;
      this.containerCard.append(img);
    });
  }

  setupEvents() {
    this.cardNumber.addEventListener("input", (e) => {
      this.formatCardNumber(e);
    });

    this.validateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.validateCard();
      this.detectCard();
    });
  }

  formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let formatted = "";

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += value[i];
    }

    e.target.value = formatted;
  }

  detectCard() {
    const number = this.cardNumber.value.replace(/\s+/g, "");

    this.resetCards();

    if (number.length >= 2) {
      this.currentCard = this.detector.detect(number);

      if (this.currentCard) {
        this.highlightCard(this.currentCard.type);
        this.showMessage(`Обнаружена ${this.currentCard.name} карта`, "info");
      } else {
        this.showMessage("Неизвестный тип карты", "error");
      }
    } else {
      this.currentCard = null;
      this.hideMessage();
    }
  }

  validateCard() {
    const number = this.cardNumber.value.replace(/\s+/g, "");

    if (!number) {
      this.showMessage("Введите номер карты", "error");
      return;
    }

    if (!this.currentCard) {
      this.showMessage("Не удалось определить тип карты", "error");
      return;
    }

    const isValid = LuhnValidator.check(number);

    if (isValid) {
      this.showMessage("Карта валидна!", "success");
      this.markCardValid();
    } else {
      this.showMessage("Неверный номер карты", "error");
      this.markCardInvalid();
    }
  }

  resetCards() {
    this.containerCard.querySelectorAll(".card-img").forEach((img) => {
      img.classList.remove("active", "valid", "invalid");
    });
  }

  highlightCard(cardType) {
    const cardElement = this.containerCard.querySelector(
      `[data-type="${cardType}"]`,
    );
    if (cardElement) cardElement.classList.add("active");
  }

  markCardValid() {
    if (!this.currentCard) return;
    const cardElement = this.containerCard.querySelector(
      `[data-type="${this.currentCard.type}"]`,
    );
    if (cardElement) {
      cardElement.classList.add("valid");
    }
  }

  markCardInvalid() {
    if (!this.currentCard) return;
    const cardElement = this.containerCard.querySelector(
      `[data-type="${this.currentCard.type}"]`,
    );
    if (cardElement) {
      cardElement.classList.add("invalid");
    }
  }

  showMessage(message, type) {
    this.result.textContent = message;
    this.result.className = `result ${type}`;
  }

  hideMessage() {
    this.result.textContent = "";
    this.result.className = "result";
  }
}
