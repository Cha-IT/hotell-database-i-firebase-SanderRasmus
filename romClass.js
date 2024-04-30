const RomContainerEl = document.querySelector("#Rom-Container");

class HotelRom {
  constructor(romData) {
    this.romdata = romData;
    this.LagRomCard();
  }

  LagRomCard() {
    this.cardContainer = document.createElement("div");
    this.cardContainer.classList.add("HotelCard");

    this.RomOverskrift = document.createElement("h2");
    this.RomOverskrift.textContent =
      "Rom " + this.romdata.RomNummer + "  -  " + this.romdata.Type;

    this.Bilde = document.createElement("img");
    this.Bilde.src = this.romdata.BildeSrc;

    this.Sengeplasser = document.createElement("p");
    this.Sengeplasser.textContent = this.romdata.Sengeplasser + " Sengeplasser";
    this.Sengeplasser.id = "Sengeplass";

    this.RomBeskrivelse = document.createElement("p");
    this.RomBeskrivelse.textContent = this.romdata.RomBeskrivelse;

    this.cardContainer.append(
      this.RomOverskrift,
      this.Bilde,
      this.Sengeplasser,
      this.RomBeskrivelse
    );
    RomContainerEl.appendChild(this.cardContainer);
  }
}

export { HotelRom };
