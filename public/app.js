window.addEventListener("scroll", function(){
    var header = document.getElementById("navbar");
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

document.querySelectorAll(".go-to-seccion-contacto").forEach(button => 
    {
        button.addEventListener("click", function () {
            document.getElementById("seccion-contacto").scrollIntoView({ behavior: "smooth" });
        });
    });