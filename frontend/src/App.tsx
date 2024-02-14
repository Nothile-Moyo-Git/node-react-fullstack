/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

const App : FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Query the backend to see if we're logged in
  useEffect(() => {

    const fetchAuthentication = async () => {

      // Query the backend to see if we're authenticated
      const response = await fetch("http://localhost:4000/test",{
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
        body : null
      });

      console.clear();
      console.log("Response");
      console.log("\n");
      console.log(response);
    };


    fetchAuthentication();


  },[isAuthenticated]);

  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </main>
  );
}

export default App;
