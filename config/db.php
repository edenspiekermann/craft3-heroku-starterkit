<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

$url = getenv('JAWSDB_MARIA_URL');

$dbparts = parse_url($url);

return array(
  'server' => $dbparts['host'],
  'user' => $dbparts['user'],
  'password' => $dbparts['pass'],
  'database' => ltrim($dbparts['path'],'/'),
  'tablePrefix' => 'craft',
  'port' => $dbparts['port'],
);
