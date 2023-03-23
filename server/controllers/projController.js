import ProjModel from "../models/projModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../utils/errors.js";

import crypto from "crypto";

export const createProject = async (req, res) => {
  const { githubUrl, frameWork, fVer } = req.body;

  const proj = await ProjModel.create({
    pid: crypto.randomBytes(4).toString("hex"),
    uid: req.user.uid,
    githubUrl,
    frameWork,
    fVer,
    pStatus: "Building",
  });

  res.status(StatusCodes.CREATED).json({ result: proj });
};

export const getProjList = async (req, res) => {
  const projs = ProjModel.find({ uid: req.user.uid });
  res.status(StatusCodes.CREATED).json({ result: projs });
};

export const getProj = async (req, res) => {
  const { pid } = req.body;
  const proj = ProjModel.findOne({ pid, uid: req.user.uid });
  res.status(StatusCodes.CREATED).json({ result: proj });
};
