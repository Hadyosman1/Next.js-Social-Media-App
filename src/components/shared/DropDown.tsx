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
  }, [isOpen]);

  return (
    <Element
      {...other}
      className={`drop_down ${isOpen ? "visible opacity-100" : "invisible opacity-0"} ${sizeClass} ${positionClass} ${className}`}
    >
      {children}
    </Element>
  );
};

DropDown.Header = ({
  className,
  children,
  href,
  onClick,
  as: Element = "p",
  ...other
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
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
      className={`drop_down_header ${className}`}
    >
      {children}
    </Element>
  );
};

DropDown.Item = ({
  className,
  children,
  as: Element = "p",
  href,
  onClick,
  ...other
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
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