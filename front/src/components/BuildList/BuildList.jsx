import React, { useEffect, useCallback } from "react";
import processModifiers from "../../utils/processModifiers";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./BuildList.scss";
import { getBuildsData } from "../../store/reducers/buildsReducer";
import {
  fetchBuilds,
  fetchMoreBuilds,
} from "../../store/actions/buildsActions";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import i18n from "../../utils/i18n";

function BuildList(props) {
  const blockName = "BuildList";
  const { className = "", modifiers = [] } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  const buildsData = useSelector(getBuildsData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBuilds({ limit: 10 }));
    // eslint-disable-next-line
  }, []);

  const onShowMoreClick = useCallback(
    () => dispatch(fetchMoreBuilds({ limit: 10, offset: buildsData.length })),
    // eslint-disable-next-line
    [buildsData.length]
  );

  return (
    <main
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        {buildsData.map(
          ({
            status,
            id,
            buildNumber,
            commitMessage,
            branchName,
            commitHash,
            authorName,
            start,
            duration,
          }) => {
            let correctStatus;
            switch (status) {
              case "InProgress":
              case "Waiting":
                correctStatus = "progress";
                break;
              case "Success":
                correctStatus = "done";
                break;
              case "Fail":
              case "Canceled":
              default:
                correctStatus = "fail";
                break;
            }
            return (
              <Card
                className={`${blockName}-Item`}
                modifiers={[["type", correctStatus]]}
                buildId={id}
                to={`/build/${id}`}
                buildNumber={buildNumber}
                commitMessage={commitMessage}
                branchName={branchName}
                commitHash={commitHash}
                authorName={authorName}
                start={start}
                duration={duration}
                key={id}
                status={correctStatus}
              />
            );
          }
        )}

        <Button
          className={`${blockName}-Button`}
          modifiers={[["type", "controlExtended"]]}
          text={i18n(dictionary, currentLanguage, "SHOW_MORE")}
          onClick={onShowMoreClick}
        />
      </div>
    </main>
  );
}

export default BuildList;
