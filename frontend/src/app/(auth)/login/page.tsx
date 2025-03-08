import { LoginForm } from "@/components/auth";

const Login = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-10">
      <h2 className="mb-4 text-2xl">User Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
