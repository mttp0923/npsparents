import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import axiosInstance, { axiosHttpRequest, BASE_URL } from "../api/axios";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import DisplayStudDetails from "../components/Students/DisplayStudDetails";
import { useEffect, useState } from "react";
import DisplayStudAssessment from "../components/Students/DisplayStudAssessment";

import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { auth, setAuth, persist, setPersist } = useAuth();

  const data = useLoaderData();
  const [open, setOpen] = useState(false);
  const [openAssess, setOpenAssess] = useState(false);
  const [studValue, setStudValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [homeAddValue, setHomeAddValue] = useState("");
  const [offEmail, setOffEmail] = useState("");
  const [father, setFather] = useState("");
  const [fa_telValue, setFa_telValue] = useState("");
  const [fa_emailValue, setFa_emailValue] = useState("");
  const [mother, setMother] = useState("");
  const [mo_telValue, setMo_telValue] = useState("");
  const [mo_emailValue, setMo_emailValue] = useState("");
  const [guardianValue, setGuardianValue] = useState("");
  const [guardianContactValue, setGuardianContactValue] = useState("");
  const [guardianRelationValue, setGuardianRelationValue] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [contact_addValue, setContact_addValue] = useState("");
  const [contact_noValue, setContact_noValue] = useState("");
  const [rem, setRem] = useState("");

  const [grade, setGrade] = useState("");
  const [gradeValue, setGradeValue] = useState("");

  const [enrolRem, setEnrolRem] = useState("");
  const [enrolBtn, setEnrolBtn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/npsParents/login";
  
  useEffect(() => {
    if (!auth?.session) {
      navigate(from, { replace: true });
    }
  }, [auth.session]);

  const openDialogBoxStudents = async (studID) => {
    setOpen(true);
    setOpenAssess(false);

    const rs = await axiosHttpRequest.post("/parents/", {
      task: "fetchStudDetails",
      studID: studID,
    });
    const studData = rs.data;

    setFullName(
      studData.familyName +
        ", " +
        studData.firstName +
        " " +
        studData.middleName
    );
    setStudValue(studData.studID);
    setHomeAddValue(studData.homeadd);
    setOffEmail(studData.offEmail);
    setFather(studData.father);
    setFa_telValue(studData.fa_tel);
    setFa_emailValue(studData.fa_email);
    setMother(studData.mother);
    setMo_telValue(studData.mo_tel);
    setMo_emailValue(studData.mo_email);
    setGuardianValue(studData.guardian);
    setGuardianContactValue(studData.guardianno);
    setGuardianRelationValue(studData.guardianRelation);
    setContactValue(studData.contact_person);
    setContact_addValue(studData.contact_add);
    setContact_noValue(studData.contact_no);
  };

  useEffect(() => {
//    setOpen(false);
    setStudValue("");
    setOffEmail("");
    setFather("");
    setFa_telValue("");
    setFa_emailValue("");
    setMother("");
    setMo_telValue("");
    setMo_emailValue("");
    setHomeAddValue("");
    setGuardianValue("");
    setGuardianContactValue("");
    setGuardianRelationValue("");
    setContactValue("");
    setContact_addValue("");
    setContact_noValue("");
    setRem("");
    setEnrolRem("");
  }, [open, openAssess]);

  const cancelEdit = () => {
    setOpen(false);
    setOpenAssess(false);
  };

  const saveEdit = async (studStud) => {
    const data = {
      task: "saveStudDetails",
      studID: studStud,
      homeAddValue: homeAddValue,
      fa_telValue: fa_telValue,
      fa_emailValue: fa_emailValue,
      mo_telValue: mo_telValue,
      mo_emailValue: mo_emailValue,
      guardianValue: guardianValue,
      guardianContactValue: guardianContactValue,
      guardianRelationValue: guardianRelationValue,
      contactValue: contactValue,
      contact_addValue: contact_addValue,
      contact_noValue: contact_noValue,
    };
    const rss = await axiosHttpRequest.post("/parents/", data);

    if (rss.data == "edited") {
      setRem("Saved.");
    }

    const time = setTimeout(() => {
      cancelEdit();
    }, 2000);
    return () => clearTimeout(time);
  };

  const openDialogBoxAssessment = (grade) => {
    setOpen(false);
    setOpenAssess(true);
    let gradeImg = "";
    switch (grade) {
      case "Grade I":
        gradeImg = "Grade1.png";
        break;
      case "Grade II":
        gradeImg = "Grade2.png";
        break;
      case "Grade III":
        gradeImg = "Grade3.png";
        break;
      case "Grade IV":
        gradeImg = "Grade4.png";
        break;
      case "Grade V":
        gradeImg = "Grade5.png";
        break;
      case "Grade VII":
        gradeImg = "Grade7.png";
        break;
      case "Grade VIII":
        gradeImg = "Grade7.png";
        break;
      case "Grade IX":
        gradeImg = "Grade9.png";
        break;
      case "Grade X":
        gradeImg = "Grade10.png";
        break;
      case "Grade XI":
        gradeImg = "Grade11.png";
        break;
      case "Grade XII":
        gradeImg = "Grade12.png";
        break;
      case "Kinder":
        gradeImg = "Kinder.png";
        break;
      case "Nursery":
        gradeImg = "Nursery.png";
        break;
      case "SPED":
        gradeImg = "Sped.png";
        break;
    }
    setGradeValue(BASE_URL + "/parents/assets/" + gradeImg);
    setGrade(grade);
  };

  const enrolEvent = async (e, studID) => {
    e.preventDefault();

    let con = confirm("Are you sure you want to enrol?");

    if (con) {
      const rrss = await axiosHttpRequest.post("/parents/", {
        task: "enrolSave",
        studID: studID,
      });

      setEnrolBtn(true)
      setStudValue(studID)
    }
  };

  return (
    <>
      <div className="py-4 mb-8">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          { Array.isArray(data)
        ? 
        data.map((stud) => (
            <div key={stud.ID} className="mt-6 px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    NAME:{" "}
                    {stud.familyName +
                      ", " +
                      stud.firstName +
                      " " +
                      stud.middleName}
                  </h1>

                  <p className="mt-0 text-sm text-gray-700">
                    Student ID: {stud.studID}
                  </p>
                </div>
                <button onClick={() => openDialogBoxStudents(stud.studID)} type="button"
                  className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  {" "}
                  View/Edit Profile
                </button>
              </div>

              <DisplayStudDetails
                open={open}
                setOpen={setOpen}
                fullName={fullName}
                homeAdd={(e) => setHomeAddValue(e.target.value)}
                homeAddValue={homeAddValue}
                offEmail={offEmail}
                father={father}
                fa_tel={(e) => setFa_telValue(e.target.value)}
                fa_telValue={fa_telValue}
                fa_email={(e) => setFa_emailValue(e.target.value)}
                fa_emailValue={fa_emailValue}
                mother={mother}
                mo_tel={(e) => setMo_telValue(e.target.value)}
                mo_telValue={mo_telValue}
                mo_email={(e) => setMo_emailValue(e.target.value)}
                mo_emailValue={mo_emailValue}
                guardian={(e) => setGuardianValue(e.target.value)}
                guardianValue={guardianValue}
                guardianContact={(e) => setGuardianContactValue(e.target.value)}
                guardianContactValue={guardianContactValue}
                guardianContactRelation={(e) => setGuardianContactValue(e.target.value) }
                guardianRelationValue={guardianRelationValue}
                guardianRelation={(e) => setGuardianRelationValue(e.target.value) }
                contactValue={contactValue}
                contact={(e) => setContactValue(e.target.value)}
                contact_addValue={contact_addValue}
                contact_add={(e) => setContact_addValue(e.target.value)}
                contact_noValue={contact_noValue}
                contact_no={(e) => setContact_noValue(e.target.value)}
                cancelEdit={cancelEdit}
                saveEdit={() => saveEdit(studValue)}
                rem={rem}
              />

              <DisplayStudAssessment
                openAssess={openAssess}
                setOpenAssess={setOpenAssess}
                gradeImg={gradeValue}
                grade={grade}
                cancelEdit={cancelEdit}
              />

              <div className="mt-0 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr key={stud.ID} >
                            <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6" >
                              SchoolYear
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" >
                              Grade
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" >
                              GenAve
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" >
                              Remark
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {stud.enrolDetails.map((enrol) => (
                            <tr key={enrol.ID} >
                              <td className="whitespace-nowrap py-2 pl-2 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {enrol.schoolyear}
                              </td>
                              <td className="whitespace-nowrap text-sm text-gray-500">
                                {enrol.gs}
                              </td>
                              <td className="whitespace-nowrap text-sm text-gray-500">
                                {enrol.gradeAve}
                              </td>
                              <td className="whitespace-nowrap text-sm text-gray-500">
                                {enrol.rem}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td
                              colSpan={3}
                              className="whitespace-wrap px-2 py-2 text-gray-800 text-m sm:pr-6"
                            >
                              {(() => {
                                if ( stud.enrol == 0 || stud.enrol == null) {
                                        if ( enrolBtn && studValue == stud.studID) {
                                          return (
                                            <p className="text-sm">
                                            Note: Please settle the Enrolment Fees at
                                            the Finance Office or you can directly pay
                                            at the school bank account. <b>
                                              Bank: CHINA BANK Account Number:
                                              262-0625-915
                                            </b>
                                            . <br />
                                            <i>
                                              After payment, send a copy of the
                                              deposit slip/transfer receipt to: <b>mars_2710@yahoo.com</b> 
                                              <br />with STUDENT'S NAME
                                              and GRADE LEVEL in the receipt. You will be noticed via email once payment is received.
                                            </i>
                                          </p>
                                          ) 
                                        }

                                    return (
                                    <>
                                      <h5 className="text-1xl font-bold leading-tight tracking-tight text-blue-600">
                                        Enrol {stud.firstName} this{" "}
                                        {stud.currentYear} for{" "}
                                        {stud.enrolNewGrade}?{" "}
                                      </h5>
                                      <div className="px-4 py-1 sm:grid-cols-3 sm:gap-4 sm:px-4">
                                        Process: 1.{" "}
                                        <button
                                          onClick={() =>
                                            openDialogBoxStudents(stud.studID)
                                          }
                                          type="button"
                                          className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                        >
                                          View/Edit Profile
                                        </button>{" "}
                                        2.{" "}
                                        <button
                                          onClick={() =>
                                            openDialogBoxAssessment(
                                              stud.enrolNewGrade
                                            )
                                          }
                                          type="button"
                                          className="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                        >
                                          View Assessment
                                        </button>{" "}
                                        3. Click ENROL
                                      </div>
                                    </>
                                  );
                                } else if ( stud.enrol == 1) {
                                  return (
                                    <p className="text-sm">
                                      Note: Please settle the Enrolment Fees at
                                      the Finance Office or you can directly pay
                                      at the school bank account.
                                      <b><br />
                                        Bank: CHINA BANK Account Number:
                                        262-0625-915 </b>. <br />
                                      <i>
                                        After payment, send a copy of the
                                        deposit slip/transfer receipt to: <b>mars_2710@yahoo.com</b> <br />with STUDENT'S NAME
                                        and GRADE LEVEL in the receipt. You will be noticed via email once payment is received.
                                      </i>
                                    </p>
                                  );
                                } else {
                                  return (
                                    <p>
                                      <i>
                                        Waiting for the Registrar to setup the
                                        Enrolment Details.
                                      </i>
                                    </p>
                                  );
                                }
                              
                              })()}
                            </td>
                            <td>
                              {(() => {
                                if ( stud.enrol == 0 || stud.enrol == null ) {
                                  if ( enrolBtn && studValue == stud.studID) {
                                    return (
                                      <>
                                        <div className="text-sm text-blue-600">
                                          Enrolment Status:
                                        </div>{" "}
                                        <div className="text-sm font-medium">Awaiting Confirmation</div>
                                      </>
                                    );
                                  }
                                  return (
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        enrolEvent(e, stud.studID)
                                      }
                                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      <CheckCircleIcon
                                        className="-ml-0.5 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                      ENROL
                                    </button>
                                  );
                                } else if (stud.enrol == 1) {
                                  return (
                                    <>
                                      <div className="text-sm text-blue-600">
                                        Enrolment Status:
                                      </div>{" "}
                                      <div className="text-sm font-medium">Awaiting Confirmation</div>
                                    </>
                                  );
                                } else {
                                  return (
                                    <>
                                      <div className="text-sm text-blue-600">
                                        Enrolment Status:
                                      </div>{" "}
                                      <div className="text-sm font-medium">OR# {stud.enrol} Received Payment</div>
                                    </>
                                  );
                                }
                              })()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) 
        : null }
        </main>
      </div>
    </>
  );
}

export async function loader() {
  const userID = localStorage.getItem("user");
  const res = await axiosInstance.post("/parents/", {
    task: "fetchEnrol",
    user: userID,
  });

  return res.data;
}