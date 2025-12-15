import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CornerUpLeft, X } from "lucide-react";
import { trpc } from "@/utils/trpc";

// Interface for individual file props
interface FileAttachment {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

// Main component props interface
interface AdvancedChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
  textareaProps?: React.ComponentProps<"textarea">;
  sendButtonProps?: React.ComponentProps<typeof Button>;
  files?: FileAttachment[];
  onFileRemove?: (id: string | number) => void;
  onSend?: () => void;
  actionIcons?: React.ReactNode[];
}

const AdvancedChatInput = React.forwardRef<HTMLDivElement, AdvancedChatInputProps>(
  (
    {
      className,
      textareaProps,
      sendButtonProps,
      files = [],
      onFileRemove,
      onSend,
      actionIcons = [],
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isControlled = textareaProps?.value !== undefined;
    const [inputValue, setInputValue] = React.useState(
      isControlled ? textareaProps.value?.toString() || "" : ""
    );
    const { mutate: coderAgent } = trpc.ai.coderAgent.useMutation();
    
    // Get current value from either controlled or uncontrolled source
    const currentValue = isControlled 
      ? (textareaProps?.value?.toString() || "") 
      : inputValue;
    
    const hasValue = currentValue.trim().length > 0;
    const hasFiles = files.length > 0;

    const handleSend = () => {
      if (hasValue || hasFiles) {
        const textToSend = currentValue.trim();
        if (textToSend) {
          coderAgent({ text: textToSend });
        }
        onSend?.();
        // Clear the input after sending (only if uncontrolled)
        if (!isControlled) {
          setInputValue("");
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
        }
      }
    };

    // Auto-resize textarea height
    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
      }
    }, [currentValue]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col rounded-xl border bg-card p-2 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Attached Files Section */}
        <AnimatePresence>
          {hasFiles && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 flex flex-wrap gap-2"
            >
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-sm"
                >
                  {file.icon}
                  <span>{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onFileRemove?.(file.id)}
                    aria-label={`Remove file ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Area */}
        <div className="relative flex w-full items-end">
          <Textarea
            ref={textareaRef}
            rows={1}
            {...textareaProps}
            value={isControlled ? textareaProps.value : inputValue}
            onChange={(e) => {
              if (!isControlled) {
                setInputValue(e.target.value);
              }
              textareaProps?.onChange?.(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
              textareaProps?.onKeyDown?.(e);
            }}
            className={cn(
              "min-h-[40px] w-full resize-none border-none bg-transparent pr-20 shadow-none focus-visible:ring-0",
              textareaProps?.className
            )}
          />
        </div>

        {/* Actions and Send Button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {actionIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </div>

          <motion.div
            key={hasValue || hasFiles ? "active" : "inactive"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="icon"
              disabled={!hasValue && !hasFiles}
              onClick={handleSend}
              {...sendButtonProps}
              className={cn("rounded-full", sendButtonProps?.className)}
            >
              <CornerUpLeft className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }
);

AdvancedChatInput.displayName = "AdvancedChatInput";

export { AdvancedChatInput, type FileAttachment };