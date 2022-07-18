import React from "react";
import "./form.css";

const Form = props => {
    return(
        <div className="container col-md-4 col-md-offset-4">
            <fieldset className="scheduler-border">
                <legend className="scheduler-border">Application meteo</legend>
                <form onSubmit={props.loadWeather}>
                <div className="row">
                    <div className="col-md-6 offset-md-2">
                        <input
                            type="text" 
                            className="form-control" 
                            name="capital" 
                            autoComplete="off" 
                            placeholder="Entrer le nom d'une ville"
                        />
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-danger">Envoyer</button>
                    </div>
                </div>
            </form>
            <div>{props.error ? error() : null}</div>
            </fieldset> 
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