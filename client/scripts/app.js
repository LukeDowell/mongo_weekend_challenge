/**
 * Created by lukedowell on 8/7/15.
 */
function pushMessagesToTheDomAndRemoveAllOfTheOldMessages(messages) {
    var container = $(".post-wrapper");
    container.empty();
    for(var i = 0; i < messages.length; i++) {
        var messagePanel = $("<div/>", {class: "panel panel-info"});
        var messagePanelHead = $("<div/>", {class: "panel-heading"});
        var messagePanelBody = $("<div/>", {class: "panel-body"});
        var messageAuthor = $("<h3/>", {text: messages[i].author + " said..."});
        var messageContent = $("<p/>", {text: messages[i].content});

        messagePanelHead.append(messageAuthor);
        messagePanelBody.append(messageContent);
        messagePanel.append(messagePanelHead);
        messagePanel.append(messagePanelBody);
        container.append(messagePanel);
    }
}

/**
 * Requests all the messages from the server
 */
function populateMessages() {
    console.log("Requesting messages...");
    $.ajax({
        type: "GET",
        url: "/message",
        success: function(messages) {
            pushMessagesToTheDomAndRemoveAllOfTheOldMessages(messages);
            console.log(messages);
        }
    });
}

/**
 * Posts a message
 * @param textarea
 *      The textarea containing our message
 */
function postMessage(textarea) {
    var string = $("#"+textarea).val();
    var author = $(".user-name").text();
    var data = {message: string, author: author};
    $.ajax({
        type: "POST",
        url: '/message',
        data: data,
        success: function() {
            console.log("Message POST Success");
        },
        error: function() {
            console.log("Message posting FAILED");
        },
        complete: function() {
            populateMessages();
        }
    });
}

function displayPostUI() {
    $('.login-wrapper').fadeOut(function() {
        $('.message-utils').fadeIn();
    });
}

/**
 * Handles our login request
 */
function loginHandler() {
    var username = $("#userField").val().toLowerCase();
    var password = $("#passField").val();
    if(username.length < 1 || password.length < 1) {
        alert("Please fill out both fields before submitting a request");
    }
    var request = {username: username, password: password};
    $.ajax({
        type: "POST",
        url: "/user/login",
        data: request,
        success: function(response) {
            if(response == 'success') {
                displayAlert('loginSuccess');
            } else if(response == 'created') {
                displayAlert('loginCreated');
            }
            $(".user-name").text(username);
            displayPostUI();
        },
        error: function(error) {
            displayAlert('loginFailed')
        }
    })
}

/**
 * Fades in an alert message regarding our login
 * @param alertID
 */
function displayAlert(alertID) {
    $('#'+alertID).fadeIn().delay(3000).fadeOut();
}

/**
 * Entry point
 */
$(document).ready(function() {
    //populateMessages();

    $("#postMessage").on('click', function() {
        var textArea = $("#postArea");
        postMessage(textArea);
    });

    $("#loginButton").on('click', function() {
        loginHandler();
    });

    $("#submitButton").on('click', function() {
        postMessage('postArea');
    });
});