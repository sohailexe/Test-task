import AuthLayout from "@/modules/auth/layouts/auth-layout";
import LoginForm from "@/modules/auth/components/login-form";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
