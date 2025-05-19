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

//保存
export const saveImageApi = (data: {
  toolName: string;
  toolType: string;
  setting: string;
}) => {
  const userId = localStorage.getItem("userId") || "test1";
  return req.request({
    method: "post",
    // url: "https://aitool.codejoyai.com/aitool_api/tool/createLog",
    url: "http://localhost:4040/api/tool/createLog",
    data: data,
    headers: {
      platform: "lndx",
      userId: userId,
    },
  });
};

// 收藏
export const collectImageApi = (data: { uuid: string }) => {
  return req.request({
    method: "post",
    // url: "https://aitool.codejoyai.com/aitool_api/tool/collection",
    url: "http://localhost:4040/api/tool/collection",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 取消收藏
export const cancelCollectImageApi = (data: { uuid: string }) => {
  return req.request({
    method: "post",
    // url: "https://aitool.codejoyai.com/aitool_api/tool/cancelCollection",
    url: "http://localhost:4040/api/tool/cancelCollection",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 获取收藏的列表
export const getCollectImageListApi = (data: {
  page: number;
  pageSize: number;
  toolName: string;
}) => {
  const userId = localStorage.getItem("userId") || "test1";
  return req.request({
    method: "post",
    // url: "https://aitool.codejoyai.com/aitool_api/tool/collectionList",
    url: "http://localhost:4040/api/tool/collectionList",
    data: data,
    headers: {
      platform: "lndx",
      userId: userId,
    },
  });
};
