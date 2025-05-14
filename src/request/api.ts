import req from "./index";

// 请求工作流
export const generateImageApi = (data: {
  inputs: {
    prompt: string;
  };
  response_mode: string;
  user: string;
  maxBodyLength?: number;
}) => {
  return req.request({
    method: "post",
    url: "https://api-agent.codejoyai.com/v1/workflows/run",
    data: JSON.stringify(data),
    headers: {
      Authorization: `Bearer app-Myuq8BslpHt3mDbZukqVveb2`,
      "Content-Type": "application/json",
    },
  });
};
