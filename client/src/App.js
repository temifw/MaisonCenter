import React, { useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  async function signUp() {
    setError("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);

    setSession(data.session ?? null);
    console.log("SIGNUP RESPONSE:", data);
    console.log("ACCESS TOKEN:", data.session?.access_token);
    alert("Signed up. Check console for access token (may be null if email confirmation is enabled).");
  }

  async function signIn() {
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);

    setSession(data.session ?? null);
    console.log("SIGNIN RESPONSE:", data);
    console.log("ACCESS TOKEN:", data.session?.access_token);
    alert("Signed in. Check console for access token.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function callMyBookings() {
    setError("");
    const token = session?.access_token;
    if (!token) return setError("No access token. Sign in first.");

    const base = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    const resp = await fetch(`${base}/api/customer/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const json = await resp.json();
    console.log("MY BOOKINGS RESPONSE:", json);
    alert("Check console for /api/customer/bookings response");
  }

  return (
    <div className="App" style={{ maxWidth: 520, margin: "40px auto", textAlign: "left" }}>
      <h1>Maison Center</h1>

      <h2>Customer Login (debug)</h2>

      <label>Email</label>
      <input
        style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="customer@email.com"
      />

      <label>Password</label>
      <input
        style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={signUp}>Sign up</button>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signOut}>Sign out</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={callMyBookings}>Call GET /api/customer/bookings</button>
      </div>

      {session?.user && (
        <pre style={{ background: "#f5f5f5", padding: 12 }}>
          Logged in as: {session.user.email}
          {"\n"}User ID: {session.user.id}
        </pre>
      )}

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p>
        Access token prints in the browser console as <code>ACCESS TOKEN:</code>.
      </p>
    </div>
  );
}

export default App;
