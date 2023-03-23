import axios from "axios";
import { ProjModel } from "@/models/projModel";

export async function getAllProj(): Promise<ProjModel[]> {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw "Server Url Not Set";
  const url = process.env.NEXT_PUBLIC_SERVER_URL + "/project/getAll";

  const token = localStorage.getItem("Token");
  var projs: ProjModel[] = [];

  try {
    var res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      var data = res.data.result;
      data.forEach((ele: any) => {
        projs.push({
          pid: ele.pid,
          pname: ele.pname,
          githubUrl: ele.githubUrl,
          frameWork: ele.frameWork,
          fVer: ele.fVer,
          pStatus: ele.pStatus,
        });
      });

      return projs;
    }
  } catch (e: any) {
    return [];
  }
  return [];
}

export async function createProj(
  githubUrl: string,
  frameWork: string,
  pname: string,
  router: any
): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw "Server Url Not Set";
  const url = process.env.NEXT_PUBLIC_SERVER_URL + "/project/create";

  const token = localStorage.getItem("Token");

  try {
    var res = await axios.post(
      url,
      { githubUrl, frameWork, fVer: "0.1", pname },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      router.push(`/project/${res.data.result.pid}`);
      return true;
    }
  } catch (e: any) {
    return false;
  }
  return false;
}

export async function getProj(pid: string): Promise<ProjModel | undefined> {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw "Server Url Not Set";
  const url = process.env.NEXT_PUBLIC_SERVER_URL + `/project/${pid}`;

  const token = localStorage.getItem("Token");

  var proj: ProjModel;

  try {
    var res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res.data.result);

    if (res.status === 200) {
      proj = res.data.result;
      return proj;
    }
  } catch (e: any) {
    return;
  }
  return;
}

export async function getProjLogs(pid: string, setLog: any) {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw "Server Url Not Set";
  const url = process.env.NEXT_PUBLIC_SERVER_URL + `/project/${pid}/logs`;

  const token = localStorage.getItem("Token");

  try {
    var res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      onDownloadProgress: function (progressEvent) {
        setLog(progressEvent.event.target.response);
      },
    });

    // console.log(res.data.result);

    if (res.status === 200) {
      setLog(res.data);
    }
  } catch (e: any) {
    return;
  }
}
