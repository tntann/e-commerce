import axios from "../axios";

export const apiCreateNewBlog = (data) =>
  axios({
    url: "/blog/",
    method: "post",
    data,
  });
