import React, { useRef, useState } from 'react';
import { Icon } from "@iconify/react";

interface TWFileInputProps {
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TWFileInput: React.FC<TWFileInputProps> = ({
  accept,
  disabled = false,
  multiple = false,
  onChange = () => {},
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(
        multiple 
          ? `${e.target.files.length} files selected` 
          : e.target.files[0].name
      );
    }
    onChange(e);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (inputRef.current) {
        inputRef.current.files = e.dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      setFileName(
        multiple 
          ? `${e.dataTransfer.files.length} files selected` 
          : e.dataTransfer.files[0].name
      );
      
      // Create a synthetic event
      const syntheticEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="relative">
      <div
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors
          ${disabled 
            ? 'border-zinc-700 bg-zinc-800/30 cursor-not-allowed' 
            : dragActive
              ? 'border-green-500 bg-green-500/5'
              : 'border-zinc-700 bg-zinc-800/50 hover:border-green-500/50 hover:bg-zinc-800'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center gap-2 pointer-events-none">
          <div className={`p-3 rounded-full transition-colors
            ${disabled 
              ? 'bg-zinc-800/50 text-zinc-600'
              : dragActive
                ? 'bg-green-500/10 text-green-500'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            <Icon 
              icon={dragActive ? "heroicons:cloud-arrow-up" : "heroicons:photo"} 
              className="w-6 h-6"
            />
          </div>
          
          <div className="text-center">
            <p className={`text-sm font-medium mb-1 transition-colors
              ${disabled 
                ? 'text-zinc-600'
                : dragActive
                  ? 'text-green-500'
                  : 'text-zinc-300'
              }`}
            >
              {dragActive 
                ? 'Drop files here'
                : fileName || 'Click or drag files'
              }
            </p>
            <p className="text-xs text-zinc-500">
              {accept 
                ? `Accepts: ${accept.split(',').join(', ')}`
                : 'All file types supported'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mt-2 flex gap-2 items-center">
        <Icon icon="heroicons:information-circle" className="w-4 h-4 text-zinc-500" />
        <p className="text-xs text-zinc-500">
          {multiple 
            ? 'You can select multiple files'
            : 'Only one file can be uploaded at a time'
          }
        </p>
      </div>
    </div>
  );
};

export default TWFileInput;