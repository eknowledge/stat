function calculateStatistics() {
    const inputs = document.getElementsByClassName("numberInput");
    const numbers = [];
  
    for (let i = 0; i < inputs.length; i++) {
      const num = parseFloat(inputs[i].value);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  
    if (numbers.length > 0) {
      const average = calculateAverage(numbers);
      const standardDeviation = calculateStandardDeviation(numbers);
      const mode = calculateMode(numbers);
      const median = calculateMedian(numbers);
  
      document.getElementById("average").innerText = `Average: ${average}`;
      document.getElementById("standardDeviation").innerText = `Standard Deviation: ${standardDeviation}`;
      document.getElementById("mode").innerText = `Mode: ${mode}`;
      document.getElementById("median").innerText = `Median: ${median}`;
  
      drawHistogram(numbers);
    }
  }
  
  function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
  }
  
  function calculateStandardDeviation(numbers) {
    const average = calculateAverage(numbers);
    const squaredDiffs = numbers.map(num => Math.pow(num - average, 2));
    const variance = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / numbers.length;
    return Math.sqrt(variance).toFixed(2);
  }
  
  function calculateMode(numbers) {
    const frequencyMap = {};
    numbers.forEach(num => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });
  
    let mode;
    let maxFrequency = 0;
    for (const num in frequencyMap) {
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        mode = num;
      }
    }
  
    return mode;
  }
  
  function calculateMedian(numbers) {
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedNumbers.length / 2);
  
    if (sortedNumbers.length % 2 === 0) {
      return ((sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2).toFixed(2);
    } else {
      return sortedNumbers[mid].toFixed(2);
    }
  }
  
  function drawHistogram(numbers) {
    const histogram = document.createElement("div");
    histogram.className = "histogram";
  
    const max = Math.max(...numbers);
    const barHeightScale = 100 / max;
  
    for (const num of numbers) {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${num * barHeightScale}%`;
      histogram.appendChild(bar);
    }
  
    const results = document.getElementById("results");
    results.appendChild(histogram);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("statisticsForm");
    form.onsubmit = event => event.preventDefault();
    calculateStatistics();
  });
  