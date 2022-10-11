import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";

const Table = (props) => {
  const { data, columns } = props;
  return (
    <div className="w-11/12 px-4 sm:px-6 lg:px-8 flex-col">
      <div className="justify-center p-8 mt-6 mb-0 space-y-4 rounded-lg bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-200 table-fixed">
            <thead className="w-full">
              <tr>
                {columns.length > 0 &&
                  columns.map((item) => {
                    return <th className="p-4 font-bold text-left text-gray-900 whitespace-nowrap w-1/3">{item}</th>;
                  })}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.length > 0 &&
                data.map((item) => {
                  console.log(item);
                  return (
                    <tr>
                      {columns.map((columnName) => (
                        <td className="p-4 font-medium whitespace-nowrap truncate">{item[`${columnName}`]}</td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
