import React, { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import { Link } from "react-router-dom";
import "./Card.scss";

function Card(props) {
  const blockName = "Card";
  const {
    className = "",
    modifiers = [],
    // buildId,
    buildNumber,
    commitMessage = "",
    branchName = "",
    commitHash = "",
    authorName = "",
    status,
    start,
    duration,
    to,
  } = props;

  const [formattedDate, setFormattedDate] = useState({ full: "", short: "" });
  useEffect(() => {
    if (!start) return;

    const [rawDate, rawTime] = start.split("T");

    const monthsNames = {
      "01": "янв",
      "02": "февр",
      "03": "март",
      "04": "апр",
      "05": "май",
      "06": "июнь",
      "07": "июль",
      "08": "авг",
      "09": "сент",
      "10": "окт",
      "11": "нояб",
      "12": "дек",
    };

    const formatDate = (rawDate, rawTime) => {
      const [year, monthNumber, day] = rawDate.split("-");
      const [hour, minutes] = rawTime.split(":");
      const monthName = monthsNames[monthNumber];

      return {
        full: `${day} ${monthName} ${year}, ${hour}:${minutes}`,
        short: `${day} ${monthName}, ${hour}:${minutes}`,
      };
    };

    setFormattedDate(formatDate(rawDate, rawTime));
  }, [start]);

  const [formattedDuration, setFormattedDuration] = useState("");
  useEffect(() => {
    if (!duration) return;

    const formatBuildTime = (duration) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      const hoursStr = hours ? `${hours} ч` : "";
      const minutesStr = minutes ? `${minutes} мин` : "";

      return `${hoursStr}${hours && minutes ? " " : ""}${minutesStr}`;
    };

    setFormattedDuration(formatBuildTime(duration));
  }, [duration]);

  function ellipseStr(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 1) + "...";
    }

    return str;
  }

  const [formattedBranchName, setFormattedBranchName] = useState("");
  useEffect(() => {
    if (!branchName) return;

    setFormattedBranchName(ellipseStr(branchName, 15));
  }, [branchName]);

  const [formattedAuthorName, setFormattedAuthorName] = useState("");
  useEffect(() => {
    if (!authorName) return;

    setFormattedAuthorName(ellipseStr(authorName, 15));
  }, [authorName]);

  const [formattedCommitHash, setFormattedCommitHash] = useState("");
  useEffect(() => {
    if (!commitHash) return;

    setFormattedCommitHash(commitHash.slice(0, 7));
  }, [commitHash]);

  const CardTag = to ? Link : "div";

  return (
    <CardTag
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
      to={to}
    >
      <div className={`${blockName}-Content`}>
        <Icon className={`${blockName}-Icon`} modifiers={[["type", status]]} />
        <div className={`${blockName}-DataWrapper`}>
          <div className={`${blockName}-Data`}>
            <div className={`${blockName}-DataTitle`}>
              <div className={`${blockName}-Number`}>#{buildNumber}</div>
              <div className={`${blockName}-CommitName Text Text_type_commit`}>
                {commitMessage}
              </div>
            </div>
            <div className={`${blockName}-DataOther`}>
              <div className={`${blockName}-OtherInfo`}>
                <Icon
                  className={`${blockName}-OtherIcon`}
                  modifiers={[["type", "branch"]]}
                />
                <div className={`${blockName}-OtherText Text Text_type_card`}>
                  {formattedBranchName}
                </div>
                <div
                  className={`${blockName}-OtherText ${blockName}-OtherText_type_hash Text Text_type_card`}
                >
                  {formattedCommitHash}
                </div>
              </div>
              <div className={`${blockName}-OtherInfo`}>
                <Icon
                  className={`${blockName}-OtherIcon`}
                  modifiers={[["type", "user"]]}
                />
                <div className={`${blockName}-OtherText Text Text_type_card`}>
                  {formattedAuthorName}
                </div>
              </div>
            </div>
          </div>
          <div className={`${blockName}-TimeBlock`}>
            <div
              className={`${blockName}-TimeItem ${
                !formattedDate.short ? `${blockName}-TimeItem_hidden` : ""
              }`}
            >
              <Icon
                className={`${blockName}-TimeIcon`}
                modifiers={[["type", "calendar"]]}
              />
              <div
                className={`${blockName}-TimeText Text Text_type_card`}
                title={formattedDate.full || ""}
              >
                {formattedDate.short || ""}
              </div>
            </div>
            <div
              className={`${blockName}-TimeItem ${
                !formattedDuration ? `${blockName}-TimeItem_hidden` : ""
              }`}
            >
              <Icon
                className={`${blockName}-TimeIcon`}
                modifiers={[["type", "stopwatch"]]}
              />
              <div className={`${blockName}-TimeText Text Text_type_card`}>
                {formattedDuration || ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardTag>
  );
}

export default Card;
