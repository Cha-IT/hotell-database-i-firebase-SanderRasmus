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

/* Henter inn alle HTML Elementer */
const RomContainerEl = document.querySelector("#Rom-Container");
const EtasjeFilter = document.querySelector("#Etasje-Filter");
const SengeplassFilter = document.querySelector("#Sengeplass-Filter");
const RomTypeFilter = document.querySelector("#RomType-Filter");
const TilgjengeligFilter = document.querySelector("#Tilgjengelig-Filter");

/* Lager en egen array over mine elementer og bruker en for-løkke til eventlistener */ 
[EtasjeFilter, SengeplassFilter, RomTypeFilter, TilgjengeligFilter].forEach((selektor) => {
  selektor.addEventListener("change", hentData);
});

/* Asynkron kode som henter ut data */
async function hentData() {
  const etasje = EtasjeFilter.value;
  const senger = SengeplassFilter.value;
  const romtype = RomTypeFilter.value;
  const tilgjengelig = TilgjengeligFilter.value;

  /* Filter Array som lagrer hvilke filtere vi benytter oss av og dens data */
  const filtere = [];
  
  /* Så lenge Etasje ikke har empty value pusher den filteret med etasje valuen 1 eller 2. 
  Dette kommer som string så vi endrer det til integer for å passe med databasen's data */
  if (etasje !== "") {
    filtere.push(where("Etasje", "==", parseInt(etasje)));  
  }
  
  /* Samme Prosess som over */
  if (senger !== "") {
    if(senger == "3"){
      filtere.push(where("Sengeplasser", ">=", parseInt(senger)));
    } else {
      filtere.push(where("Sengeplasser", "==", parseInt(senger)));
    }
  }

  /* Samme Prosess som over uten parsing siden hoteltype er en string */
  if (romtype !== "") {
    filtere.push(where("Type", "==", romtype));
  }

  /* Samme Prosess som over men med isAvailble siden den er boolean */
  if (tilgjengelig !== "") {
    const isAvailable = tilgjengelig === "1"; 
    filtere.push(where("Ledig", "==", isAvailable));
  }

  // Lager en spørring ved å kombinere alle filtrene som er valgt.
  // Den starter med samlingen "hotelrom" fra databasen,
  // og legger til hvert filter for å begrense resultatene etter behov.
  const filtrertQuery = filtere.reduce((acc, filter) => query(acc, filter), collection(db, "hotelrom"));
  const querySnapshot = await getDocs(filtrertQuery);

  /* Hvis filter array lengden er større en 0 blir dataen vist på skjermen */
  if(filtere.length > 0) {
    visData(querySnapshot);
  }

  /* Er null filtere valgt fjerner den alt som blir visst */
  if(filtere.length == 0) {
    while (RomContainerEl.firstChild) {
      RomContainerEl.removeChild(RomContainerEl.firstChild);
    }
  }
}

// Vis data funksjonen
function visData(querySnapshot) {
  // Fjerner alt først før den viser slik at gammel data blir bort
  while (RomContainerEl.firstChild) {
    RomContainerEl.removeChild(RomContainerEl.firstChild);
  }

  // Dynamisk lager dataen ved bruk av hotelrom klassen. Querysnapshot er begrepet brukt
  // For å definere dataen som vi henter ut fra databasen.
  querySnapshot.forEach((rom) => {
    // romData er dataen vi hvert dokument i databasen
    const romData = rom.data();
    // Vi sender det videre inn til hotelrom klassen slik at den kan ta bruk av dataen
    // Når den genererer / dynamisk viser informasjon.
    new HotelRom(romData);
  });
}
