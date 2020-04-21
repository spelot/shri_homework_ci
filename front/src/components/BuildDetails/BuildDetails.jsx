import React, { useEffect } from "react";
import processModifiers from "../../utils/processModifiers";
import Card from "../Card/Card";
import BuildLog from "../BuildLog/BuildLog";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./BuildDetails.scss";
import { fetchBuildDetailsAndLog } from "../../store/actions/buildsActions";
import { getDetails, getLog } from "../../store/reducers/buildsReducer";
import { useState } from "react";

const Convert = require("ansi-to-html");

function BuildDetails(props) {
  const blockName = "BuildDetails";
  const { className = "", modifiers = [] } = props;

  const { buildId } = useParams();

  const details = useSelector(getDetails);
  const log = useSelector(getLog);

  const [logStringHtml, setLogStringHtml] = useState("");

  const convert = new Convert({
    fg: "#000",
    bg: "#000",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // fetch build details and log
    dispatch(fetchBuildDetailsAndLog(buildId));
    // eslint-disable-next-line
  }, [buildId]);

  useEffect(() => {
    setLogStringHtml(convert.toHtml(log || ""));
  }, [log, convert]);

  const [correctStatus, setCorrectStatus] = useState("");
  useEffect(() => {
    if (!details) return;

    let correct;
    switch (details.status) {
      case "InProgress":
      case "Waiting":
        correct = "progress";
        break;
      case "Success":
        correct = "done";
        break;
      case "Fail":
      case "Canceled":
      default:
        correct = "fail";
        break;
    }

    setCorrectStatus(correct);
  }, [details]);

  return (
    <main
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      {details && details.id === buildId && (
        <div className={`${blockName}-Content`}>
          <Card
            className={`${blockName}-Item`}
            modifiers={[
              ["type", correctStatus],
              ["page", "details"],
            ]}
            buildId={details.id}
            buildNumber={details.buildNumber}
            commitMessage={details.commitMessage}
            branchName={details.branchName}
            commitHash={details.commitHash}
            authorName={details.authorName}
            start={details.start}
            duration={details.duration}
            status={correctStatus}
          />

          {log && <BuildLog logString={logStringHtml} />}
        </div>
      )}
    </main>
  );
}

export default BuildDetails;
