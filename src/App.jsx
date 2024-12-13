import { useState } from 'react';
import ChildComp from './ChildComp';

const App = () => {

  const [ListOfPeople, SetPersons ]= useState([])

  const getDataFromChild = (childValue) => {
    SetPersons([...ListOfPeople,childValue]);

  };



  return (
    <>
      <h1>Parent Component</h1>
      Data From Child: {ListOfPeople}
      <ChildComp callback={getDataFromChild} />

      
      <ul>
        {ListOfPeople.map((item, index) => (
          <li key={index}>
            {item.Name}, {item.Age}, {item.City}, {item.Is_adult ? 'Adult' : 'Not Adult'}
          </li>
        ))}
      </ul>



    </>
  );
};

export default App;
