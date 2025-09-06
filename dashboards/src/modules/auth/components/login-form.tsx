// src/components/auth/LoginForm.tsx
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router'; // Correct import
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth, useAuthActions } from '@/store/authStore'; // Corrected path

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className, ...props }: LoginFormProps) {
  // 1. Use controlled state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, error, clearError, login } = useAuthActions(); // Get clearError
  const authState = useAuth(); // Get state separately
  const navigate = useNavigate();

  // 2. Handle form submission using the component's state
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError(); // Clear any previous errors before a new attempt

    try {
      await login({ email, password, role: "admin" }); // No type assertion needed
      navigate("/admin", { replace: true });
    } catch (err) {
      // The error is already set in the store, but you can log it here if needed
      console.error('Login failed in component:', err);
    }
  };

  return (
    <Card className={cn('shadow-lg', className)} {...props}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Admin Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
        {/* Use the error from the auth state */}
        {authState.error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm'>
            {authState.error.message}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='name@example.com'
              autoComplete='email'
              required
              value={email} // 3. Bind value to state
              onChange={(e) => setEmail(e.target.value)} // 4. Update state on change
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                required
                value={password} // 3. Bind value to state
                onChange={(e) => setPassword(e.target.value)} // 4. Update state on change
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 top-0 h-full w-10 text-muted-foreground'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon className='h-4 w-4' /> : <EyeIcon className='h-4 w-4' />}
              </Button>
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={authState.isLoading}>
            {authState.isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center border-t pt-4'>
        <p className='text-sm text-muted-foreground'>
          Don't have an account?{' '}
          <Link to={'/register'} className='font-medium text-primary hover:underline'>
            Create account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}