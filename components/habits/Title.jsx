export default function Title({ children, extra = "" }) {
  return (
    <div className={`text-2xl  font-bold  underline ${extra} `}>{children}</div>
  );
}
