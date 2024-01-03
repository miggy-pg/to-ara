import "./styles.css"

export default function Spinner() {
  return (
    <div className="relative h-32 w-32 bg-red-500">
      <div className="absolute inset-0 bg-red-500">

        <svg className="container"><rect className="boxes"></rect></svg>
      </div>
    </div>
  )
}
