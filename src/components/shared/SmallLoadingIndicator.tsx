const SmallLoadingIndicator = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <div
    className={`${size === "sm" ? "w-4 border-[2px]" : "w-7 border-[3.5px]"} loader flex aspect-square animate-spin rounded-full border-b-transparent`}
  ></div>
);

export default SmallLoadingIndicator;
