<?php
    /**
     * Contact mail sent via MailGun.com
     **/
    require('config/mailgun.php');

    function safe( $name ) {
        return( str_ireplace(array( "\r", "\n", "%0a", "%0d", "Content-Type:", "bcc:","to:","cc:" ), "", $name ) ); 
    }

    function getMessageSuffix() {

        $details = print_r(json_decode(file_get_contents("http://ipinfo.io/{$_SERVER[REMOTE_ADDR]}")), true);

        return <<< END


------------------------------------
[ User Info ]

Remote IP:
{$_SERVER[REMOTE_ADDR]} (Host: {$_SERVER[REMOTE_HOST]})

User Agent:
{$_SERVER[HTTP_USER_AGENT]}

Referrer:
{$_SERVER[HTTP_REFERER]}

Geo. info:
$details

END;
    }

    $to = "me@andr3.net";
    $subject = safe(!empty($_POST['subject']) ? $_POST['subject'] : '(blank)');
    $msg = safe(!empty($_POST['message']) ? $_POST['message'] : '(blank)');

    $msg = $msg . getMessageSuffix();
   

    $s = curl_init(); 
    $options = array (
        CURLOPT_USERPWD => 'api:' . $mailgun['apikey'],
        CURLOPT_URL => $mailgun['sendmail'],
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => array (
            'from' => 'MailGun at andr3.net <noreply@mailgun.andr3.net>',
            'to' => 'me+meet@andr3.net',
            'subject' => '[meet.andr3.net] ' . $subject,
            'text' => $msg
        )
    ); 
    curl_setopt_array($s, $options);
    $result = curl_exec($s);

    $headers = getallheaders();

    if (!empty($headers['X-Requested-With']) && 
        $headers['X-Requested-With'] == 'XMLHttpRequest') {

        header('Content-type: application/json;');
        echo json_encode($result);
    } else {
        include 'index.html';
    }
    

?>