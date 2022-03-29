<?php

// Function untuk mengambil data JSON lalu merubahnya ke Array Asosiatif
function getJsonContent($file_location) {
    // Mengambil data dari file JSON
    $jsonFile = file_get_contents($file_location);

    // Merubah JSON ke Array Asosiatif
    $array = json_decode($jsonFile, true);

    // Mengembalikan variabel $array
    return $array;
}

// Function untuk memformat tanggal menjadi tanggal dan bulan ("1977-01-01" to "1 Jan")
function formatDate($date) {
    $createdDate = date_create($date);
    $formatedDate = date_format($createdDate, "j M");
    return $formatedDate;
}

?>
