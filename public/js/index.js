const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');

const getTopLanguagesAndRepo = async () => {
  const url = `https://api.github.com/users/jonasschmedtmann/repos`;

  try {
    const response = await fetch(url);
    const repos = await response.json();

    // Get top languages
    const languageCounts = {};
    await Promise.all(
      repos.map(async (repo) => {
        const languagesUrl = `${repo.url}/languages`;
        const languagesResponse = await fetch(languagesUrl);
        const languages = await languagesResponse.json();
        Object.keys(languages).forEach((language) => {
          languageCounts[language] = (languageCounts[language] || 0) + languages[language];
        });
      })
    );
    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    // Get most starred repo
    const mostStarredRepo = repos.reduce((a, b) => (a.stargazers_count > b.stargazers_count ? a : b));

    return { topLanguages, mostStarredRepo };
  } catch (error) {
    console.error(error);
    return null;
  }
};


const generateChart = async () => {
  const generateChart = async () => {
    const data = await getTopLanguagesAndRepo();
    const backgroundColorss = [
      '#f5e98b', // Bar 1
      '#8877a3', // Bar 2
      '#838db5', // Bar 3
    ];
    const labels = Object.keys(data.topLanguages).concat(data.mostStarredRepo.name);
    const dataValues = Object.values(data.topLanguages).concat(data.mostStarredRepo.stargazers_count);
    const backgroundColors = backgroundColorss.slice(0, 3).concat(data.mostStarredRepo.language);
  
    const config = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of GitHub Stars',
          data: dataValues,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: 'black'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
      }
    };
  
    const myChart = new Chart(ctx, config);
  };
  


  const myChart3 = new Chart(ctx3, {
    type: "pie",
    data: {
      labels: Object.keys(data.topLanguages).concat(data.mostStarredRepo.name),
      datasets: [
        {
          label: "Number of GitHub Stars",
          data: Object.values(data.topLanguages).concat(data.mostStarredRepo.stargazers_count),
          backgroundColor: backgroundColors.slice(0, 3).concat(data.mostStarredRepo.language),
          borderWidth: 2,
          borderColor: "black",
        },
      ],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: false,
      plugins: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
    },
  });
  const myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: Object.keys(data.topLanguages).concat(data.mostStarredRepo.name),
      datasets: [
        {
          label: "Number of GitHub Stars",
          data: Object.values(data.topLanguages).concat(data.mostStarredRepo.stargazers_count),
          backgroundColor: backgroundColors.slice(0, 3).concat(data.mostStarredRepo.language),
          borderWidth: 2,
          borderColor: "black",
        },
      ],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: false,
       plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
    },
  });
};

generateChart();
