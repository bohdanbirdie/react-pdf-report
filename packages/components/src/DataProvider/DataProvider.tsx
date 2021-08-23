import React, { useContext } from 'react';

export interface Data {
  readonly firstName?: string;
  readonly firstNameTitle?: string;
  readonly lastName?: string;
  readonly lastNameTitle?: string;
  readonly age?: number;
  readonly ageTitle?: string;
}

const dataContext = React.createContext<{
  data: Data;
}>({
  data: {}
});


const useDataContext = () => useContext(dataContext);
export const useDataValue = <T extends keyof Data>(
  accessor?: T
): Data[T] => {
  const { data } = useDataContext();

  if (!accessor) {
    return;
  }

  return data[accessor];
};

export const DataProvider: React.FC<{
  data: Data;
}> = ({ children, data }) => {
  return <dataContext.Provider value={{ data }}>{children}</dataContext.Provider>;
};


