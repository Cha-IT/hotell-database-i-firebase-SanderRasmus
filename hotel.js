import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from "./firebaseConfig.js";
import { HotelRom } from "./romClass.js";

const RomContainerEl = document.querySelector("#Rom-Container");
const FilterBtns = document.querySelectorAll(".FilterBtn");

FilterBtns.forEach((button) => {
  button.addEventListener("click", HentRom);
});

async function HentRom(e) {
  let Valgtfilter = e.target;

  const databaseSnapshot = await getDocs(collection(db, "hotelrom"));

  while (RomContainerEl.firstChild) {
    RomContainerEl.removeChild(RomContainerEl.firstChild);
  }

  if (Valgtfilter.id === "Etasje1") {
    const q = query(collection(db, "hotelrom"), where("Etasje", "==", 1));
    const querySnapshot = await getDocs(q);

    databaseFilter(querySnapshot);
  }

  if (Valgtfilter.id === "Etasje2") {
    const q = query(collection(db, "hotelrom"), where("Etasje", "==", 2));
    const querySnapshot = await getDocs(q);

    databaseFilter(querySnapshot);
  }

  if (Valgtfilter.id === "1Seng") {
    const q = query(collection(db, "hotelrom"), where("Sengeplasser", "==", 1));
    const querySnapshot = await getDocs(q);

    databaseFilter(querySnapshot);
  }

  if (Valgtfilter.id === "2Seng") {
    const q = query(collection(db, "hotelrom"), where("Sengeplasser", ">=", 2));
    const querySnapshot = await getDocs(q);

    databaseFilter(querySnapshot);
  }

  if (Valgtfilter.id === "AlleRom") {
    databaseSnapshot.forEach((rom) => {
      const romData = rom.data();
      new HotelRom(romData);
    });
  }

  if (Valgtfilter.id === "LedigeRom") {
    const q = query(collection(db, "hotelrom"), where("Ledig", "==", true));
    const querySnapshot = await getDocs(q);

    databaseFilter(querySnapshot);
  }
}

function databaseFilter(querySnapshot) {
  querySnapshot.forEach((rom) => {
    const romData = rom.data();
    new HotelRom(romData);
  });
}
