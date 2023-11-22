import React from "react";
import "./form.css";

const Form = props => {
    return(
        <div className="form">
            <form onSubmit={props.loadWeather}>
                <div className="rows">
                        <input
                            type="text" 
                            className="form-control" 
                            name="capital" 
                            autoComplete="off"
                            placeholder="Enter City or Capital"
                        />
                    <div>
                        <button className="btn">Search</button>
                    </div>
                </div>
            </form>
            <div>{props.error ? error() : null}</div>
        </div>
    );

    function error(){
        return (
            <div className="alert alert-danger mx-5" role="alert">
                Entrer un capital
            </div>
        )
    }

};

export default Form;