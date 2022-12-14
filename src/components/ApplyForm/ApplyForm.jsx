import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import PopUpmodal from "../PopUpModal/PopUpmodal";

const ApplyForm = () => {
  const { user, isLoading } = useAuth0();

  const [skills, setSkills] = useState([]);
  const [sizeError, setSizeError] = useState(" ");
  const [FileTypeError, setFileTypeError] = useState(" ");
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [cvFile, setCvFile] = useState("");

  // handle preview
  const handlePreview = (e) => {
    const applicantInfo = {
      name: user.name,
      email: user.email,
      phone: phone,
      linkedinLink: linkedinUrl,
      skills,
      cvFile,
    };

    const formData = new FormData();

    Object.entries(applicantInfo).forEach((item) => {
      formData.append(item[0], item[1]);
    });

    fetch("http://localhost:5000/applicant", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          navigate("/confirmMsg");
        }
      })
      .catch((error) => console.log(error.message));
  };

  //  handle skills here
  const handldeSkills = (e) => {
    if (e.target.checked) {
      setSkills([...skills, e.target.value]);
    } else {
      setSkills(skills.filter((unchecked) => unchecked !== e.target.value));
    }
  };

  //  on file change here
  const onFileChange = (e) => {
    const fileType = ["application/pdf"];
    const selectedFile = e.target.files[0];
    // if (selectedFile.size / 1024 / 1024 > 2) {
    //   setSizeError("File size is more than 2MB");
    // }
    if (
      selectedFile.size / 1024 / 1024 < 2 &&
      selectedFile &&
      fileType.includes(selectedFile.type)
    ) {
      setCvFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setCv(e.target.result);
        setFileTypeError(" ");
        setSizeError(" ");
      };
    } else {
      setFileTypeError("Submit only pdf format file");
      setSizeError("File size is more than 2MB");
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {/* login component */}
      <Login></Login>

      <div className="px-4 md:px-0 md:w-[600px] mx-auto mt-20 mb-8">
        <div className="inner-div p-12 border rounded-3xl">
          <h2 className="text-xl text-red-400 font-semibold mb-5">
            Apply for postition
          </h2>

          <form className="">
            {/* applicant name */}
            <div className="name">
              <label htmlFor="" className="font-semibold mr-4">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                readOnly
                placeholder="Type your full name"
                className="input input-bordered w-[410px]  mb-5 md:ml-5 font-medium"
                required
              />
            </div>

            {/* applicant email */}
            <div className="email">
              <label htmlFor="" className="font-semibold mr-4">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Type a valid email"
                className="input input-bordered w-[410px]  mb-5 md:ml-6 font-medium"
                required
              />
            </div>

            {/* applicant phone */}
            <div className="phone">
              <label htmlFor="" className="font-semibold mr-4">
                Phone<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phonenumber"
                placeholder="Type a valid number e.g 019319013"
                className="input input-bordered w-[410px]  mb-5 md:ml-4"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* applicant linkedin Link */}
            <div className="linkedinLink">
              <label htmlFor="" className="font-semibold mr-4">
                Linkedin<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="linkedinLink"
                placeholder="Paste your linkedin profile"
                className="input input-bordered w-[410px]  mb-5"
                required
                onChange={(e) => setlinkedinUrl(e.target.value)}
              />
            </div>

            {/* applicant skills */}
            <div className="skills">
              <p className="font-semibold mb-3">
                {" "}
                Select Your Skills
                <span className="text-red-500 " required>
                  *
                </span>{" "}
                <span className="ml-5 text-sm">
                  ( You have to select a minimum of one skill to submit )
                </span>
              </p>
              <input
                type="checkbox"
                name="Php"
                value="Php"
                id=""
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label htmlFor="Php" className="font-medium" value="Php">
                PHP
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="Python"
                id=""
                value="Python"
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label htmlFor="Phython" className="font-medium" name="Python">
                Phython
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="SQL"
                id=""
                value="SQL"
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label
                htmlFor="SQL"
                className="font-medium"
                name="SQL"
                value="SQL"
              >
                SQL
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="CSS"
                id=""
                value="CSS"
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label
                htmlFor="CSS"
                className="font-medium"
                name="CSS"
                value="CSS"
              >
                CSS
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="HTML5"
                id=""
                value="HTML5"
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label
                htmlFor="HTML5"
                className="font-medium"
                name="HTML5"
                value="HTML5"
              >
                HTML5
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="JavaScript"
                id=""
                value="JavaScript"
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label
                htmlFor="JavaScript"
                className="font-medium"
                name="JavaScript"
                value="JavaScript"
              >
                JavaScript
              </label>{" "}
              <br />
              <input
                type="checkbox"
                name="React"
                value="React"
                id=""
                className="mr-2"
                onChange={(e) => handldeSkills(e)}
              />
              <label
                htmlFor="React"
                className="font-medium"
                name="React"
                value="React"
              >
                React
              </label>{" "}
              <br />
            </div>

            {/*  cv add section*/}
            <div className="cv-section mt-10 mb-4">
              <label htmlFor="" className="font-semibold mr-4">
                CV (pdf format)<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="cv"
                required
                className="border-b-2 border-r-4 "
                accept="application/pdf"
                onChange={onFileChange}
              />
              <p className=" mt-2 text-sm">
                (File size limit is{" "}
                <span className="text-red-500">
                  <sub>2</sub>MB
                </span>{" "}
                )
              </p>

              {/* if size error render this */}

              {sizeError && <p className="text-red-500 mt-4">{sizeError}</p>}

              {/* if filetype error render this */}
              {FileTypeError && (
                <p className="text-red-500 mt-4">{FileTypeError}</p>
              )}
            </div>

            {/*  preview and popUpmodal open btn */}
            <label
              htmlFor="submitPopUp"
              type="submit"
              className=" flex justify-center btn  w-96 mx-auto   border-none mt-12 p-3  rounded-md bg-red-500 text-white font-semibold"
            >
              Preview
            </label>

            <p className="text-center text-sm mt-3">
              All fields marked with an asterisk (*) are mandatory.
            </p>

            {/* popUpmodal component */}
            <PopUpmodal
              skills={skills}
              cv={cv}
              handlePreview={handlePreview}
            ></PopUpmodal>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyForm;
