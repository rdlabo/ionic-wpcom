<?php
$curl = curl_init( 'https://public-api.wordpress.com/oauth2/token' );
curl_setopt( $curl, CURLOPT_POST, true );
curl_setopt( $curl, CURLOPT_POSTFIELDS, array(
    'client_id' => 54526,
    'redirect_uri' => 'https://oreno-yome.com',
    'client_secret' => 'S01Di6OarA90dHo7yvZygoS2YmZtDSOXaxhssCDSPSI7BlfAHTj7jqqwDt1xU4Ng',
    'code' => '9ivcsRSaA2', // The code from the previous request
    'grant_type' => 'authorization_code'
) );
curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
$auth = curl_exec( $curl );
$secret = json_decode($auth);
print_r($secret);
$access_key = $secret->access_token;

?>