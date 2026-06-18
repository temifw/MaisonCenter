import { useState, type FormEvent } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Invalid email or password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-md">
          <span className="font-label-caps text-[#776E20] mb-4 block text-center">WELCOME BACK</span>
          <h1 className="font-display-lg text-4xl text-stone-900 mb-10 text-center">Sign In</h1>
          {error && <p className="mb-6 text-center text-red-700 text-sm">{error}</p>}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Email address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full py-4 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors disabled:opacity-60" type="submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="mt-8 text-center text-stone-500 font-body-md">
            New to The Maison Center? <a className="text-[#776E20] underline" href="/sign-up">Create an account</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
