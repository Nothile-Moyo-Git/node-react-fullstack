/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import LoadingSpinner from './components/loader/LoadingSpinner';
import logo from './logo.svg';
import './App.scss';

const App : FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get the method from the backend to query
  const appContextInstance = useContext(AppContext);

  // Query the backend to see if we're logged in
  useEffect(() => {

    const fetchAuthentication = async () => {

      try {

        appContextInstance?.startApp();

      }catch(error){

        console.log("Request failed");
        console.log(error);
      }

      // We have a response so we're not loading data anymore
      setIsLoading(false);
    };

    fetchAuthentication();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">

      {
        isLoading && 
        <LoadingSpinner/>
      }

      {
        !isLoading &&
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
      }

    </div>
  );
}

export default App;
