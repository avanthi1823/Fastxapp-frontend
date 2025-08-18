import { useState } from "react";
import './Login.css';
import { loginAPICall } from '../../services/login.service';
import { LoginModel } from '../../models/login.model';
import { LoginErrorModel } from '../../models/loginerror.model';


const Login = () => {
    const [user, setUser] = useState(new LoginModel());
    const [errors, setErrors] = useState(new LoginErrorModel());
    

    const changeUser = (eventArgs) => {
        const fieldName = eventArgs.target.name;
        switch (fieldName) {
            case "email":
                if (eventArgs.target.value === "")
                    setErrors(e => ({ ...e, email: "Email cannot be empty" }));
                else {
                    setUser(u => ({ ...u, email: eventArgs.target.value }));
                    setErrors(e => ({ ...e, email: "" }));
                }
                break;
            case "password":
                setUser(u => ({ ...u, password: eventArgs.target.value }));
                break;
            default:
                break;
        }
    };

    const login = () => {
        if (errors.email.length > 0 || errors.password.length > 0)
            return;

        loginAPICall(user)
            .then(result => {
                console.log(result.data);
                sessionStorage.setItem("token", result.data.token);
                sessionStorage.setItem("email", result.data.email);
                alert("Login success");
                //navigate('/emp'); // ✅ make sure you have a route for /emp
            })
            .catch(err => {
                console.log(err);
                if (err.response?.status === 401)
                    alert(err.response.data.errorMessage);
            });
    };

    const cancel = () => {
        setUser(new LoginModel());
        setErrors(new LoginErrorModel());
    };

    return (
        <section className="loginDiv">
            <h1>Login!!</h1>

            <label className="form-control">Email</label>
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={changeUser}
                className="form-control"
            />
            {errors.email?.length > 0 && (
                <span className="alert alert-danger">{errors.email}</span>
            )}

            <label className="form-control">Password</label>
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={changeUser}
                className="form-control"
            />

            <button className="button btn btn-success" onClick={login}>Login</button>
            <button className="button btn btn-danger" onClick={cancel}>Cancel</button>
        </section>
    );
};

export default Login;
