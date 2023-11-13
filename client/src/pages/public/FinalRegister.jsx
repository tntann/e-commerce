import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../utils/path";
import Swal from "sweetalert2";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops!", "Registration Failed", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire("Congratulation", "Successful Registration", "success").then(
        () => {
          navigate(`/${path.LOGIN}`);
        }
      );
  }, []);
  return <div className="h-screen w-screen bg-slate-100"></div>;
};

export default FinalRegister;
