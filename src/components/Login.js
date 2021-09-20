import { Button, FormControl, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../service/customService";


import "../index.scss";

export default function Login() {
    const [name, setname] = useState("");
    const [id, setId] = useState("");
    let history = useHistory();


    function validateForm() {
        return name.length > 0 && id.length > 0;
    }

    function handleSubmit(event) {
        getToken(name).then(respons => {
            sessionStorage.setItem("react-token", respons.data.token.token);
            sessionStorage.setItem("currentUser", respons.data.token.name);
            sessionStorage.setItem("currentUserImage", respons.data.image);

            history.push('/dashboard')
        })
        event.preventDefault();
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div className="LoginForm">
                    <form onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <FormControl className="form-control">
                            <TextField id="outlined-basic" placeholder="Id" value={id}
                                onChange={(e) => setId(e.target.value)} />

                            <TextField id="outlined-basic" placeholder="Name" value={name}
                                onChange={(e) => setname(e.target.value)} />

                            <Button type="submit" variant="contained" className="btn-block" disabled={!validateForm()} color="primary">Login</Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
}