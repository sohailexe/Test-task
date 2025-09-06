// src/components/auth/RegistrationForm.tsx
import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router'; // Correct import
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth, useAuthActions } from '@/store/authStore'; // Corrected path

type RegistrationFormProps = {
  className?: string;
};

export default function RegistrationForm({ className, ...props }: RegistrationFormProps) {
  // 1. Use controlled state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, clearError } = useAuthActions();
  const authState = useAuth();
  const navigate = useNavigate();

  // 2. Handle form submission using the component's state
  const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError(); // Clear previous errors

    try {
      await register({ name, email, password, role: "admin" });
      navigate('/admin', { replace: true }); // Navigate to admin dashboard on success
    } catch (err) {
      console.error('Registration failed in component:', err);
    }
  };

  return (
    <Card className={cn('shadow-lg', className)} {...props}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Create an Admin Account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
        {authState.error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm'>
            {authState.error.message}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegistration} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              id='name'
              type='text'
              placeholder='John Doe'
              autoComplete='name'
              required
              value={name} // 3. Bind value
              onChange={(e) => setName(e.target.value)} // 4. Update state
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='name@example.com'
              autoComplete='email'
              required
              value={email} // 3. Bind value
              onChange={(e) => setEmail(e.target.value)} // 4. Update state
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                required
                value={password} // 3. Bind value
                onChange={(e) => setPassword(e.target.value)} // 4. Update state
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
            {authState.isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center border-t pt-4'>
        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link to={'/login'} className='font-medium text-primary hover:underline'>
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}