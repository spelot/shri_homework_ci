import React, { useEffect } from "react";
import constants from "../../utils/constants";

function BuildDetailsPage(props) {
  const { modifiers } = props;

  useEffect(() => {
    document.title = `Build details | ${constants.SITE_NAME}`;
  });

  const buildLogString = `
        &gt; webpack-demo12@1.0.0 devTest /Users/spelot/Downloads/webpack-demos-master/demo12
        &gt; webpack-dev-server --progress --colors
        
        
        Project is running at <span style="font-weight:bold;"></span><span style="font-weight:bold;color:blue;">http://localhost:8080/</span><span style="font-weight:bold;"></span>
        webpack output is served from <span style="font-weight:bold;"></span><span style="font-weight:bold;color:blue;">/</span><span style="font-weight:bold;"></span>
        Hash: <span style="font-weight:bold;">d3170a8795fd4c9a7936</span>
        Version: webpack <span style="font-weight:bold;">3.12.0</span>
        Time: <span style="font-weight:bold;">1935</span>ms
            <span style="font-weight:bold;">Asset</span>       <span style="font-weight:bold;">Size</span>  <span style="font-weight:bold;">Chunks</span>  <span style="font-weight:bold;"></span>           <span style="font-weight:bold;"></span>       <span style="font-weight:bold;">Chunk Names</span>
        <span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;">bundle2.js</span><span style="font-weight:bold;"></span>  448 bytes       <span style="font-weight:bold;">0</span>  <span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;">[emitted]</span><span style="font-weight:bold;"></span>         bundle2
        <span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;">bundle1.js</span><span style="font-weight:bold;"></span>  444 bytes       <span style="font-weight:bold;">1</span>  <span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;">[emitted]</span><span style="font-weight:bold;"></span>         bundle1
        <span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">commons.js</span><span style="font-weight:bold;"></span>    <span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">1.43 MB</span><span style="font-weight:bold;"></span>       <span style="font-weight:bold;">2</span>  <span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;">[emitted]</span><span style="font-weight:bold;"></span>  <span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">[big]</span><span style="font-weight:bold;"></span>  commons
          [1] <span style="font-weight:bold;">../node_modules/react/index.js</span> 190 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [3] <span style="font-weight:bold;">../node_modules/webpack-dev-server/client?http://localhost:8080</span> 7.93 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [7] <span style="font-weight:bold;">../node_modules/react-dom/index.js</span> 1.36 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [9] <span style="font-weight:bold;">multi ../node_modules/webpack-dev-server/client?http://localhost:8080 ./main1.jsx</span> 40 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">1</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [10] <span style="font-weight:bold;">../node_modules/url/url.js</span> 23.3 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [14] <span style="font-weight:bold;">../node_modules/querystring-es3/index.js</span> 127 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [17] <span style="font-weight:bold;">../node_modules/strip-ansi/index.js</span> 161 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [19] <span style="font-weight:bold;">../node_modules/loglevel/lib/loglevel.js</span> 8.61 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [20] <span style="font-weight:bold;">../node_modules/webpack-dev-server/client/socket.js</span> 1.08 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [22] <span style="font-weight:bold;">../node_modules/webpack-dev-server/client/overlay.js</span> 3.67 kB {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [27] <span style="font-weight:bold;">../node_modules/webpack/hot nonrecursive ^\.\/log$</span> 170 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [29] <span style="font-weight:bold;">../node_modules/webpack/hot/emitter.js</span> 77 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">2</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [31] <span style="font-weight:bold;">./main1.jsx</span> 184 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">1</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [42] <span style="font-weight:bold;">multi ../node_modules/webpack-dev-server/client?http://localhost:8080 ./main2.jsx</span> 40 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">0</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span><span style="font-weight:bold;"></span>
          [43] <span style="font-weight:bold;">./main2.jsx</span> 186 bytes {<span style="font-weight:bold;"></span><span style="font-weight:bold;color:olive;">0</span><span style="font-weight:bold;"></span>}<span style="font-weight:bold;"></span><span style="font-weight:bold;color:green;"> [built]</span>`;

  return (
    <main className={`${modifiers} BuildList BuildList_type_details`}>
      <div className="BuildList-Content">
        <div className="BuildList-Item Card Card_type_done Card_page_details">
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
        </div>

        <pre
          className="BuildLog"
          dangerouslySetInnerHTML={{ __html: buildLogString }}
        />
      </div>
    </main>
  );
}

export default BuildDetailsPage;
