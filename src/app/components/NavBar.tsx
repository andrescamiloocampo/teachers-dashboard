import { type ReactElement } from "react";
import { urls } from "../datasources/urls";
import Link from "next/link";

export const NavBar = async(): Promise<ReactElement> => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href={'/dashboard'}>
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {urls.map((url)=>(
                <Link className="nav-link active" aria-current="page" href={url.to} key={url.to}>{url.name}</Link>
            ))}                        
          </div>
        </div>
      </div>
    </nav>
  );
};
