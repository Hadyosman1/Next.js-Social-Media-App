import { RiCloseLargeFill } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  bg?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  className,
  bg = "transparent",
  size = "md",
  children,
}: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`${isOpen ? "visible translate-x-0 opacity-100" : "invisible -translate-x-[110%] opacity-0"} fixed inset-0 z-[1000] flex max-h-screen items-center justify-center overflow-y-auto bg-gray-700 bg-opacity-50 p-3 backdrop-blur-sm transition-all delay-75 duration-500`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-${bg} ${size === "sm" ? "max-w-xs" : size === "md" ? "md:max-w-xl" : "md:max-w-2xl"} flex max-h-[90%] flex-grow flex-col rounded`}
      >
        <div
          className={`${title && "border-b-2 border-slate-300"} ${bg !== "transparent" && "px-2"} flex items-center py-2`}
        >
          {title && (
            <h2 className="flex-grow text-center text-lg font-semibold text-slate-700">
              {title}
            </h2>
          )}

          <button
            title="close"
            className={`${bg === "transparent" ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} ms-auto rounded p-1 text-xl`}
            onClick={onClose}
          >
            <RiCloseLargeFill />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
