<?php 

// import file function.php untuk mengambil function-function yang telah dibuat
include "./function.php";

// Jika Button "Add Task" yg ada di index.php belum diklik,
// maka redirect user ke index.php
if(!isset($_POST["add"])) {
    header("location: index.php", true, 301);
    exit();
}

// Cek apakah file tasks.json tersedia
if(file_exists("./tasks.json")) {
    // Jika file tersedia, ambil data dari tasks.json menggunakan function getJsonContent() yang telah dibuat di file function.php
    $tasks = getJsonContent("./tasks.json");
} else {
    // Jika file tidak tersedia, isi dengan array kosong
    $tasks = [];
}


// Cek apakah ada data yang dikirim dari index.php
if($_POST["deadline"] || $_POST["title"] || $_POST["description"] || $_POST["tags"]) {
    // jika ada, ambil masing-masing data $_POST yang dikirim dari index.php 
    $id = uniqid();
    $title = $_POST["title"];
    $description = $_POST["description"];
    if (!$_POST["tags"] == "") {
        $tags = explode(",", $_POST["tags"]);
    } else {
        $tags = [];
    }
    $deadline = $_POST["deadline"];

    // Membuat Array Asosiatif dari data $_POST
    $newTask = [
        "id" => $id,
        "title" => $title,
        "description" => $description,
        "tags" => $tags,
        "deadline" => $deadline
    ];

    // Menambahkan Task baru kedalam Array $tasks
    $tasks[] = $newTask;

    // Merubah Array Asosiatif menjadi file format JSON
    $newTasks = json_encode($tasks, JSON_PRETTY_PRINT);

    // Kirim data yang sudah dirubah ke file JSON kedalam file tasks.json
    file_put_contents("./tasks.json", $newTasks);
}

header("location: index.php", true, 301);
exit();
    
?>