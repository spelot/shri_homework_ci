import React, { useEffect } from "react";
import constants from "../../utils/constants";

function BuildHistoryPage(props) {
  const { modifiers } = props;

  useEffect(() => {
    document.title = `Build history | ${constants.SITE_NAME}`;
  });

  return (
    <main className={`${modifiers} BuildList`}>
      <div className="BuildList-Content">
        <a href="#" className="BuildList-Item Card Card_type_done">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_done"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1368</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    add documentation for postgres scaler
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      9c9f0b9
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_fail">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_fail"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1367</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    Super cool UI kit for making websites that look like games
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      super-cool-ui-kit
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      952e5567
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Vadim Makeev
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_progress">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_clock"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1366</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    Merge branch 'master' of github.com:jaywcjlove/awesome
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      b4636ab
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_done">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_done"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1365</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    upgrade typescript to 3.8
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      b4636ab
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_fail">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_fail"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1364</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    add documentation for postgres scaler
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      b4636ab
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_progress">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_clock"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1363</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    replace all `div` to `article`
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      952e5567
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Vadim Makeev
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_done">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_done"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1362</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    improved accessibility
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      e41e4cc
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_fail">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_fail"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1361</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    fix: upload 别片类型
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      e41e4cc
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a href="#" className="BuildList-Item Card Card_type_progress">
          <div className="Card-Content">
            <div className="Card-Icon Icon Icon_type_clock"></div>
            <div className="Card-DataWrapper">
              <div className="Card-Data">
                <div className="Card-DataTitle">
                  <div className="Card-Number">#1360</div>
                  <div className="Card-CommitName Text Text_type_commit">
                    Form item has default height align with form size
                  </div>
                </div>
                <div className="Card-DataOther">
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_branch"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      master
                    </div>
                    <div className="Card-OtherText Card-OtherText_type_hash Text Text_type_card">
                      e41e4cc
                    </div>
                  </div>
                  <div className="Card-OtherInfo">
                    <div className="Card-OtherIcon Icon Icon_type_user"></div>
                    <div className="Card-OtherText Text Text_type_card">
                      Philip Kirkorov
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card-TimeBlock">
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_calendar"></div>
                  <div
                    className="Card-TimeText Text Text_type_card"
                    title="21 янв 2020, 03:06"
                  >
                    21 янв, 03:06
                  </div>
                </div>
                <div className="Card-TimeItem">
                  <div className="Card-TimeIcon Icon Icon_type_stopwatch"></div>
                  <div className="Card-TimeText Text Text_type_card">
                    1 ч 20 мин
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <button className="BuildList-Button Button Button_type_controlExtended">
          <div className="Button-Text">Show more</div>
        </button>
      </div>
    </main>
  );
}

export default BuildHistoryPage;
