import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Checkbox } from './checkbox';

interface ExampleFormValues {
  name: string;
  role: string;
  agree: boolean;
}

export const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormValues>({ defaultValues: { name: '', role: 'user', agree: false } });
  const onSubmit: SubmitHandler<ExampleFormValues> = (data) => {
    // noop for demo
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-white">
      <div>
        <label className="mb-1 block text-sm">Name</label>
        <Input
          {...register('name', { required: true })}
          placeholder="Jane Doe"
          aria-invalid={!!errors.name}
        />
        {errors.name && <div className="mt-1 text-xs text-red-400">Name is required</div>}
      </div>
      <div>
        <label className="mb-1 block text-sm">Role</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <label htmlFor="agree" className="text-sm">
          I agree to terms
        </label>
      </div>
      <button
        type="submit"
        className="rounded-md border border-cosmic-border px-3 py-2 text-sm hover:bg-white/10"
      >
        Submit
      </button>
    </form>
  );
};

FormWithReactHookForm.displayName = 'FormWithReactHookForm';
