import Docs from "@/components/docs/Docs";
import React from "react";

export default function page({ params }) {
  const unwrappedParams = React.use(params);

  const page = unwrappedParams.page;
  return (
    <div>
      <Docs page={page} />
    </div>
  );
}
