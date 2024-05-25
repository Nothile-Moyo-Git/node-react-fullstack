/**
 * Date created : 10/02/2024
 * Author : Nothile Moyo
 */

import { FC, useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import LoadingSpinner from './components/loader/LoadingSpinner';
import logo from './logo.svg';
import './App.scss';
import { User } from './@types';

const App : FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  // Get the method from the backend to query
  const appContextInstance = useContext(AppContext);

  // Get user details if the user is authenticated from the backend
  const getUserDetails = async (userId : string) => {

    // We assign Formdata here so we can use this with cors in the backend
    const fields = new FormData();
    fields.append("userId", userId);

    const result = await fetch(`http://localhost:4000/user/${userId}`, {
      method : "POST",
      body : fields
    });

    const data = await result.json();

    console.clear();
    console.log("Result");
    console.log(result);
    console.log("\n");

    console.log("Data");
    console.log(data);
  };

  // Query the backend to see if we're logged in
  useEffect(() => {

    const fetchAuthentication = async () => {

      try {

        appContextInstance?.validateAuthentication();
        (appContextInstance?.userAuthenticated === true && appContextInstance.userId) && getUserDetails(appContextInstance.userId);

      }catch(error){

        console.log("Request failed");
        console.log(error);
      }

      // We have a response so we're not loading data anymore
      setIsLoading(false);
    };

    fetchAuthentication();

  },[appContextInstance]);

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

          <p>{`Is user authenticated : ${appContextInstance?.userAuthenticated}`}</p>
        </header>
      }

    </div>
  );
}

export default App;
