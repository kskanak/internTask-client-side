import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

const ConfirmMsg = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [applicantInfo, setApplicantInfo] = useState("");

  fetch(`http://localhost:5000/applicant/${user?.email}`)
    .then((res) => res.json())
    .then((data) => {
      setApplicantInfo(data);
    })
    .catch((error) => console.log(error));

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <section className="p-6 mt-10">
        <div className="container max-w-xl mx-auto shadow-md border-t">
          <div className="flex flex-col items-center w-full p-6 space-y-8 rounded-md lg:h-full lg:p-8 dark:bg-gray-900 dark:text-gray-100">
            <img
              src={user?.picture}
              alt={user?.name}
              className="w-20 h-20 rounded-full dark:bg-gray-500"
            />

            <blockquote className="max-w-lg text-lg italic font-medium text-center">
              "Dear {user?.name}, "You application accepted and your application
              tracking no: {applicantInfo?.track_id}""
            </blockquote>

            <div className="text-center dark:text-gray-400">
              <p>Good Luck</p>
              <p>Wish you all the best.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmMsg;
