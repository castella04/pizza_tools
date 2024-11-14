import React from "react";
import { Helmet } from "react-helmet-async";
import "../css/Index.css";
const Index = () => {
  return (
    <div main-inner>
      <Helmet>
        <title>ぴざつーる</title>
        <meta name="description" content="Make Daily Routine Easier" />
      </Helmet>
      <h2>やるべき仕事は効率よく！</h2>
    </div>
  );
};

export default Index;
