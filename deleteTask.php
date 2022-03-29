<?php

// import file function.php untuk mengambil function-function yang telah dibuat
include "function.php";

// Cek apakah user sudah meng-klik tombol delete
if(!isset($_POST["delete"])) {
    header("location: index.php", true, 301);
    exit();
}

// ambil data dari tasks.json
$tasks = getJsonContent("./tasks.json");

// membuat function untuk mencari Array Item dan return index array-nya
function searchArrayItem($search, $array) {
    foreach ($array as $key => $value) {
        $filter = array_search($search,$value);

        if($filter) {
            return $key;
        }
    }
}

// membuat function untuk delete Array Item berdasarkan index-nya
function deleteArrayItem($index, $array) {
    $currentArray = $array;
    unset($currentArray[$index]);
    $newArray = array_values($currentArray);

    return $newArray;
}

// Ambil "id" dari Tasks melaui $_POST
$taskID = $_POST["id"];

$indexOfArray = searchArrayItem($taskID, $tasks);
$tasks = deleteArrayItem($indexOfArray, $tasks);

$newTasks = json_encode($tasks, JSON_PRETTY_PRINT);

file_put_contents("./tasks.json", $newTasks);

header("location: index.php", true, 301);
exit();

?>