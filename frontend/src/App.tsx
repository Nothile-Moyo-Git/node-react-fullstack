/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect, useContext } from 'react';
import { AppContext } from './context/appContext';
import logo from './logo.svg';
import './App.scss';

const App : FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Get the method from the backend to query
  const appContextInstance = useContext(AppContext);

  // Query the backend to see if we're logged in
  useEffect(() => {

    const fetchAuthentication = async () => {

      try {

        // Query the backend to see if we're authenticated
        const response = await fetch("http://localhost:4000/test",{
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          },
          body : null
        });

        // Get the JSON from the request
        const data = await response.json();

        // Set our authentication state
        if (data.isAuthenticated) {
          setIsAuthenticated(data.isAuthenticated);
        }

        console.clear();
        console.log("Response");
        console.log(response);

        console.log("\n\n");

        console.log(appContextInstance?.startApp());

      }catch(error){

        console.log("Request failed");
        console.log(error);
      }



      // We have a response so we're not loading data anymore
      setIsLoading(false);
    };

    fetchAuthentication();

  },[isAuthenticated]);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
