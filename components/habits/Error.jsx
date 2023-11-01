export default function Error({ children }) {
  return (
    <div className="bg-yellow text-red-600 font-bold text-center">
      {children}
    </div>
  );
}
