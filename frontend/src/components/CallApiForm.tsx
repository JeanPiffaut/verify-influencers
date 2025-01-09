import React, { useState, ChangeEvent, FormEvent } from "react";
import {connectFunctionsEmulator, httpsCallable} from "firebase/functions";
import { getFunctions } from "firebase/functions";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const functions = getFunctions();

if (import.meta.env.VITE_NODE_ENV === "development") {
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

const CallApiForm: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setResponse("");

        try {
            const apiFunction = httpsCallable<{ action: string; payload: { name: string } }, { message: string }>(functions, "api");
            const result = await apiFunction({ action: "start", payload: { name: input } });
            setResponse(result.data.message);
        } catch (err: any) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Call Firebase Function</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputText">Enter Text:</label>
                <input
                    type="text"
                    id="inputText"
                    value={input}
                    onChange={handleChange}
                    style={{
                        display: "block",
                        margin: "10px 0",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    disabled={loading}
                >
                    {loading ? "Calling..." : "Submit"}
                </button>
            </form>
            {response && (
                <div style={{ marginTop: "20px", color: "green" }}>
                    <strong>Response:</strong> {response}
                </div>
            )}
            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <strong>{error}</strong>
                </div>
            )}
        </div>
    );
};

export default CallApiForm;
