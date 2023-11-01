export default function Input({
  type = "text",
  name,
  inputRef = null,
  onChange,
  value,
  disabled,
  size = "",
  onKeyDown = () => {},
}) {
  return (
    <input
      className={`border-2  ${size}`}
      ref={inputRef}
      type={type}
      disabled={disabled}
      placeholder={name}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
