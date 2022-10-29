export default function Logo(props: any) {
  return (
    <a
      href="https://en.wikipedia.org/wiki/Symbol_of_Chaos"
      aria-label="Symbol of Chaos"
      className="bg-gray-800 w-fit group rounded-lg p-3 border-2 border-red-400 stack before:absolute before:inset-0 before:bg-gray-700 before:transition hover:before:bg-red-400 hover:before:bg-opacity-40"
    >
      <svg
        className="fill-gray-200 w-full md:w-48 group-hover:bg-red-400 group-hover:bg-opacity-80 transition ease-out rounded-full"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M234 99H264V401H234V99Z" />
        <path d="M302.066 100.033H196L249.033 47L302.066 100.033Z" />
        <path d="M303.066 400.033H197L250.033 453.066L303.066 400.033Z" />
        <path d="M99 265V235H401V265H99Z" />
        <path d="M100.033 196.934V303L47 249.967L100.033 196.934Z" />
        <path d="M400.033 195.934V302L453.066 248.967L400.033 195.934Z" />
        <path d="M161.552 178.397L177.402 162.546L336.965 322.109L321.114 337.959L161.552 178.397Z" />
        <path d="M198.06 142.98L142.02 199.02V142.98H198.06Z" />
        <path d="M357.094 300.957L301.054 356.997H357.094V300.957Z" />
        <path d="M178.397 337.448L162.546 321.598L322.109 162.035L337.959 177.886L178.397 337.448Z" />
        <path d="M142.98 300.94L199.02 356.98H142.98V300.94Z" />
        <path d="M300.957 141.906L356.997 197.946V141.906L300.957 141.906Z" />
      </svg>
    </a>
  );
}
