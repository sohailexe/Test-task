import AuthLayout from "@/modules/auth/layouts/auth-layout";
import RegistrationForm from "@/modules/auth/components/registration-form";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
};

export default RegisterPage;
