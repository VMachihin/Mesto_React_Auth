import React from 'react';

// кастомный хук для контроля любого количества инпутов в любых формах от Gennadiy Barsegyan
function UseForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export default UseForm;
