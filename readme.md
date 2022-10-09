
<img src="/public/cars.png">

Cilent

Halaman Index (GET) = http://localhost:8080/cars <br>
Halaman Create Car (POST) = http://localhost:8080/cars/add-car <br>
Halaman Edit Car (PUT) = http://localhost:8080/cars/edit/6<br>
Menampilkan Hasil Filter Size (GET) = http://localhost:8080/cars/search?car_size=small/ <br>
Menampilkan Hasil Search (POST) = http://localhost:8080/search <br>



Server Side


{
  "message": "Successfully got cars data !",
  "data": [
    {
      "id": 3,
      "car_name": "Avanza",
      "car_price": 3000,
      "car_size": "medium",
      "car_photo": "https://placeimg.com/640/480/any",
      "createdAt": "2022-10-09T11:00:02.953Z",
      "updatedAt": "2022-10-09T11:00:18.642Z"
    },
    {
      "id": 4,
      "car_name": "Bmw",
      "car_price": 2000000,
      "car_size": "medium",
      "car_photo": "https://placeimg.com/640/480/any",
      "createdAt": "2022-10-09T12:06:40.644Z",
      "updatedAt": "2022-10-09T12:06:40.644Z"
    }
  ]
}