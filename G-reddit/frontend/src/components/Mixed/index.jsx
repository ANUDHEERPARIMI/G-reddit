import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const ToggleForm = () => {
    const [datalogin, setDatalogin] = useState({ email: "", password: "" });
	const [error, setErrorsignup] = useState("");
	const [errorlogin, setErrorlogin] = useState("");
	const handleChangelogin = ({ currentTarget: input }) => {
		setDatalogin({ ...datalogin, [input.name]: input.value });
	};

	const handleSubmitlogin = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/auth";
			const { data : res } = await axios.post(url, datalogin);
			localStorage.setItem("token", res.data);
			window.location = "/dashboard";
		} catch (errorlogin) {
			if (
				errorlogin.response &&
				errorlogin.response.status >= 400 &&
				errorlogin.response.status <= 500
			) {
				setErrorlogin(errorlogin.response.data.message);
			}
		}
	};
	const [datasignup, setDatasignup] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		username: "",
	});
	const navigate = useNavigate();

	const handleChangesignup = ({ currentTarget: input }) => {
		setDatasignup({ ...datasignup, [input.name]: input.value });
	};
	const handleSubmitsignup = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("token1")
			const url = "/api/users";
			const { data : res } = await axios.post(url, datasignup);
			console.log(res.message);
			window.location = "/"
			localStorage.removeItem("token1")
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setErrorsignup(error.response.data.message);
			}
			localStorage.setItem("token1","suii")
			 navigate("/")
			//window.location = "/"
		}
	};
    if(localStorage.getItem("token1"))
    {
    return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/">
						<button type="button" className={styles.green_btn} onClick={() => {localStorage.removeItem("token1")}}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmitsignup}>
						<h1 style={{color: "#3bb19b"}}>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChangesignup}
							value={datasignup.firstName}
							required
							className={styles.signUpInput}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChangesignup}
							value={datasignup.lastName}
							required
							className={styles.signUpInput}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChangesignup}
							value={datasignup.email}
							required
							className={styles.signUpInput}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChangesignup}
							value={datasignup.password}
							required
							className={styles.signUpInput}
						/>
						<input
							type="username"
							placeholder="Username"
							name="username"
							onChange={handleChangesignup}
							value={datasignup.username}
							required
							className={styles.signUpInput}
						/>
						<button type="submit" className={styles.white_btn} style={{marginTop: "15px"}}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
    }
    else
    {
    return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmitlogin}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChangelogin}
							value={datalogin.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChangelogin}
							value={datalogin.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1 style={{color: "#3bb19b"}}>New Here ?</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn} onClick={() => {localStorage.setItem("token1","suii")}}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
    }

}

export default ToggleForm;
