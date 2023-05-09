/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\r\n  const ctx = document.getElementById(\"myChart\").getContext(\"2d\");\r\n  const ctx2 = document.getElementById(\"myChart2\").getContext(\"2d\");\r\n  const ctx3 = document.getElementById(\"myChart3\").getContext(\"2d\");\r\n\r\n  const getUsername = () => {\r\n    const urlParams = new URLSearchParams(window.location.search);\r\n    const username = urlParams.get('username');\r\n    return username\r\n  }\r\n\r\nconst fetchData = async () => {\r\n    const username = getUsername();\r\n  \r\n    const repositoriesResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=1000`);\r\n    const repositoriesData = await repositoriesResponse.json();\r\n  \r\n    const languagesCount = {};\r\n    const starsPerLanguage = {};\r\n  \r\n    for (let repo of repositoriesData) {\r\n      const languagesResponse = await fetch(repo.languages_url);\r\n      const languagesData = await languagesResponse.json();\r\n  \r\n      for (let language in languagesData) {\r\n        if (languagesCount[language]) {\r\n          languagesCount[language]++;\r\n        } else {\r\n          languagesCount[language] = 1;\r\n        }\r\n  \r\n        if (starsPerLanguage[language]) {\r\n          starsPerLanguage[language] += languagesData[language];\r\n        } else {\r\n          starsPerLanguage[language] = languagesData[language];\r\n        }\r\n      }\r\n    }\r\n  \r\n    const sortedLanguages = Object.entries(languagesCount)\r\n      .sort((a, b) => b[1] - a[1])\r\n      .slice(0, 5);\r\n  \r\n    const labels = sortedLanguages.map((language) => language[0]);\r\n    const data = sortedLanguages.map((language) => language[1]);\r\n  \r\n    const data2 = [];\r\n    for (let language in starsPerLanguage) {\r\n      data2.push({\r\n        language: language,\r\n        stars: starsPerLanguage[language],\r\n      });\r\n    }\r\n  \r\n    data2.sort((a, b) => b.stars - a.stars);\r\n    const topRepos = repositoriesData.slice(0, 5);\r\n    const repoNames = topRepos.map((repo) => repo.name);\r\n    const stargazersCount = topRepos.map((repo) => repo.stargazers_count);\r\n  \r\n    return { labels, data, repoNames, stargazersCount, data2 };\r\n  };\r\n  \r\n  const renderChart = async () => {\r\n    const { labels, data, repoNames, stargazersCount, data2 } = await fetchData();\r\n    new Chart(ctx, {\r\n      type: \"doughnut\",\r\n      data: {\r\n        labels: labels,\r\n        datasets: [\r\n          {\r\n            label: \"Number of Votes\",\r\n            data: data,\r\n            backgroundColor: [\r\n              \"#ff91a9\",\r\n              \"#72bef1\",\r\n              \"#ffdd88\",\r\n              \"#81d3d3\",\r\n              \"#8877a3\",\r\n            ],\r\n            borderWidth: 1,\r\n          },\r\n        ],\r\n      },\r\n      options: {\r\n        plugins: {\r\n          legend: {\r\n            position: \"right\",\r\n          },\r\n        },\r\n      },\r\n    });\r\n    new Chart(ctx2, {\r\n      type: \"bar\",\r\n      data: {\r\n        labels: repoNames,\r\n        datasets: [\r\n          {\r\n            // label: \"hello\",\r\n            data: stargazersCount,\r\n            backgroundColor: [\r\n              \"#ff91a9\",\r\n              \"#72bef1\",\r\n              \"#ffdd88\",\r\n              \"#81d3d3\",\r\n              \"#8877a3\",\r\n            ],\r\n          },\r\n        ],\r\n      },\r\n      options: {\r\n        responsive: false,\r\n        plugins: {\r\n          legend: {\r\n            display: false,\r\n          },\r\n        },\r\n        maintainAspectRatio: false,\r\n      },\r\n    });\r\n    // top starred language chart\r\n    // Extract labels and data values for Chart.js\r\n    const labelss = data2.map((datum) => datum.language);\r\n    const values = data2.map((datum) => datum.stars);\r\n    // Create a new Chart.js doughnut chart\r\n    new Chart(ctx3, {\r\n      type: \"pie\",\r\n      data: {\r\n        labels: data2.map((datum) => datum.language),\r\n        datasets: [\r\n          {\r\n            label: \"Stars per Language\",\r\n            data: data2.map((datum) => datum.stars),\r\n            backgroundColor: [\r\n              \"#ff91a9\",\r\n              \"#72bef1\",\r\n              \"#ffdd88\",\r\n              \"#81d3d3\",\r\n              \"#8877a3\",\r\n            ],\r\n          },\r\n        ],\r\n      },\r\n      options: {\r\n        responsive: true,\r\n        plugins: {\r\n          legend: {\r\n            position: \"right\",\r\n          },\r\n        },\r\n      },\r\n    });\r\n  };\r\n\r\n  renderChart();\r\n});\r\n\n\n//# sourceURL=webpack://octprofile/./public/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/index.js"]();
/******/ 	
/******/ })()
;