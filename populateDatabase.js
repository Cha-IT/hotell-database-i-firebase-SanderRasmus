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

async function PopulateDB(RomNum, RomInfo, RomType, noOfBeds, isAvailble, RomFloor, ImgSrc) {
    try {
        await addDoc(
            collection(db, "hotelrom"), {
                RomNummer: RomNum,
                RomBeskrivelse: RomInfo,
                Type: RomType,
                Sengeplasser: noOfBeds,
                Ledig: isAvailble,
                Etasje: RomFloor, 
                BildeSrc: ImgSrc
            }
        )
    } catch(error) {
        console.error('Error: ', error);
    }
}

PopulateDB(202, "Et kjempe fint rom", "Suite", 4, false, 2, "./assets/rom2.jpg");
PopulateDB(232, "Et kjempe fint dobbelt rom", "Dobbel", 2, false, 2, "./assets/rom1.jpg");
PopulateDB(182, "Kjempe bra rom for de som sliter", "Single", 1, true, 1, "./assets/rom1.jpg");
PopulateDB(140, "Økonomisk billig rom. Ikke inkludert frokost, pute eller dyne", "Single", 1, true, 1, "./assets/rom1.jpg");
PopulateDB(222, "Luft Madrass Suiten, koster kun 50kr dagen per pers og har kun luftmadrasser", "Suite", 15, true, 2, "./assets/rom2.jpg");
PopulateDB(105, "Vaktmesterns kontor. Kan kun leies mellom 16-18:00. Med prisen får du med gårsdagens matpakke og litt leverpostei", "Bøttekott", 1, true, 1, "./assets/rom1.jpg");
