export default function TextArea({
  name,
  value,
  onChange,
  inputRef = null,
  onKeyDown = () => {},
}) {
  return (
    <textarea
      className="border-2"
      name={name}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
      ref={inputRef}
      id=""
      cols="30"
      rows="6"
    ></textarea>
  );
}
