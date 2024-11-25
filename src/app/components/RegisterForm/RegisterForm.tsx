'use client';
import type { ReactElement } from "react";
import { createTeacher, type TeacherM } from "@/app/server/teachers/createTeacher";
import { v4 as uuid } from "uuid";

export const Register = (): ReactElement => {

    const requestAuthentication = async (): Promise<boolean> => {
        if (!window.PublicKeyCredential) {
            alert("Your browser does not support WebAuthn.");
            return false;
        }

        try {
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: Uint8Array.from("random-string", c => c.charCodeAt(0)), 
                    allowCredentials: [],
                    timeout: 60000,
                    userVerification: "preferred",
                },
            });
            console.log("Authenticated:", credential);
            return true;
        } catch (err) {
            console.error("Authentication failed:", err);
            alert("Authentication failed. Please try again.");
            return false;
        }
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
     
      const form = e.currentTarget as HTMLFormElement;
      if (!form) {
          console.error("El evento no está asociado a un formulario válido.");
          return;
      }
  
      
      const isAuthenticated = await requestAuthentication();
      if (!isAuthenticated) return;
  
      
      const formData = new FormData(form);
      const data: TeacherM = Object.fromEntries(formData);
      console.log("Form data:", data);
  
      const { k, ...rest } = data;
      const response = await createTeacher({
          ...rest,
          id: uuid(),
          schedules: [],
      });
      console.log("Teacher created:" , response);
  };    


    return (
        <div>
            <div className="row mb-4">
                <div className="col-lg-8 mx-auto text-center">
                    <h1 className="display-6">Teachers Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card ">
                        <div className="card-header">
                            <div className="tab-content">
                                <div id="credit-card" className="tab-pane fade show active pt-3">
                                    <form onSubmit={handleForm}>
                                        <div className="form-group">
                                            <label htmlFor="nit">
                                                <h6>ID Number</h6>
                                            </label>
                                            <input
                                                type="text"
                                                name="nit"
                                                placeholder="Ingrese identificación"
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                <h6>Name</h6>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Ingrese nombre"
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">
                                                <h6>Last Name</h6>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Ingrese apellido"
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="area">
                                                <h6>Area</h6>
                                            </label>
                                            <input
                                                type="text"
                                                name="area"
                                                placeholder="Ingrese área"
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="subscribe btn btn-dark btn-block shadow-sm mt-4 w-100"
                                        >
                                            Registrarse
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
