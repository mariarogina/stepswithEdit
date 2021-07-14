import { useState } from "react";

const InitialForm = {
   
    date: new Date(),
    km: "",
  }

const Form = ({onAddRow}) => {
  const [form, setForm] = useState(InitialForm);
  //console.log(form);

  const onFormSubmit = (e) => {
    e.preventDefault();
    onAddRow(form);
    setForm(InitialForm);
    
  };

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{margin:"20px auto", }} >
    <div >
  
    <form onSubmit={onFormSubmit} className = "container">
      <div className="form row" style={{display:'flex', flexDirection:"row"}} >
        <div className="col">
          <label>Дата </label>
          <input
            type="date"
            data-date="" 
            data-date-format="DD MMMM YYYY"
            value={form.date}
            id="date"
            name="date"
            onChange={onFieldChange}
            required
            style={{borderRadius:"6px"}}
          />
        </div>
        <div className="col">
          <label>Пройдено км </label>
          <input 
          value={form.km} 
          id="km" 
          name="km" 
          onChange={onFieldChange} 
          required
          style={{borderRadius:"6px"}}

          />
        </div>
        <div className="col">
        <button className="btn btn-secondary" style={{marginTop:'20px'}}>OK</button>
        </div>
      </div>
    </form>
    </div>
    </div>
  );
};

export default Form;
