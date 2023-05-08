document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const ctx2 = document.getElementById("myChart2").getContext("2d");
  const ctx3 = document.getElementById("myChart3").getContext("2d");

  const getUsername = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    return username
  }
  const getRepoData = async () => {
    const username = getUsername();
    const url = `https://api.github.com/users/${username}/repos`;
    try {
      const response = await fetch(url);
      const repositories = await response.json();

      const languagesCount = {};
      repositories.forEach((repo) => {
        const language = repo.language;
        if (language) {
          if (languagesCount[language]) {
            languagesCount[language]++;
          } else {
            languagesCount[language] = 1;
          }
        }
      });

      const sortedLanguages = Object.entries(languagesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const labels = sortedLanguages.map((language) => language[0]);
      const data = sortedLanguages.map((language) => language[1]);

      return { labels, data };
    } catch (err) {
      console.log(err);
    }
  };

  const getTopStarred = async () => {
    const username = getUsername();

    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repositories = await response.json();

    // Iterate through repositories and count stars per language
    const starsPerLanguage = {};
    for (let repo of repositories) {
      // Fetch languages for repository
      const languagesResponse = await fetch(repo.languages_url);
      const languagesData = await languagesResponse.json();

      // Iterate through languages and add stars count for each language
      for (let language in languagesData) {
        if (starsPerLanguage[language]) {
          starsPerLanguage[language] += languagesData[language];
        } else {
          starsPerLanguage[language] = languagesData[language];
        }
      }
    }

    // Convert stars per language object into an array
    const data = [];
    for (let language in starsPerLanguage) {
      data.push({
        language: language,
        stars: starsPerLanguage[language],
      });
    }

    // Sort data by stars count in descending order
    data.sort((a, b) => b.stars - a.stars);

    // Return top 5 languages by stars count
    return data.slice(0, 5);
  };

  const getMostStarred = async () => {
    const username = getUsername();
    // Fetch repos data from API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=1000`
    );
    const data = await response.json();

    // Sort repos by stargazers count in descending order
    data.sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Get the top 5 most starred repos
    const topRepos = data.slice(0, 5);

    // Extract repo names and stargazers count
    const repoNames = topRepos.map((repo) => repo.name);
    const stargazersCount = topRepos.map((repo) => repo.stargazers_count);
    return { repoNames, stargazersCount };
  };

  const renderChart = async () => {
    const { labels, data } = await getRepoData();
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
    const { repoNames, stargazersCount } = await getMostStarred();
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
    const topstarsLanguages = await getTopStarred();
    // Extract labels and data values for Chart.js
    const labelss = topstarsLanguages.map((datum) => datum.language);
    const values = topstarsLanguages.map((datum) => datum.stars);

    // Create a new Chart.js doughnut chart
    new Chart(ctx3, {
      type: "pie",
      data: {
        labels: labelss,
        datasets: [
          {
            label: "Stars per Language",
            data: values,
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
        // maintainAspectRatio: false
      },
    });
  };

  renderChart();
});
