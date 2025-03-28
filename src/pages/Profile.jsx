// import React from 'react'
import { useEffect } from "react";
import DashboardNewPatientCard from "../components/DashNewPatientCard";
import DashboardYourPatientCard from "../components/DashYourPatientCard";
import { auth, db } from "../utilities/firebaseConfig";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="flex md:ml-[300px] ml-[90px] md:mt-[130px] mt-[100px] flex-col max-md:justify-center">
      <div className="text-[#4B465C] text-[26px] font-extrabold pr-8">
        <span>Welcome Back, {name}</span>
      </div>
      <div className="text-[#4B465C] text-[15px] font-normal pr-8">
        <span>
          Manage your patients and provide personalized care efficiently.
        </span>
      </div>
      <div className="flex mt-[50px] gap-[30px] flex-wrap sm:pr-16 pr-8">
        <DashboardNewPatientCard />
        <DashboardYourPatientCard />
      </div>
    </div>
  );
}
