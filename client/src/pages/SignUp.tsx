import { useState, type FormEvent } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const user = await register(email, password, fullName, phone);
      if (user) {
        window.location.href = '/';
      } else {
        // Email confirmation required before a session is issued.
        setNotice('Account created. Please check your email to confirm, then sign in.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not create your account.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-md">
          <span className="font-label-caps text-[#776E20] mb-4 block text-center">JOIN US</span>
          <h1 className="font-display-lg text-4xl text-stone-900 mb-10 text-center">Create Account</h1>
          {error && <p className="mb-6 text-center text-red-700 text-sm">{error}</p>}
          {notice && <p className="mb-6 text-center text-[#776E20] text-sm">{notice}</p>}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Full name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Email address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Phone (optional)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full py-4 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors disabled:opacity-60" type="submit" disabled={busy}>
              {busy ? 'Creating…' : 'Create Account'}
            </button>
          </form>
          <p className="mt-8 text-center text-stone-500 font-body-md">
            Already a member? <a className="text-[#776E20] underline" href="/sign-in">Sign in</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
