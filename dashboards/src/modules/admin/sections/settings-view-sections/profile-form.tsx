import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .max(50, {
      message: 'First name must not exceed 50 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Last name must not exceed 50 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 digits.',
    })
    .max(15, {
      message: 'Phone number must not exceed 15 digits.',
    })
    .regex(/^[+]?[1-9][\d]{0,15}$/, {
      message: 'Please enter a valid phone number.',
    }),
  address: z
    .string()
    .min(10, {
      message: 'Address must be at least 10 characters.',
    })
    .max(500, {
      message: 'Address must not exceed 500 characters.',
    }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted:', data);
    alert(
      `Form submitted successfully!\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nAddress: ${data.address}`,
    );
    // Reset form after successful submission
    form.reset();
  }

  return (
    <div className='max-w-2xl mx-auto p-6 '>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold '>Contact Information</h1>
        <p className=' mt-2'>Please fill out your contact details below.</p>
      </div>

      <Form {...form}>
        <div className='space-y-6'>
          {/* Name Fields Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='John'
                      {...field}
                      className='transition-colors focus:border-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Doe'
                      {...field}
                      className='transition-colors focus:border-blue-500'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Fields Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='john.doe@example.com'
                      {...field}
                      className='transition-colors focus:border-blue-500'
                    />
                  </FormControl>
                  <FormDescription>We'll never share your email with anyone else.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                      {...field}
                      className='transition-colors focus:border-blue-500'
                    />
                  </FormControl>
                  <FormDescription>Include country code for international numbers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address Field */}
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='123 Main Street&#10;Apartment 4B&#10;New York, NY 10001&#10;United States'
                    className='min-h-[120px] resize-none transition-colors focus:border-blue-500'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please include your full address including city, state/province, and postal code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className='flex justify-end pt-4'>
            <Button
              type='submit'
              className='min-w-[120px] bg-blue-600 hover:bg-blue-700 transition-colors'
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
