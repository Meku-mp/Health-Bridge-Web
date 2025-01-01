// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// import cardImage from "../assets/newp.png";
// Replace with the actual path to your image
import CardImage from "../assets/Doctor in a room with a patient.png";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../utilities/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function DashYourPatientCard() {
  const [len, setLen] = useState(0);
  const naviagate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const docData = userDoc.data();
          const patientCollection = collection(db, "ReceiptUpload");
          const q = query(
            patientCollection,
            where("selectedDoctorName", "==", docData.name)
          );
          const snapshot = await getDocs(q);

          const count = snapshot.docs.filter(
            (doc) => doc.data().status === "1"
          ).length;
          setLen(count);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex ">
      <div className="flex max-w-[454px] p-[24px] space-x-4 bg-white border border-[#DBDADE] rounded-[6px] shadow min-h-[197px]">
        <div className="flex flex-col ">
          <div>
            <h2 className="text-[18px] font-medium text-[#4B465C]">
              Your Patients
            </h2>
            <p className="text-[15px] text-[#4B465C]">
              View and manage your existing patients with ease.
            </p>
          </div>
          <span className="text-[22px] font-medium text-[#123258] mt-[5px]">
            {len}
          </span>
          <div className="flex items-center mt-[4px]">
            <button
              className="text-[15px] font-medium  text-white  bg-[#123258] rounded-[6px] hover:bg-[#0d1e33] w-[76px] h-[38px]"
              onClick={() => naviagate("/yourpatients")}
            >
              View
            </button>
          </div>
        </div>
        <div className="">
          <img
            src={CardImage}
            alt="New Patient"
            className=" w-[198px] h-[158px] "
          />
        </div>
      </div>
    </div>
  );
}

export default DashYourPatientCard;
