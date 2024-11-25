"use client";

import { type ReactElement } from "react";
import type { ScheduleFormM } from "./ScheduleForm.model";
import { updateTeacher } from "@/app/server/teachers/updateTeacher";
import { Schedule } from "@/app/models/schedule.model";

export const ScheduleForm = ({ id }: ScheduleFormM): ReactElement => {
  const utcDate = new Date(Date.now());
  const today = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000);

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
    if (!form || form.nodeName !== "FORM") {
      console.error("El evento no está asociado a un formulario válido.");
      return;
    }

    
    const isAuthenticated = await requestAuthentication();
    if (!isAuthenticated) return;

   
    const formData = new FormData(form);
    const data: Schedule = Object.fromEntries(formData);
    const { k, out } = data;
    await updateTeacher({ in: today, out }, id);
    console.log("Schedule updated successfully");
  };

  return (
    <form onSubmit={handleForm}>
      <div className="form-group">
        <label htmlFor="out">Hora de salida</label>
        <input
          type="datetime-local"
          className="form-control"
          id="out"
          name="out"
          required
          placeholder="Ingrese hora de salida"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
