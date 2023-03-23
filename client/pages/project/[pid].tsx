import Navbar from "@/components/shared/navbar/navbar";
import { ProjModel } from "@/models/projModel";
import { getProj, getProjLogs } from "@/services/projServices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjDetails() {
  const router = useRouter();
  const { pid } = router.query;
  const [proj, setProj] = useState<ProjModel>();

  const [logText, setLogText] = useState<string>("");

  useEffect(() => {
    async function asyncc() {
      if (pid) setProj(await getProj(pid.toString()));
    }
    asyncc();
  }, [pid]);

  useEffect(() => {
    async function asyncc() {
      if (pid) await getProjLogs(pid.toString(), setLogText);
    }
    asyncc();
  }, [pid]);

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="h-32" />

      {/* project description section */}
      <div className="w-full p-8">
        <div className="w-full p-4 px-10 flex flex-col border border-white rounded-md">
          <div className="w-full py-5 flex justify-between">
            <div>Project Name : </div>
            <div className="font-extralight">{proj?.pname}</div>
          </div>
          <div className="w-full py-5 flex justify-between">
            <div>Github URL : </div>
            <div className="font-extralight">{proj?.githubUrl}</div>
          </div>
          <div className="w-full py-5 flex justify-between">
            <div>Framework : </div>
            <div className="font-extralight">{proj?.frameWork}</div>
          </div>
          <div className="w-full py-5 flex justify-between">
            <div>Project Status : </div>
            <div className="font-extralight">{proj?.pStatus}</div>
          </div>
        </div>
      </div>
      <div className="h-10" />

      {/* project logs */}
      <div className="h-[70vh] w-full p-8">
        <div className="w-full h-full p-4 py-8 px-10 flex flex-col bg-[#222]">
          <div className="font-extralight overflow-y-auto">{logText}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjDetails;
