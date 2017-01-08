@extends('layouts.app')


@section('content')
    <div class="w3-display-container w3-border-black w3-border w3-blue-grey w3-section" style="margin:auto; overflow: hidden; height: 400px">
        <img class="mySlides w3-display-middle" src="uploads/spark_people.jpg">
        <img class="mySlides w3-display-middle" src="uploads/86_with_Spark_sign.jpg">
        <img class="mySlides w3-display-middle" src="uploads/13_Golden_slider.jpg">
        <a class="w3-btn-floating w3-display-left" style="z-index: 0" onclick="plusDivs(-1)">&#10094;</a>
        <a class="w3-btn-floating w3-display-right" style="z-index: 0" onclick="plusDivs(+1)">&#10095;</a>
        <div class="w3-display-topmiddle bigShadow w3-center w3-xxxlarge" style="width:100%">SPARK MAKERSPACE</div>
    </div>

    <p>Hey there. This is Spark.</p>
    <script>
        var slideIndex = 1;
        var timer;
        carousel();

        function plusDivs(n) {
            showDivs(slideIndex += n);
        }

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 1; i < x.length; i++) {
                x[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > x.length) {slideIndex = 1}
            x[slideIndex-1].style.display = "block";
            timer = setTimeout(carousel, 5000); // Change image every 5 seconds
        }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length} ;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
            clearTimeout(timer);
            timer = setTimeout(carousel, 5000);
        }
    </script>
@endsection