/* Testing username: username
    * Testing password: password
    * From sign up page, we can create one account and use it for login. 
    * Everytime when you successfully create an account from sign up page, the 
    * previous account will be deleted for now.
*/
var incorrect = false;

function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var username_create = localStorage.getItem("new_username");
    var password_create = localStorage.getItem("new_password");

    var para;
    var node;
    var element;

    if(username == '' || password == ''){
        incorrect = true;
        para = document.createElement("p");
        node = document.createTextNode("Username/Password are incorrect");
        para.className = "error";
        para.appendChild(node);
        element = document.getElementById("loginform");
        element.prepend(para);

        return false;
    }

    if(username == username_create && password == password_create){
        window.location = "home.html";
        return true;
    }
    
    else if(!incorrect){
        incorrect = true;
        para = document.createElement("p");
        node = document.createTextNode("Username/Password are incorrect");
        para.className = "error";
        para.appendChild(node);
        element = document.getElementById("loginform");
        element.prepend(para);

        return false;
    }

    return false;
}


/*
    * From sign up page, we can create one account and use it for login. 
    * Everytime when you successfully create an account from sign up page, the 
    * previous account will be deleted for now.
*/   
    
function signUp(){
    var pw = document.getElementById("sign_password").value;
    var cpw = document.getElementById("sign_confirmPassword").value;
    var tmp_username = document.getElementById("sign_username").value;
    var tmp_first = document.getElementById("sign_firstName").value;
    var tmp_last = document.getElementById("sign_lastName").value;
    //var identity = document.getElementById("iden").value;
    var identity_radios = document.getElementsByName("role");
    var identity_check = false;
    
    var para = document.createElement("p");
    para.className = "error";
    var node = null;

    /* checking radio button validity */
    for(var i = 0; i < identity_radios.length; i++){
        if(identity_radios[i].checked){
            identity_check = true;
        }
    }

    if(tmp_username == '' || tmp_first == '' || tmp_last == '' || pw == '' || cpw == ''){
        node = document.createTextNode("All fields must be filled");
    }else if(identity_check == false){
        node = document.createTextNode("Please choose your role");
    }else if(pw != cpw){
        node = document.createTextNode("Passwords do not match");
    }

    if(pw == cpw && pw != '' && cpw != ''){
        localStorage.setItem("new_username", document.getElementById("sign_username").value);
        localStorage.setItem("new_password", document.getElementById("sign_password").value);
        window.location = "index.html";
        return true;
    }
    
    para.appendChild(node);
    var element = document.getElementById("sign_form");
    if(incorrect == true){
        element.removeChild(element.getElementsByTagName('p')[0]);        
    }
    element.prepend(para);
    incorrect = true;
}


/* 
    * Function to add game to page
*/
incorrect = false;

function addGame(){

    var c_status = document.getElementsByName('optradio');
    var n_status;

    for(var i = 0; i < c_status.length; i++){
        if(c_status[i].checked){
            n_status = c_status[i].value;
        }
    }

    // Getting array of existing games
    // Dummy games
    var games = JSON.parse(localStorage.getItem('stored_games')) || 
    [
        {
            opponent: 'Their Team',
            date: '10/21',
            time: '10:00 PM',
            location: 'Tree House',
            status: 'Away'
        },
        {
            opponent: 'Their Team',
            date: '10/23',
            time: '7:00 PM',
            location: 'Tree House',
            status: 'Home'
        },
        {
            opponent: 'Their Team',
            date: '11/26',
            time: '1:00 PM',
            location: 'Tree House',
            status: 'Away'
        }
    ];

    //console.log("before: " + games);
    var node = null;
    var para = document.createElement("p");
    para.className = "error";

    var n_opponent = document.getElementById('opponent').value;
    var n_date = document.getElementById('date').value;
    var n_time = document.getElementById('time').value;
    var n_location = document.getElementById('location').value;
    
    if(n_opponent == '' || n_date == '' || n_time == '' || n_location == '' || n_status === null){
        node = document.createTextNode("All fields must be filled");
    }else{
        //alert("here");
        // Creating new game object after validation
        var new_game = {
            opponent: n_opponent,
            date: n_date,
            time: n_time,
            location: n_location,
            status: n_status
        };

        // Adding new game to array
        games.push(new_game);
        localStorage.setItem('stored_games', JSON.stringify(games));
        window.location = "schedule.html";
    }

    para.appendChild(node);
    //console.log(incorrect);
    if(incorrect == false){
        var element = document.getElementById("addgame_form");
        element.prepend(para);
        incorrect = true;
    }
}



/* 
    * Function to show the games in the schedule page (create)
*/
function showSchedule(){
    var games = [];
    if(localStorage.getItem('stored_games') === null){
        games = [
            {
                opponent: 'Their Team',
                date: '10/21',
                time: '10:00 PM',
                location: 'Tree House',
                status: 'Away'
            },
            {
                opponent: 'Their Team',
                date: '10/23',
                time: '7:00 PM',
                location: 'Tree House',
                status: 'Home'
            },
            {
                opponent: 'Their Team',
                date: '11/27',
                time: '1:00 PM',
                location: 'Tree House',
                status: 'Away'
            }
        ];
        localStorage.setItem('stored_games', JSON.stringify(games));
    }else{
        games = JSON.parse(localStorage.getItem('stored_games'))
    }


    // console.log(games);

    for(var i = 0; i < games.length; i++){
        var str = "<li><img src='img/trash.png' alt='delete' class='delete' onclick='deleteGame()'><a href='game.html'>" + games[i].date + " - My Team vs. " + games[i].opponent + "</a><img src='img/edit.png' alt='edit' class='edit' onclick='editGame()'></li>"
        document.getElementById("game_list").innerHTML += str;
    }
}


/* 
    * Function to edit game when clicked on from schedule
*/
function editGame(){
    var ind;    // storing index of clicked list item
    
    var parent = document.getElementsByTagName('ul')[0];
    // Trying to get the index of the list item chosen for deletion
    parent.onclick = function (e) {
        var el = e.target;
        while (el != document.body && el.tagName.toLowerCase() != "li") {
            el = el.parentNode;
        }

        ind = [].indexOf.call(el.parentNode.children, el);
        //alert("IND = " + ind);

        localStorage.setItem('index', ind);
    }
    window.location = "edit_game.html";
}

/*
    * Function to load values when editing
    * saves values after edit
*/

function loadEditGame(){
    // Getting array from local storage, and deleting the displayed list item
    var ind = localStorage.getItem('index');
    var games = JSON.parse(localStorage.getItem('stored_games'));

    //console.log(ind);
    //console.log(games);

    // filling placeholder values with current values
    document.getElementById('opponent').value = games[ind].opponent;
    document.getElementById('date').value = games[ind].date;
    document.getElementById('time').value = games[ind].time;
    document.getElementById('location').value = games[ind].location;

    if(games[ind].status == 'Home'){
        document.getElementById("Home").checked = true;
    }else{
        document.getElementById("Away").checked = true;
    }
}

/*
    * Function to save game after editing
*/
incorrect = false;
function saveGame(){
    var ind = localStorage.getItem('index');
    var games = JSON.parse(localStorage.getItem('stored_games'));

    var node = null;
    var para = document.createElement("p");
    para.className = "error";

    var n_opponent = document.getElementById('opponent').value;
    var n_date = document.getElementById('date').value;
    var n_time = document.getElementById('time').value;
    var n_location = document.getElementById('location').value;

    if(n_opponent == '' || n_date == '' || n_time == '' || n_location == ''){
        node = document.createTextNode("All fields must be filled");
    }else{
        games[ind].opponent = n_opponent;
        games[ind].date = n_date;
        games[ind].time = n_time;
        games[ind].location = n_location;
        
        if(document.getElementById("Home").checked == true){
            games[ind].status = 'Home';
        }else{
            games[ind].status = 'Away';
        }
    
        localStorage.setItem('stored_games', JSON.stringify(games));
        window.location = "schedule.html";
    }

    para.appendChild(node);
    //console.log(incorrect);
    if(incorrect == false){
        var element = document.getElementById("editgame_form");
        element.prepend(para);
        incorrect = true;
    }
}

/*
    * Function to delete game when icon is clicked on schedule
*/
function deleteGame(){
    var ind;    // storing index of clicked list item

    var parent = document.getElementsByTagName('ul')[0];
    // Trying to get the index of the list item chosen for deletion
    parent.onclick = function (e) {
        var el = e.target;
        while (el != document.body && el.tagName.toLowerCase() != "li") {
            el = el.parentNode;
        }

        ind = [].indexOf.call(el.parentNode.children, el);
        //alert("IND = " + ind);

        // Getting array from local storage, and deleting the displayed list item
        var games = JSON.parse(localStorage.getItem('stored_games'));
        games.splice(ind, 1);   // removing the element in array @ index
        parent.removeChild(parent.children[ind]);   // removing from DOM
        localStorage.setItem('stored_games', JSON.stringify(games)); // storing back into localstorage
    }
}

/* 
    * Function to add player to page
*/
incorrect = false;
function addPlayer(){
    var node = null;
    var para = document.createElement("p");
    para.className = "error";

    var f_name = document.getElementById("firstName").value;
    var l_name = document.getElementById("lastName").value;
    var dob = document.getElementById("dateOfBirth").value;
    var j_number = document.getElementById("jersey").value;
    var id_p = document.getElementById("id_position_select").options[document.getElementById('id_position_select').selectedIndex].text;
    var cap = document.getElementById("captain").checked;
    var full_name = f_name + " " + l_name;
    
    var img_data = localStorage.getItem('imgData');
    localStorage.removeItem("imgData");
    if(img_data === null){
        img_data = "img/cat.jpg";
    }
    
    if(f_name == '' || l_name == '' || dob == '' || j_number == '' || id_p == 'Position'){
        alert("All the field must be filled");
        return false;
    }
    
    var con_captain;
    if(cap == true){
        con_captain = "yes";
    }
    else{
        con_captain = "no";
    }
    
    var players = JSON.parse(localStorage.getItem('stored_players')) || 
    [
        {
            firstname: "John",
            lastname: "Wick",
            position: "Forward",
            fullname: "John Wick",
            jersey: "1",
            dateOfBirth: "09/11/1995",
            captain: "yes",
            profile_picture: "img/cat.jpg",
            goals: "0",
            fouls: "0",
            yellowcards: "0",
            redcards: "0",
            shots: "0",
            cornerkicks: "0",
            goalkicks: "0",
            penaltykicks: "0",
            throwins: "0",
            gamesplayed: "0"
        },
        {
            firstname: "Marry",
            lastname: "Wick",
            position: "Goal Keeper",
            fullname: "Mary Wick",
            jersey: "2",
            dateOfBirth: "09/11/1995",
            captain: "no",
            profile_picture: "img/cat.jpg",
            goals: "0",
            fouls: "0",
            yellowcards: "0",
            redcards: "0",
            shots: "0",
            cornerkicks: "0",
            goalkicks: "0",
            penaltykicks: "0",
            throwins: "0",
            gamesplayed: "0"
        },
        {
            firstname: "John Jr",
            lastname: "Wick",
            position: "Center Back",
            fullname: "John Jr Wick",
            jersey: "3",
            dateOfBirth: "09/11/1995",
            captain: "no",
            profile_picture: "img/cat.jpg",
            goals: "0",
            fouls: "0",
            yellowcards: "0",
            redcards: "0",
            shots: "0",
            cornerkicks: "0",
            goalkicks: "0",
            penaltykicks: "0",
            throwins: "0",
            gamesplayed: "0"
        }
    ];
    
    
    var new_player = {
        fullname: full_name,
        firstname: f_name,
        lastname: l_name,
        position: id_p,
        jersey: j_number,
        dateOfBirth: dob,
        captain: con_captain,
        profile_picture: img_data,
        goals: "0",
        fouls: "0",
        yellowcards: "0",
        redcards: "0",
        shots: "0",
        cornerkicks: "0",
        goalkicks: "0",
        penaltykicks: "0",
        throwins: "0",
        gamesplayed: "0"
    };
    
    players.push(new_player);    
    localStorage.setItem('stored_players', JSON.stringify(players));
    
    window.location = "players.html";
}

/* 
    * Function to show the players in the player page (create)
*/
function showPlayer(){
    var players;
    if(!localStorage.getItem('stored_players')){
        players = [
            {
                firstname: "John",
                lastname: "Wick",
                position: "Forward",
                fullname: "John Wick",
                jersey: "1",
                dateOfBirth: "09/11/1995",
                captain: "yes",
                profile_picture: "img/cat.jpg",
                goals: 0,
                fouls: 0,
                yellowcards: 0,
                redcards: 0,
                shots: 0,
                cornerkicks: 0,
                goalkicks: 0,
                penaltykicks: 0,
                throwins: 0,
                gamesplayed: 0
            },
            {
                firstname: "Marry",
                lastname: "Wick",
                position: "Goal Keeper",
                fullname: "Mary Wick",
                jersey: "2",
                dateOfBirth: "09/11/1995",
                captain: "no",
                profile_picture: "img/cat.jpg",
                goals: 0,
                fouls: 0,
                yellowcards: 0,
                redcards: 0,
                shots: 0,
                cornerkicks: 0,
                goalkicks: 0,
                penaltykicks: 0,
                throwins: 0,
                gamesplayed: 0
            },
            {
                firstname: "John Jr",
                lastname: "Wick",
                position: "Center Back",
                fullname: "John Jr Wick",
                jersey: "3",
                dateOfBirth: "09/11/1995",
                captain: "no",
                profile_picture: "img/cat.jpg",
                goals: 0,
                fouls: 0,
                yellowcards: 0,
                redcards: 0,
                shots: 0,
                cornerkicks: 0,
                goalkicks: 0,
                penaltykicks: 0,
                throwins: 0,
                gamesplayed: 0
            }
        ];
        localStorage.setItem('stored_players', JSON.stringify(players));
    }

    players = JSON.parse(localStorage.getItem('stored_players'));
    //console.log(players);
    for(var i = 0; i < players.length; i++){
        var str = "<tr><td class='headcol'><img class='player_img' src='" + players[i].profile_picture + "' alt='Temporary Player's Picture'></td><td>" + players[i].firstname + "</td><td>" + players[i].lastname + "</td><td>" + players[i].position + "</td><td><input type='button' value='Detail' class='btn btn-primary' onclick='detail_button_player(this)'></td><td><input type='button' value='Delete' class='btn btn-primary' onclick='deletePlayer(this)'></td><td><input type='button' value='Edit' class='btn btn-primary' onclick='edit_button_player(this)'></tr>"
        document.getElementById("players_list").innerHTML += str;
    }
}

/*
    * Function to delete player when icon is clicked on players
*/
function deletePlayer(r){
    var i = r.parentNode.parentNode.rowIndex;
    i -= 1;
    var players = JSON.parse(localStorage.getItem('stored_players'));
    players.splice(i, 1);   // removing the element in array @ index
    localStorage.setItem('stored_players', JSON.stringify(players));
    document.getElementById("players_list").deleteRow(i);
}

/* 
    * Function to edit players when clicked on from player
*/
function edit_button_player(r){
    var i = r.parentNode.parentNode.rowIndex;
    i -= 1;
    localStorage.setItem('stored_player_index', i);
    window.location = "edit_player.html";
}

/* Edits a players' live stats */
function detail_button_player(r){
    var i = r.parentNode.parentNode.rowIndex;
    i -= 1;
    localStorage.setItem('stored_player_index', i);
    window.location = "player_profile.html";
}

/* get index of player */
function player_index(r){
    var i = r.parentNode.parentNode.rowIndex;
    i -= 1;
    localStorage.setItem('stored_player_index', i);
    window.location = "player_profile.html";
}

/*
    * Function to load player's information from player
*/
function loadEditPlayer(){
    // Getting array from local storage, and deleting the displayed list item
    var ind = localStorage.getItem('stored_player_index');
    var players = JSON.parse(localStorage.getItem('stored_players'));


    // filling placeholder values with current values
    document.getElementById("firstName").value = players[ind].firstname;
    document.getElementById("lastName").value = players[ind].lastname;
    document.getElementById("dateOfBirth").value = players[ind].dateOfBirth;
    document.getElementById("jersey").value = players[ind].jersey;
    document.getElementById("id_position_select").value = players[ind].position;
    document.getElementById("captain").value = players[ind].captain;

    if(players[ind].captain == "yes"){
        document.getElementById("captain").checked = true;
    }
}

/*
    * Function to save the player's info from edit player page
*/

function savePlayer(){
    var f_name = document.getElementById("firstName").value;
    var l_name = document.getElementById("lastName").value;
    var dob = document.getElementById("dateOfBirth").value;
    var j_number = document.getElementById("jersey").value;
    var id_p = document.getElementById("id_position_select").options[document.getElementById('id_position_select').selectedIndex].text;
    var cap = document.getElementById("captain").checked;
    var full_name = f_name + " " + l_name;
    if(f_name == '' || l_name == '' || dob == '' || j_number == '' || id_p == 'Position'){
        alert("All the field must be filled");
        return false;
    }
    
    var con_captain;
    if(cap.checked == true){
        con_captain = "yes";
    }
    else{
        con_captain = "no";
    }
    
    var ind = localStorage.getItem('stored_player_index');
    var players = JSON.parse(localStorage.getItem('stored_players'));
    players[ind].firstname = f_name;
    players[ind].lastname = l_name;
    players[ind].position = id_p;
    players[ind].jersey = j_number;
    players[ind].dateOfBirth = dob;
    players[ind].captain = con_captain;
    players[ind].fullname = full_name;
    //image
    var img_data = localStorage.getItem('imgData');
    localStorage.removeItem("imgData");
    if(img_data != players[ind].profile_picture){
        players[ind].profile_picture = img_data;
    }
    
    localStorage.setItem('stored_players', JSON.stringify(players));
    
    window.location = "players.html";
}

/*
    * Function to load today's game information
*/

function loadHome(){
    // Get today's date
    var today = new Date();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    
    // Add leading zero if necessary
    if(month < 10) {
        month = '0' + month;
    } 
    if(date < 10) {
        date = '0' + date;
    } 

    // Find matches playing today and display on home page
    today = month + '/' + date;
    var games = JSON.parse(localStorage.getItem('stored_games'));
    for(var i = 0; i < games.length; i++){
        if(today == games[i].date){
            var day = JSON.parse(JSON.stringify(games[i].date));
            var time = JSON.parse(JSON.stringify(games[i].time));
            var loc = JSON.parse(JSON.stringify(games[i].location));
            var opp = JSON.parse(JSON.stringify(games[i].opponent));
            var status = JSON.parse(JSON.stringify(games[i].status));
            document.getElementById("today_game").innerHTML = day + "<br>" +
                time + "<br>" + 
                loc + "<br><br>" +
                "My Team vs. " + opp + "<br>" +
                status + " Game <br>";
        }
    }

}

/* 
    * Function to show the players' profile (create)
*/

function loadPlayerProfile(){
    
    var players = JSON.parse(localStorage.getItem('stored_players'));
    var i = localStorage.getItem('stored_player_index');

    document.getElementById('player_info').innerHTML = "<h2><img class='player_img' src='" + players[i].profile_picture + "' alt='Temporary Player's Picture'></h2><h4>" + players[i].fullname + "</h4><h4>" + players[i].dateOfBirth + "</h4><h4>" + players[i].position + "</h4><h4> captain: " + players[i].captain + "</h4>";
    
    /*
    var str = players[i].firstname + " " + players[i].lastname + " #" + players[i].jersey;

    document.getElementById('playerName').innerHTML = str;
    document.getElementById('playerPosition').innerHTML = players[i].position;
    */

    var body_str = "<tr>" + 
    "<td>" + players[i].goals + "</td>" + 
    "<td>" + players[i].fouls + "</td>" + 
    "<td>" + players[i].yellowcards + "</td>" + 
    "<td>" + players[i].redcards + "</td>" + 
    "<td>" + players[i].shots + "</td>" + 
    "<td>" + players[i].cornerkicks + "</td>" + 
    "<td>" + players[i].goalkicks + "</td>" + 
    "<td>" + players[i].penaltykicks + "</td>" + 
    "<td>" + players[i].throwins + "</td>" + 
    "<td>" + players[i].gamesplayed + "</td>" + 
    "</tr>";

    document.getElementById('player-profile-body').innerHTML = body_str;
}

function loadEditStats(){
    // Getting array from local storage, and deleting the displayed list item
    var ind = localStorage.getItem('stored_player_index');
    var players = JSON.parse(localStorage.getItem('stored_players'));
    
    document.getElementById('player_info').innerHTML = "<h2><img class='player_img' src='" + players[ind].profile_picture + "' alt='Temporary Player's Picture'></h2><h4>" + players[ind].fullname + "</h4><h4>" + players[ind].dateOfBirth + "</h4><h4>" + players[ind].position + "</h4><h4> captain: " + players[ind].captain + "</h4>";

    // filling placeholder values with current values
    document.getElementById('goals').value = players[ind].goals;
    document.getElementById('fouls').value = players[ind].fouls;
    document.getElementById('yellowcards').value = players[ind].yellowcards;
    document.getElementById('redcards').value = players[ind].redcards;
    document.getElementById('shots').value = players[ind].shots;
    document.getElementById('cornerkicks').value = players[ind].cornerkicks;
    document.getElementById('goalkicks').value = players[ind].goalkicks;
    document.getElementById('penaltykicks').value = players[ind].penaltykicks;
    document.getElementById('throwins').value = players[ind].throwins;
    document.getElementById('gamesplayed').value = players[ind].gamesplayed;
    
}

function saveEditStats(){
    var n_goals = document.getElementById('goals').value;
    var n_fouls = document.getElementById('fouls').value;
    var n_yellowcards = document.getElementById('yellowcards').value;
    var n_redcards = document.getElementById('redcards').value;
    var n_shots = document.getElementById('shots').value;
    var n_cornerkicks = document.getElementById('cornerkicks').value;
    var n_goalkicks = document.getElementById('goalkicks').value;
    var n_penaltykicks = document.getElementById('penaltykicks').value;
    var n_throwins = document.getElementById('throwins').value;
    var n_gamesplayed = document.getElementById('gamesplayed').value;
    
    var ind = localStorage.getItem('stored_player_index');
    var players = JSON.parse(localStorage.getItem('stored_players'));
    players[ind].goals = n_goals;
    players[ind].fouls = n_fouls;
    players[ind].yellowcards = n_yellowcards;
    players[ind].redcards = n_redcards;
    players[ind].shots = n_shots;
    players[ind].cornerkicks = n_cornerkicks;
    players[ind].goalkicks = n_goalkicks;
    players[ind].penaltykicks = n_penaltykicks;
    players[ind].throwins = n_throwins;
    players[ind].gamesplayed = n_gamesplayed;
    
    localStorage.setItem('stored_players', JSON.stringify(players));
    
    window.location = "game.html";
}


/* Loads all player stats on live game page */
function loadGame(){
    var players = JSON.parse(localStorage.getItem('stored_players'));
    var el = document.getElementById("game_list");
    // loop through every player, display live stats
    for(var i = 0; i < players.length; i++){
        var str = "<tr>" + 
            "<td class='headcol'><p onclick='player_index(this)'>" + players[i].firstname + " " + players[i].lastname + "</p></td>" + 
            "<td>" + players[i].goals + "</td>" + 
            "<td>" + players[i].fouls + "</td>" + 
            "<td>" + players[i].yellowcards + "</td>" + 
            "<td>" + players[i].redcards + "</td>" + 
            "<td>" + players[i].shots + "</td>" + 
            "<td>" + players[i].cornerkicks + "</td>" + 
            "<td>" + players[i].goalkicks + "</td>" + 
            "<td>" + players[i].penaltykicks + "</td>" + 
            "<td>" + players[i].throwins + "</td>" + 
            "<td>" + players[i].gamesplayed + "</td>" + 
            "</tr>";

        el.innerHTML += str;
    }
}

/*
    * Function for image
*/
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //console.log(reader.result);
        localStorage.setItem('imgData', reader.result);
        //aalert(localStorage.getItem('imgData'));
    };
    // reader.onerror = function (error) {
    //     console.log('Error: ', error);
    // };
}