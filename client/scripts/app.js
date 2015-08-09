/**
 * Created by lukedowell on 8/7/15.
 */

var isAdmin = false;

function pushMessagesToTheDomAndRemoveAllOfTheOldMessagesHahaWeeeeeeeeeeeeeeeeee(messages) {
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

        if(isAdmin) {
            var deleteButton = $("<button/>", {
                class: "btn btn-danger",
                text: "X",
                'data-id': messages[i]._id
            });
            messagePanelHead.append(deleteButton);
        }
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
            pushMessagesToTheDomAndRemoveAllOfTheOldMessagesHahaWeeeeeeeeeeeeeeeeee(messages);
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

/**
 * Deletes a message from the database
 * @param id
 *      The id of the message to delete
 * @param message
 *      The dom element to remove upon success
 */
function deleteMessage(id, message) {
    $.ajax({
        type: 'DELETE',
        url: '/message',
        data: id,
        statusCode: {
            204: function() {
                message.remove();
                console.log("Post with id: " + id + "\nRemoved!");
            }
        }
    });
}

/**
 * Fades out the login ui and brings in the post ui
 */
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
        return;
    }
    var request = {username: username, password: password};
    $.ajax({
        type: "POST",
        url: "/user/login",
        data: request,
        statusCode: {
            200: function(response) {
                displayAlert('loginSuccess');
            },
            201: function(response) {
                displayAlert('loginCreated');
            },
            400: function(response) {
                displayAlert('loginFailed')
            }
        },
        success: function(response) {
            $(".user-name").text(response.name);
            if(response.isAdmin) {
                isAdmin = true;
                populateMessages();
            }
            displayPostUI();
        }
    });
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
    populateMessages();

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

    $("#refreshButton").on('click', function() {
        populateMessages();
    });

    $(".post-wrapper").on('click', 'button', function() {
        var id = $(this).data('id');
        var message = $(this).parent().parent();
        deleteMessage(id, message);
    });
});