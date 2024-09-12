"use client";

import { createPortal } from "react-dom";
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
  const Modal = (
    <div
      onClick={onClose}
      className={`${isOpen ? "show" : "hide"} modal_wrapper`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-${bg} ${size === "sm" ? "max-w-sm" : size === "md" ? "md:max-w-xl" : "md:max-w-2xl"} max-w-full flex max-h-[85%] flex-grow flex-col rounded`}
      >
        <div
          className={`${title && "border-b-2 border-slate-300"} ${bg !== "transparent" && "px-2"} flex items-center py-2`}
        >
          {title && (
            <h2 className="flex-grow text-center text-lg font-semibold capitalize text-slate-600">
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

        <div className="max-h-full  overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(Modal, document.body);
};

export default ModalWrapper;
