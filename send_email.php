<?php


#email sending function that gets triggered with "post"
#work in progress, if you know how to do it pls let me know

if($_SERVER["REQUEST_METHOD"] == "POST") {

    
    #define vars
    $userName = $_POST['contact_name'];
    $userEmail = $_POST['contact_email'];
    $userMessage = $_POST['contact_message'];

    $to = 'kevin.llliu02@gmail.com'; //my email
    $subject = $_POST['contact_subject'];

    #user's header
    $headers = "From: " . strip_tags($userEmail) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($userEmail) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    #user's message
    $message = '<html><body>';
    $message .= '<p>Message: ' . $userMessage . '</p>';
    $message .= '</body></html>';




    //check if emailed to me or not
    if(mail($to, $subject, $message, $headers)) {
        echo "The email has been sent!";
    } else {
        echo "The email has failed!";
    }
}
?>
