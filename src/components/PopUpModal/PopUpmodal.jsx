import { useAuth0 } from "@auth0/auth0-react";
import { Worker } from "@react-pdf-viewer/core";
import React from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const PopUpmodal = ({ skills, cv, handlePreview }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
      </div>
    );
  }
  return (
    <>
      {user?.email && (
        <div>
          <input type="checkbox" id="submitPopUp" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box md:w-7/12 max-w-5xl ">
              <label
                htmlFor="submitPopUp"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>

              <div className="inner-div border-2 p-4 border-black mt-8">
                <div className="view-details-section">
                  <h2 className="text-red-500 font-medium text-center underline">
                    View Details
                  </h2>

                  <div className="infoAndSkill md:flex gap-5 justify-center my-4">
                    {/* applicant info */}
                    <div className="applicant-info border border-black  md:w-5/12 h-52">
                      {" "}
                      <div className="avatar-topBg bg-slate-200 h-24 border-b border-black relative">
                        {/* avatar */}
                        <div className="avatar flex justify-center absolute mt-6 ml-32 md:ml-24">
                          <div className="w-24 rounded-full ">
                            <img src={user?.picture} alt="user-profile" />
                          </div>
                        </div>
                      </div>
                      <div className="avatar-bottom-bg mt-8 text-center">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="font-semibold">
                          {user && "Software Engineer"}
                        </p>
                      </div>
                    </div>

                    {/* applicant skills */}
                    <div className="applicant-skills border  border-black md:w-5/12  px-4 py-4 h-52">
                      <div className="skills-header flex justify-between">
                        <p className="font-medium">Selected Skills</p>
                        {skills.length > 0 && (
                          <span className="w-6 h-6 rounded-full font-medium flex justify-center bg-red-300 ">
                            {skills.length}
                          </span>
                        )}
                      </div>
                      <div className="skills border border-black p-4 mt-2 overflow-y-scroll h-36">
                        {skills.map((skill, index) => (
                          <ul key={index} className="">
                            <li className="font-medium text-sm">
                              {" "}
                              {index + 1}. {skill}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* uploaded cv */}
                <div className="upload-cv-display">
                  <h2 className="text-red-500 font-medium text-center underline mb-16 mt-8">
                    Uploaded CV
                  </h2>

                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                    {cv && <Viewer fileUrl={cv} />}
                  </Worker>
                </div>

                {/* submit btn  */}
                <div className="modal-action text-center mt-0 pb-6">
                  <label
                    onClick={handlePreview}
                    htmlFor="submitPopUp"
                    className="btn flex justify-center   w-96 mx-auto   border-none mt-12 p-3  rounded-md bg-red-500 text-white font-semibold"
                  >
                    Submit
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpmodal;
