import React from "react";

import MakePost from './MakePost.js'
import Posts from './Posts.js'


export default function Home(){

  return (
    <div style={{ padding: "16px" }}>
      <MakePost/>
      <Posts/>
    </div>

  );
}
