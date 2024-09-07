const ToolTipItem = ({
  children,
  position = "top-center",
}: {
  children: React.ReactNode;
  position?: "bottom-center" | "top-center";
}) => {
  const positionClass =
    position === "bottom-center"
      ? "tooltip_center_bottom"
      : "tooltip_center_top";

  return <span className={`tooltip ${positionClass}`}>{children}</span>;
};

export default ToolTipItem;
