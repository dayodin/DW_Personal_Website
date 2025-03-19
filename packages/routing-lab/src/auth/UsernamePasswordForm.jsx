import { useState } from "react";

export const UsernamePasswordForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setResult({
                type: "error",
                message: "Please fill in your username and password.",
            });
            return;
        }

        setIsPending(true);
      
        const submitResult = await props.onSubmit({ username, password });
        if (submitResult) {
            setResult({
                type: "error",
                message: submitResult,
            });
        } else {
            setResult({
                type: "success",
                message: "Login/Registration successful!",
            });
            
            setUsername("");
            setPassword("");
        }
        setIsPending(false);
    };

  return (
    <>
      {result && <p className={`message ${result.type}`}>{result.message}</p>}
      {isPending && <p className="message loading">Loading ...</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            disabled={isPending}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UsernamePasswordForm;
