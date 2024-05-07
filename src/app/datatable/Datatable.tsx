import React from "react";

interface Props {
  data: any;
}

function Datatable({ data }: Props) {
  return (
    <div>
      Datatable
      {data?.map((item: any, i: number) => (
        <li key={i}>{item.first_name}</li>
      ))}
    </div>
  );
}

export default Datatable;
