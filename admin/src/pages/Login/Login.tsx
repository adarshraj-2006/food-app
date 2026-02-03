import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin } from "../../services/admin/admin";

const TOMATO = "#e53935";

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "official.adarsh2006@gmail.com",
        password: "test1@1234",
    });

    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginData = {
                email: data.email.trim(),
                password: data.password.trim()
            };
            const response = await loginAdmin(loginData);
            console.log("Full Login Response:", response);

            if (response.success) {
                // Check in multiple possible locations for robustness
                const isAdmin = response.data.isAdmin ?? response.data.user?.isAdmin;

                if (!isAdmin) {
                    toast.error(`Unauthorized: Admin access only (isAdmin: ${isAdmin})`);
                    console.error("Access denied. isAdmin flag not found or false.", response.data);
                    return;
                }
                localStorage.setItem("token", response.data.token);
                toast.success("Welcome to Tomato 🍅");
                navigate("/");
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                background: "#fff5f5",
            }}
        >
            {/* LEFT BRAND SECTION */}
            <div
                style={{
                    flex: 1,
                    padding: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1 style={{ fontSize: "40px", color: TOMATO, marginBottom: "12px" }}>
                    Tomato 🍅
                </h1>
                <p style={{ fontSize: "18px", color: "#555", maxWidth: "420px" }}>
                    Powerful admin dashboard to manage users, orders, and food items.
                </p>
            </div>

            {/* LOGIN CARD */}
            <div
                style={{
                    width: "420px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "-10px 0 30px rgba(229,57,53,0.15)",
                }}
            >
                <form
                    onSubmit={onLogin}
                    style={{
                        width: "100%",
                        padding: "40px",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: TOMATO,
                            marginBottom: "8px",
                        }}
                    >
                        Sign In
                    </h2>

                    <p
                        style={{
                            textAlign: "center",
                            marginBottom: "30px",
                            color: "#777",
                        }}
                    >
                        Tomato Admin Panel
                    </p>

                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "16px",
                            borderRadius: "8px",
                            border: "1px solid #f3c2c2",
                        }}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "24px",
                            borderRadius: "8px",
                            border: "1px solid #f3c2c2",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "none",
                            background: TOMATO,
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                            fontSize: "14px",
                            color: "#999",
                        }}
                    >
                        © Tomato Admin
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
