document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const ctx2 = document.getElementById("myChart2").getContext("2d");
  const ctx3 = document.getElementById("myChart3").getContext("2d");

  const getUsername = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    return username
  }

const fetchData = async () => {
    const username = getUsername();
  
    const repositoriesResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=1000`);
    const repositoriesData = await repositoriesResponse.json();
  
    const languagesCount = {};
    const starsPerLanguage = {};
  
    for (let repo of repositoriesData) {
      const languagesResponse = await fetch(repo.languages_url);
      const languagesData = await languagesResponse.json();
  
      for (let language in languagesData) {
        if (languagesCount[language]) {
          languagesCount[language]++;
        } else {
          languagesCount[language] = 1;
        }
  
        if (starsPerLanguage[language]) {
          starsPerLanguage[language] += languagesData[language];
        } else {
          starsPerLanguage[language] = languagesData[language];
        }
      }
    }
  
    const sortedLanguages = Object.entries(languagesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  
    const labels = sortedLanguages.map((language) => language[0]);
    const data = sortedLanguages.map((language) => language[1]);
  
    const data2 = [];
    for (let language in starsPerLanguage) {
      data2.push({
        language: language,
        stars: starsPerLanguage[language],
      });
    }
  
    data2.sort((a, b) => b.stars - a.stars);
    const topRepos = repositoriesData.slice(0, 5);
    const repoNames = topRepos.map((repo) => repo.name);
    const stargazersCount = topRepos.map((repo) => repo.stargazers_count);
  
    return { labels, data, repoNames, stargazersCount, data2 };
  };
  
  const renderChart = async () => {
    const { labels, data, repoNames, stargazersCount, data2 } = await fetchData();
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of Votes",
            data: data,
            backgroundColor: [
              "#ff91a9",
              "#72bef1",
              "#ffdd88",
              "#81d3d3",
              "#8877a3",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
    new Chart(ctx2, {
      type: "bar",
      data: {
        labels: repoNames,
        datasets: [
          {
            // label: "hello",
            data: stargazersCount,
            backgroundColor: [
              "#ff91a9",
              "#72bef1",
              "#ffdd88",
              "#81d3d3",
              "#8877a3",
            ],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      },
    });
    // top starred language chart
    // Extract labels and data values for Chart.js
    const labelss = data2.map((datum) => datum.language);
    const values = data2.map((datum) => datum.stars);
    // Create a new Chart.js doughnut chart
    new Chart(ctx3, {
      type: "pie",
      data: {
        labels: data2.map((datum) => datum.language),
        datasets: [
          {
            label: "Stars per Language",
            data: data,
            backgroundColor: [
              "#ff91a9",
              "#72bef1",
              "#ffdd88",
              "#81d3d3",
              "#8877a3",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  };

  renderChart();
});
