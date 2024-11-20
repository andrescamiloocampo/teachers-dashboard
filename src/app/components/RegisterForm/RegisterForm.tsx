'use client'
import type { ReactElement } from "react";
import { createTeacher,type TeacherM } from "@/app/server/teachers/createTeacher";
import {v4 as uuid} from 'uuid';
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

export const Register = ():ReactElement => {

    const {isLoading, error, data, getData} = useVisitorData(
        {extendedResult: true},
        {immediate: true}
    )

    const handleForm = async(e:React.FormEvent<HTMLFormElement>) => {                
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data:TeacherM = Object.fromEntries(formData);
        console.log(data);
        const {k,...rest} = data;
        const response = await createTeacher({
            ...rest,
            id: uuid(),
            schedules: []
        })
        console.log(response);
    }

  return (
    <div>
        <button onClick={() => getData({ignoreCache: true})}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
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
                <div
                  id="credit-card"
                  className="tab-pane fade show active pt-3"
                >
                  <form onSubmit={handleForm}>
                    <div className="form-group">                      
                      <label htmlFor="nit">
                        <h6>ID Number</h6>
                      </label>
                      <input
                        type="text"
                        name="nit"
                        placeholder="Ingrese identificacion"
                        required
                        className="form-control "
                      />
                    </div>
                    <div className="form-group">                      
                      <label htmlFor="name">
                        <h6>Name</h6>
                      </label>
                      <div className="input-group">                
                        <input
                          type="text"
                          name="name"
                          placeholder="Ingrese nombre"
                          className="form-control "
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">                      
                      <label htmlFor="lastName">
                        <h6>Last Name</h6>
                      </label>
                      <div className="input-group">                        
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Ingrese apellido"
                          className="form-control "
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      {" "}
                      <label htmlFor="area">
                        <h6>Area</h6>
                      </label>
                      <div className="input-group">
                        {" "}
                        <input
                          type="text"
                          name="area"
                          placeholder="Ingrese area"
                          className="form-control "
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8"></div>
                    </div>
                    <button
                      type="submit"
                      className="subscribe btn btn-dark btn-block shadow-sm mt-4 w-100"
                    >
                      {" "}
                      Registrarse{" "}
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
}