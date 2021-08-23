import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./App.module.css";
import { DataProvider, RenderBlock, defaultTemplate, Data} from "@react-pdf/components"
import "@react-pdf/components/dist/index.css";

interface FormData {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState, watch } = useForm<FormData>();
  
  const data: Data = {
    firstName: watch('firstName'),
    firstNameTitle: 'First name: ',
    lastName: watch('lastName'),
    lastNameTitle: 'Last name: ',
    ageTitle: 'Age: ',
    age: watch('age')
  }

  const onSubmit = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/v1/pdf', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        data,
        schema: defaultTemplate
      })
    })
    .then(data => data.blob())
    .then(blob => {
      const file = window.URL.createObjectURL(blob);
      window.open(file, '_blank');
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    })
  };

  return (
    <div className={styles.App}>
      <div className={styles["form-container"]}>
        <h3>Input form</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <input
              {...register("firstName", { required: true, maxLength: 20 })}
              className={styles.input}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div>
            <input
              {...register("lastName", { pattern: /^[A-Za-z]+$/i, required: true })}
              className={styles.input}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div>
            <input
              type="number"
              {...register("age", { required: true })}
              className={styles.input}
            />
            <label htmlFor="age">Age</label>
          </div>

          <div>
            <input type="submit" className={styles.button} />
          </div>
          {loading && 'Loading...'}
          {Object.values(formState.errors).length ? 'Invalid form' : ''}
        </form>
      </div>
      <div>
        <h3>PDF Document preview</h3>
        <div className={styles["report-preview"]}>
          
          <DataProvider data={data}>
            <RenderBlock schema={defaultTemplate}/>
          </DataProvider>
        </div>
      </div>
    </div>
  );
}
