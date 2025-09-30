import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: FileList) => void;
}

export const FileUpload = ({
  className,
  accept,
  multiple,
  onFiles,
  children,
  ...props
}: FileUploadProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFiles?.(e.target.files);
    }
  };

  return (
    <div
      className={twMerge(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-cosmic-border p-6 text-white/80 hover:bg-white/5',
        className,
      )}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      {...props}
    >
      {children ?? <span>Click to select files</span>}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />
    </div>
  );
};

FileUpload.displayName = 'FileUpload';

