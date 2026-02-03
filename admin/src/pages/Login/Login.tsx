import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin } from "../../services/admin/admin";
import { LogIn, Mail, Lock, ShieldCheck } from "lucide-react";

// The generated 4k food image from props/artifact
const BG_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop";

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
            console.log("Attempting login at:", import.meta.env.VITE_API_BASE_URL);
            const response = await loginAdmin(loginData);
            console.log("Login Response:", response);

            if (response.success) {
                const isAdmin = response.data.isAdmin ?? response.data.user?.isAdmin;

                if (!isAdmin) {
                    toast.error(`Unauthorized: Admin access only`);
                    setLoading(false);
                    return;
                }
                localStorage.setItem("token", response.data.token);
                toast.success("Welcome back, Commander! 🍅");
                navigate("/");
            } else {
                toast.error(response.message || "Login failed");
                setLoading(false);
            }
        } catch (error: any) {
            console.error("Login Error Details:", error);
            const errorMessage = error.response?.data?.message || error.message || "Connection Error";
            toast.error(`Login Error: ${errorMessage}`);
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${BG_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px",
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "450px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                padding: "50px 40px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                textAlign: "center"
            }}>
                <div style={{
                    backgroundColor: "#e53935",
                    width: "70px",
                    height: "70px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: "0 10px 20px rgba(229, 57, 53, 0.3)"
                }}>
                    <ShieldCheck color="#fff" size={35} />
                </div>

                <h1 style={{
                    fontSize: "32px",
                    fontWeight: "900",
                    color: "#1a1a1a",
                    marginBottom: "8px",
                    letterSpacing: "-1px"
                }}>Tomato Admin</h1>

                <p style={{
                    color: "#666",
                    marginBottom: "40px",
                    fontSize: "16px"
                }}>Management Console</p>

                <form onSubmit={onLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ position: "relative" }}>
                        <Mail style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#999" }} size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Admin Email"
                            value={data.email}
                            onChange={onChangeHandler}
                            required
                            style={{
                                width: "100%",
                                padding: "16px 16px 16px 50px",
                                borderRadius: "14px",
                                border: "1px solid #e0e0e0",
                                outline: "none",
                                fontSize: "15px",
                                transition: "all 0.3s ease",
                                backgroundColor: "#f9f9f9"
                            }}
                        />
                    </div>

                    <div style={{ position: "relative" }}>
                        <Lock style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#999" }} size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={onChangeHandler}
                            required
                            style={{
                                width: "100%",
                                padding: "16px 16px 16px 50px",
                                borderRadius: "14px",
                                border: "1px solid #e0e0e0",
                                outline: "none",
                                fontSize: "15px",
                                transition: "all 0.3s ease",
                                backgroundColor: "#f9f9f9"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "16px",
                            borderRadius: "14px",
                            border: "none",
                            background: "linear-gradient(135deg, #e53935 0%, #c62828 100%)",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            boxShadow: "0 10px 20px rgba(229, 57, 53, 0.2)",
                            marginTop: "10px",
                            transition: "transform 0.2s"
                        }}
                    >
                        {loading ? "Verifying..." : (<><LogIn size={20} /> Secure Login</>)}
                    </button>
                </form>

                <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
                    <p style={{ color: "#aaa", fontSize: "13px" }}>Authorized Personnel Only</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
