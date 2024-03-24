import React, { useEffect, useState } from "react";
import AuthAPI from "../../service/auth";
import localStorageManager from "../../utils/localStorageManager";
import { useNavigate } from "react-router";

const VerifyEmail = () => {
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    code: "",
  });

  useEffect(() => {
    let email = localStorageManager.getEmail();
    if (email) {
      setDetails({ ...details, email: email });
    }
    setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);

  const resendEmail = async () => {
    await AuthAPI.sendEmailToken({email: details.email})
    .then((res) => {
      console.log(res);
      setTimer(30);
      })
      .catch((err) => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthAPI.verifyEmailToken(details)
    .then(res=>{
      if(res.data?.statusCode === 200){
        navigate('/');
      }
    })
    .catch(err=>{

    })

  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" value={details.email} readOnly />
        <input type="number" value={details.code} onChange={(e)=>setDetails({...details, code: e.target.value})} />
        <button type="button" disabled={timer !== 0} onClick={resendEmail}>
          resend email {timer}
        </button>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default VerifyEmail;
