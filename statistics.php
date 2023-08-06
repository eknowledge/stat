<?php
if (isset($_POST['numbers'])) {
  $numbers = $_POST['numbers'];

  function calculateAverage($numbers) {
    $sum = array_sum($numbers);
    return number_format($sum / count($numbers), 2);
  }

  function calculateStandardDeviation($numbers) {
    $mean = calculateAverage($numbers);
    $squaredDiffs = array_map(function ($num) use ($mean) {
      return pow($num - $mean, 2);
    }, $numbers);
    $variance = array_sum($squaredDiffs) / count($numbers);
    return number_format(sqrt($variance), 2);
  }

  function calculateMode($numbers) {
    $frequencyMap = array_count_values($numbers);
    arsort($frequencyMap);
    $modes = array_keys($frequencyMap, max($frequencyMap));
    return implode(', ', $modes);
  }

  function calculateMedian($numbers) {
    sort($numbers);
    $count = count($numbers);
    $mid = floor($count / 2);

    if ($count % 2 === 0) {
      return number_format(($numbers[$mid - 1] + $numbers[$mid]) / 2, 2);
    } else {
      return number_format($numbers[$mid], 2);
    }
  }

  $average = calculateAverage($numbers);
  $standardDeviation = calculateStandardDeviation($numbers);
  $mode = calculateMode($numbers);
  $median = calculateMedian($numbers);

  $result = [
    'average' => $average,
    'standardDeviation' => $standardDeviation,
    'mode' => $mode,
    'median' => $median
  ];

  header('Content-Type: application/json');
  echo json_encode($result);
}
?>
