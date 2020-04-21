import constants from "../../utils/constants";

//   cardsData: [
//     {
//       status: "done",
//       buildNumber: 1,
//       commitMessage: "add documentation for postgres scaler",
//       branchName: "master",
//       commitHash: "9c9f0b9",
//       authorName: "Philip Kirkorov",
//       start: "2020-04-05T18:22:35.754Z",
//       duration: 80,
//       logString:
//         '> shri-2020-task-1@1.0.0 build \n> webpack --mode=production "--colors"\n\nHash: \u001b[1me541e85eb5e88a853b17\u001b[39m\u001b[22m\nVersion: webpack \u001b[1m4.41.5\u001b[39m\u001b[22m\nTime: \u001b[1m1782\u001b[39m\u001b[22mms\nBuilt at: 2020-03-30 \u001b[1m0:39:32\u001b[39m\u001b[22m\n        \u001b[1mAsset\u001b[39m\u001b[22m      \u001b[1mSize\u001b[39m\u001b[22m  \u001b[1mChunks\u001b[39m\u001b[22m  \u001b[1m\u001b[39m\u001b[22m                 \u001b[1m\u001b[39m\u001b[22m\u001b[1mChunk Names\u001b[39m\u001b[22m\n    \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m  1.83 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m  7.03 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\n    \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m  20.5 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m  24.8 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\nEntrypoint \u001b[1mmain\u001b[39m\u001b[22m = \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m \u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m\n[0] \u001b[1m./src/js/utils.js\u001b[39m\u001b[22m 514 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[1] \u001b[1mmulti ./src/js/_index.js ./src/scss/index.scss\u001b[39m\u001b[22m 40 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[2] \u001b[1m./src/js/_index.js\u001b[39m\u001b[22m 89 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[3] \u001b[1m./src/js/onoffswitch.js\u001b[39m\u001b[22m 654 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[4] \u001b[1m./src/js/e-accordion.js\u001b[39m\u001b[22m 403 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[5] \u001b[1m./src/scss/index.scss\u001b[39m\u001b[22m 39 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n    + 1 hidden module\nChild \u001b[1mmini-css-extract-plugin node_modules/css-loader/dist/cjs.js??ref--5-1!node_modules/postcss-loader/src/index.js!node_modules/sass-loader/dist/cjs.js!src/scss/index.scss\u001b[39m\u001b[22m:\n    Entrypoint \u001b[1mmini-css-extract-plugin\u001b[39m\u001b[22m = \u001b[1m\u001b[32m*\u001b[39m\u001b[22m\n    [0] \u001b[1m./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss\u001b[39m\u001b[22m 20.7 KiB {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n        + 1 hidden module\n'
//     },
//     {
//       status: "fail",
//       buildNumber: 2,
//       commitMessage:
//         "Super cool UI kit for making websites that look like games",
//       branchName: "master",
//       commitHash: "9c9f0b9",
//       authorName: "Vadim Makeev",
//       start: "2020-01-21T03:06:35.754Z",
//       duration: 30
//     },
//     {
//       status: "progress",
//       buildNumber: 3,
//       commitMessage: "add documentation for postgres scaler",
//       branchName: "master",
//       commitHash: "9c9f0b9",
//       authorName: "Philip Kirkorov",
//       start: "2020-04-05T18:22:35.754Z",
//       duration: 10
//     },
//     {
//       status: "fail",
//       buildNumber: 4,
//       commitMessage:
//         "Super cool UI kit for making websites that look like games",
//       branchName: "master",
//       commitHash: "9c9f0b9",
//       authorName: "Vadim Makeev",
//       start: "2020-01-21T03:06:35.754Z",
//       duration: 270
//     }
//   ]

const defaultState = {
  data: [],
  details: null,
  log: null,
};

export default function (state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case constants.FETCH_BUILDS:
      return {
        ...state,
        data: [...action.payload],
      };
    case constants.FETCH_MORE_BUILDS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case constants.DETAILS_BUILD:
      return {
        ...state,
        details: {
          ...action.payload,
        },
      };
    case constants.LOG_BUILD:
      return {
        ...state,
        log: action.payload,
      };
    default:
      return state;
  }
}

export const getBuildsData = (state) => state.builds.data;
export const getDetails = (state) => state.builds.details;
export const getLog = (state) => state.builds.log;
