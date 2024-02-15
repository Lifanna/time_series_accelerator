$(document).ready(() => {
    $('#loginSwitch').change(() => {
        $("#passwordHeader").toggleClass("d-none");
        $("#gestureHeader").toggleClass("d-none");
        $("#password").toggleClass("d-none");
        $("#loginButton").toggleClass("d-none");
        $('#loginGestureButton').toggleClass("d-none");
    });

    $('#loginGestureButton').click(() => {
        let username = $("#login").val();

        if (username !== "") {
            $("#gestureErrors").html('')
            window.location.href = `/test_gesture?username=${username}`;
        }
        else {
            $("#gestureErrors").append(`
                <div class="text-danger my-3">Пожалуйста, введите логин</div>
            `)
        }
    });
});
