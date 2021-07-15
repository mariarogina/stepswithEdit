import { useState } from "react";

const InitialForm = {
  id:"",
    date: new Date(),
    km: undefined,
  }

const Form = ({onAddRow}) => {
  const [form, setForm] = useState(InitialForm);
  

  const onFormSubmit = (e) => {
    e.preventDefault();
    onAddRow(form);
    setForm(InitialForm);
    
  }

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{margin:"20px 20px", width: '500px' }} >
    <div >
  
    <form onSubmit={onFormSubmit} className = "container">
      <div className="form row" style={{display:'flex', flexDirection:"row"}} >
        <div className="col">
          <label>Дата (мм-дд-гггг) </label>
          <input
            type="date"
            data-date="" 
            data-date-format="DD MMMM YYYY"
            value={form.date}
            id="date"
            name="date"
            onChange={(e) => {
                  const { name, value } = e.target;
                  if (e.target.value.length > 10) {
                    setForm((prev) => ({ ...prev, [name]: "Error" }));
                  } else {
                    setForm((prev) => ({ ...prev, [name]: value }));
                  }
                }}
            required
            style={{borderRadius:"6px"}}
          />
        </div>
        <div className="col">
          <label>Пройдено км (число) </label>
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

Form.propTypes = {
  onAddRow: PropTypes.func,
};

Form.defaultProps = {
  onAddRow: () => {},
};


export default Form;
