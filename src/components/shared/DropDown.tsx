import { useEffect } from "react";

export const DropDown = ({
  className,
  children,
  position = "bottom-center",
  as: Element = "div",
  closeDropDown,
  isOpen,
  size = "md",
  ...other
}: {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  size?: "sm" | "md" | "lg";
  closeDropDown: () => void;
  as?: React.ElementType;
  position?: "bottom-left" | "bottom-center" | "bottom-right";
}) => {
  const positionClass =
    position === "bottom-right"
      ? "absolute_bottom_right"
      : position === "bottom-left"
        ? "absolute_bottom_left"
        : "absolute_bottom_center";

  const sizeClass =
    size === "sm"
      ? "drop_down_sm"
      : size === "md"
        ? "drop_down_md"
        : "drop_down_lg";

  useEffect(() => {
    const handleCloseDropMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.classList.contains("dropdown_item") &&
        !target.classList.contains("logout-btn") &&
        !target.classList.contains("drop_down") &&
        !target.classList.contains("drop_down_header")
      ) {
        closeDropDown();
      }
    };

    document.addEventListener("click", handleCloseDropMenu);

    return () => {
      document.removeEventListener("click", handleCloseDropMenu);
    };
  }, [closeDropDown, isOpen]);

  return (
    <Element
      {...other}
      className={`drop_down ${isOpen ? "visible opacity-100" : "invisible opacity-0"} ${sizeClass} ${positionClass} ${className}`}
    >
      {children}
    </Element>
  );
};

// eslint-disable-next-line react/display-name
DropDown.Header = ({
  children,
  href,
  onClick,
  as: Element = "p",
  ...other
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: Event) => void;
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <Element
      href={href}
      onClick={handleClick}
      {...other}
      className={`bg-white text-center font-bold text-slate-500`}
    >
      {children}
    </Element>
  );
};

// eslint-disable-next-line react/display-name
DropDown.Item = ({
  className,
  children,
  as: Element = "p",
  href,
  onClick,
  ...other
}: {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  as?: React.ElementType;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: Event) => void;
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <Element
      href={href}
      onClick={handleClick}
      {...other}
      className={`dropdown_item ${className}`}
    >
      {children}
    </Element>
  );
};
